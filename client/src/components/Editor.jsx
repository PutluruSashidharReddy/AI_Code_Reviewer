import React, { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { motion } from 'framer-motion';
import { ClipboardDocumentIcon, PlayIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

const boilerplate = {
  python: `# Welcome to the Python editor!\n\n# This function is missing a base case for recursion\ndef factorial(n):\n    return n * factorial(n - 1)\n\n# This is a potential infinite loop without a break statement\ndef process_queue():\n    while True:\n        print("Processing...")`,
  java: `// Welcome to the Java editor!\npublic class Main {\n\n    // Missing base case for recursion\n    public static int factorial(int n) {\n        return n * factorial(n - 1);\n    }\n\n    // Potential infinite loop\n    public static void processQueue() {\n        while (true) {\n            System.out.println("Hello, Java World!");\n        }\n    }\n}`,
  cpp: `// Welcome to the C++ editor!\n#include <iostream>\n\n// Missing base case for recursion\nint factorial(int n) {\n    return n * factorial(n - 1);\n}\n\n// Potential infinite loop\nvoid processQueue() {\n    while (true) {\n        std::cout << "Processing..." << std::endl;\n    }\n}\n`
};

const CodeEditor = ({ isDark }) => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(boilerplate.python);
  const [copyText, setCopyText] = useState('Copy');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCode(boilerplate[language]);
    setAnalysisResult(null); // Clear results when language changes
  }, [language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopyText('Copied!');
    setTimeout(() => setCopyText('Copy'), 2000);
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8000/services/analyze/',
        {
          code: code,
          language: language,
          save_submission: true, // Save the code and its analysis
          title: `${language.charAt(0).toUpperCase() + language.slice(1)} Submission`
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setAnalysisResult(response.data);
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysisResult({
        success: false,
        issues: [{ type: 'Error', message: 'Could not connect to the analysis server.', line: 0 }]
      });
    } finally {
      setIsLoading(false);
    }
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
          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white bg-green-500 hover:bg-green-600 transition-colors disabled:bg-gray-400"
          >
            <PlayIcon className="w-5 h-5" />
            <span>{isLoading ? 'Analyzing...' : 'Analyze'}</span>
          </button>
        </div>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 flex-grow rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-border-dark">
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

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-1/3 p-6 bg-white dark:bg-secondary-dark rounded-xl shadow-md border border-gray-200 dark:border-border-dark flex flex-col"
        >
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 dark:border-gray-600">Analysis Results</h2>
          <div className="flex-grow overflow-y-auto">
            {isLoading && <p className="text-center">Analyzing your code...</p>}
            {analysisResult && (
              <div>
                {analysisResult.issues && analysisResult.issues.length > 0 ? (
                  <ul className="space-y-4">
                    {analysisResult.issues.map((issue, index) => (
                      <li key={index} className="flex items-start p-3 rounded-lg bg-red-50 dark:bg-red-500/20">
                        <ExclamationTriangleIcon className="w-6 h-6 mr-3 text-red-500 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-red-700 dark:text-red-400">
                            {issue.type} <span className="font-normal text-gray-500 dark:text-gray-400">- Line {issue.line}</span>
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">{issue.message}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-green-600 dark:text-green-400 mt-4">No issues found. Great job!</p>
                )}
              </div>
            )}
            {!isLoading && !analysisResult && <p className="text-center text-gray-500 mt-4">Click "Analyze" to check your code for issues.</p>}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CodeEditor;