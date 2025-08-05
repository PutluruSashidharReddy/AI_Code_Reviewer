import React from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from '../../context/ThemeContext';
import Spinner from '../common/Spinner';

const CodeEditor = ({ code, setCode, language }) => {
const { theme } = useTheme();

return (
<Editor
height="65vh"
// Pass the selected language to the editor
language={language}
value={code}
onChange={(value) => setCode(value || '')}
theme={theme === 'dark' ? 'vs-dark' : 'light'}
loading={<Spinner />}
options={{
selectOnLineNumbers: true,
minimap: { enabled: true },
fontSize: 16,
wordWrap: 'on',
padding: { top: 15 },
lineNumbersMinChars: 3,
scrollBeyondLastLine: false,
}}
/>
);
};

export default CodeEditor;