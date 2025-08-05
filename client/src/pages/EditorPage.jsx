import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Header from '../components/layout/Header';
import CodeEditor from '../components/editor/CodeEditor';
import Button from '../components/common/Button';
import LanguageSelector from '../components/editor/LanguageSelector';


const DEFAULT_CODE = {
  python: 'def main():\n    # Your Python code here\n    print("Hello, World!")\n\nif __name__ == "__main__":\n    main()',
  cpp: '#include <iostream>\n\nint main() {\n    // Your C++ code here\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
  java: 'public class HelloWorld {\n    public static void main(String[] args) {\n        // Your Java code here\n        System.out.println("Hello, World!");\n    }\n}',
  javascript: '// Your JavaScript code here\nconsole.log("Hello, World!");',
};

const EditorPage = () => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(DEFAULT_CODE['python']);
  const [isLoading, setIsLoading] = useState(false);


  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(DEFAULT_CODE[newLanguage]);
    const langLabel = newLanguage.charAt(0).toUpperCase() + newLanguage.slice(1);
    toast.info(`Switched language to ${langLabel}`);
  };

  const handleSubmitCode = () => {
    const analysisPromise = new Promise((resolve, reject) => {
      console.log(`Submitting ${language} code:`, code);
      setIsLoading(true);
      setTimeout(() => {
        Math.random() > 0.2 ? resolve() : reject();
      }, 2000);
    });

    toast.promise(
      analysisPromise,
      {
        pending: 'Analyzing your code...',
        success: 'Analysis successful! 🎉',
        error: 'Analysis failed. Please try again. 🤯'
      }
    ).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-dark-text-primary mb-4">Code Submission</h1>
          <p className="text-text-secondary dark:text-dark-text-secondary mb-6">Select a language, write your code, and submit for analysis.</p>
        </motion.div>

        {/* Add the Language Selector above the editor */}
        <div className="mb-4 flex justify-end">
            <div className="w-full sm:w-1/2 md:w-1/4">
                <LanguageSelector language={language} onLanguageChange={handleLanguageChange} />
            </div>
        </div>

        <motion.div 
          className="bg-card dark:bg-dark-card p-1 sm:p-2 rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          {/* Pass the dynamic language prop to the editor */}
          <CodeEditor code={code} setCode={setCode} language={language} />
        </motion.div>
        
        <motion.div 
          className="mt-6 flex justify-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-full md:w-1/4">
            <Button onClick={handleSubmitCode} isLoading={isLoading} variant="secondary">
              Submit for Analysis
            </Button>
          </div>
        </motion.div>
      </main>
    </>
  );
};

export default EditorPage;