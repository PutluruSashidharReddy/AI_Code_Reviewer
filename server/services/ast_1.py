import os
from tree_sitter import Parser, Language

# --- Direct Language Imports and Object Creation ---
from tree_sitter_python import language as python_language_binding
from tree_sitter_java import language as java_language_binding
from tree_sitter_cpp import language as cpp_language_binding

# Wrap the raw C-level object into a proper tree_sitter.Language object
LANGUAGES = {
    'python': Language(python_language_binding()),
    'java': Language(java_language_binding()),
    'cpp': Language(cpp_language_binding()),
}

# --- Tree-sitter Queries ---
# These are used to find specific patterns like function calls
QUERIES = {
    'python': {
        "call": "(call function:(identifier)@call_name)",
    },
    'java': {
        "call": "(method_invocation name:(identifier)@call_name)",
    },
    'cpp': {
        "call": "(call_expression function:(identifier)@call_name)",
    }
}

# --- Helper Functions (Rewritten for Robustness) ---

def is_node_present(start_node, target_type):
    """Recursively checks if a node of `target_type` exists within `start_node`."""
    if start_node.type == target_type:
        return True
    for child in start_node.children:
        if is_node_present(child, target_type):
            return True
    return False

def is_recursive(func_node, func_name, lang_name, language):
    """Checks if a function node contains a call to itself."""
    try:
        call_query_str = QUERIES.get(lang_name, {}).get("call")
        if not call_query_str:
            return False
        call_query = language.query(call_query_str)
        for call, capture in call_query.captures(func_node):
            if capture == 'call_name' and call.text.decode() == func_name:
                return True
    except Exception:
        return False
    return False

def has_parameters(func_node, lang_name):
    """Checks if a function has parameters defined."""
    if lang_name == 'python':
        # Check for children in the parameters node, excluding parentheses
        params_node = func_node.child_by_field_name('parameters')
        if params_node:
            return any(child.is_named for child in params_node.children)
    elif lang_name == 'java':
        params_node = func_node.child_by_field_name('parameters')
        if params_node:
            return 'formal_parameter' in [child.type for child in params_node.children]
    elif lang_name == 'cpp':
        # For C++, parameters are in a 'parameter_list' inside a 'declarator'
        declarator_node = func_node.child_by_field_name('declarator')
        if declarator_node:
            param_list = declarator_node.child_by_field_name('parameters')
            if param_list:
                 return param_list.named_child_count > 0
    return False

# --- Main Analysis Function (Final Version) ---
def analyze_code_with_treesitter(code_string, lang_name, print_ast_flag=False):
    """
    Analyzes a code string using a robust recursive walk of the Abstract Syntax Tree.
    """
    try:
        language = LANGUAGES.get(lang_name)
        if not language:
            return [{"type": "Error", "message": f"Unsupported language: '{lang_name}'", "line": 0}], None
        
        parser = Parser()
        parser.language = language
        tree = parser.parse(bytes(code_string, "utf8"))
        root_node = tree.root_node
    except Exception as e:
        return [{"type": "Error", "message": f"Could not load parser. Error: {e}", "line": 0}], None

    issues = []
    
    def find_issues_recursively(node):
        """A single recursive function to walk the tree and apply all checks."""
        node_type = node.type
        line_num = node.start_point[0] + 1

        # --- Check 1: Functions and Methods ---
        if node_type in ['function_definition', 'method_declaration']:
            name_node = None
            # Find the function name based on language-specific AST structure
            if lang_name == 'cpp' and node_type == 'function_definition':
                declarator_node = node.child_by_field_name('declarator')
                if declarator_node:
                    name_node = declarator_node.child_by_field_name('declarator')
            else:
                name_node = node.child_by_field_name('name')

            if name_node:
                func_name = name_node.text.decode()
                
                # Issue: Missing Recursion Base Case
                if is_recursive(node, func_name, lang_name, language):
                    # A proper base case is typically a return statement inside an if block
                    if not is_node_present(node, 'if_statement'):
                        issues.append({"type": "Missing Recursion Base Case", "message": f"Recursive function '{func_name}' has no 'if' statement to act as a base case.", "line": line_num})

                # Issue: Absent Edge-Case Guard
                if has_parameters(node, lang_name):
                    # This check is now more robust; it looks for any 'if' statement.
                    if not is_node_present(node, 'if_statement'):
                        issues.append({"type": "Absent Edge-Case Guard", "message": f"Function '{func_name}' has parameters but no 'if' statements to handle edge cases.", "line": line_num})

        # --- Check 2: Infinite Loops ---
        if node_type == 'while_statement':
            condition_node = node.child_by_field_name('condition')
            # --- THIS IS THE CORRECTED LINE ---
            # Added .lower() to handle Python's `True` as well as Java/C++'s `true`
            if condition_node and condition_node.text.decode().lower().strip('()') == 'true':
                if not is_node_present(node, 'break_statement'):
                    issues.append({"type": "Potential Infinite Loop", "message": "A 'while(true)' loop was detected without a 'break' statement inside it.", "line": line_num})

        # --- Continue Traversal ---
        for child in node.children:
            find_issues_recursively(child)

    # Start the analysis from the root of the tree
    find_issues_recursively(root_node)

    return sorted(issues, key=lambda x: x['line']), tree