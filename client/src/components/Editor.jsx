import React, { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { motion } from 'framer-motion';
import { ClipboardDocumentIcon, PlayIcon } from '@heroicons/react/24/solid';

const boilerplate = {
  python: `# Welcome to the Python editor!\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    else:\n        return fibonacci(n-1) + fibonacci(n-2)\n\nprint("Fibonacci(10) is", fibonacci(10))`,
  java: `// Welcome to the Java editor!\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java World!");\n    }\n\n    // A simple recursive function\n    public static int factorial(int n) {\n        if (n == 0) {\n            return 1;\n        } else {\n            return n * factorial(n - 1);\n        }\n    }\n}`,
  cpp: `// Welcome to the C++ editor!\n#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::string> languages = {"C++", "is", "powerful!"};\n    for (const std::string& word : languages) {\n        std::cout << word << " ";\n    }\n    std::cout << std::endl;\n    return 0;\n}`
};

const CodeEditor = ({ isDark }) => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(boilerplate.python);
  const [copyText, setCopyText] = useState('Copy');

  useEffect(() => {
    setCode(boilerplate[language]);
  }, [language]);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopyText('Copied!');
    setTimeout(() => setCopyText('Copy'), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 sm:p-6 lg:p-8 h-[calc(100vh-4rem)] flex flex-col"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 flex-shrink-0">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Code Editor</h1>
        <div className="flex items-center space-x-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 rounded-lg bg-white dark:bg-secondary-dark border border-gray-300 dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
          <button onClick={handleCopy} className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            <ClipboardDocumentIcon className="w-5 h-5" />
            <span>{copyText}</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white bg-green-500 hover:bg-green-600 transition-colors">
            <PlayIcon className="w-5 h-5" />
            <span>Run</span>
          </button>
        </div>
      </div>

      <div className="flex-grow rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-border-dark">
        <MonacoEditor
          height="100%"
          language={language}
          theme={isDark ? 'vs-dark' : 'vs'}
          value={code}
          onChange={(value) => setCode(value || '')}
          options={{
            fontSize: 14,
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </motion.div>
  );
};

export default CodeEditor;