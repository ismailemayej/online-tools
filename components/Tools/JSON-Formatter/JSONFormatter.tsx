'use client';

import { useState, useEffect, useRef } from 'react';
import {
  CodeBracketIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  ClipboardIcon,
  ClipboardDocumentCheckIcon,
  MinusSmallIcon,
  ArrowsPointingOutIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

export default function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isMinified, setIsMinified] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLPreElement>(null);

  const exampleJSON = `{
  "name": "JSON Formatter",
  "description": "A tool to format and validate JSON",
  "version": "1.0.0",
  "features": [
    "Formatting",
    "Validation",
    "Minification",
    "Error highlighting"
  ],
  "metadata": {
    "author": "ToolKit Pro",
    "license": "MIT"
  }
}`;

  useEffect(() => {
    if (input) {
      formatJSON();
    } else {
      setOutput('');
      setError('');
    }
  }, [input, isMinified]);

  const formatJSON = () => {
    try {
      if (!input.trim()) {
        setOutput('');
        setError('');
        return;
      }

      const parsed = JSON.parse(input);
      const formatted = isMinified
        ? JSON.stringify(parsed)
        : JSON.stringify(parsed, null, 2);

      setOutput(formatted);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setOutput('');
      highlightErrorPosition();
    }
  };

  const highlightErrorPosition = () => {
    if (!error || !textareaRef.current) return;

    try {
      // Try to extract line number from error message
      const match = error.match(/at position (\d+)/);
      if (match) {
        const position = parseInt(match[1], 10);
        const lines = input.substring(0, position).split('\n');
        const lineNumber = lines.length;
        const column = lines[lines.length - 1].length;

        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(position, position);

        // Scroll to error position
        const lineHeight = 20; // Adjust based on your textarea's line-height
        textareaRef.current.scrollTop = (lineNumber - 3) * lineHeight;
      }
    } catch (e) {
      console.error('Error highlighting failed:', e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadExample = () => {
    setInput(exampleJSON);
    setIsMinified(false);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
    setCopied(false);
  };

  const toggleMinify = () => {
    setIsMinified(!isMinified);
  };

  const downloadJSON = () => {
    if (!output) return;

    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `formatted-${isMinified ? 'minified' : 'pretty'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="w-full mx-auto ">
        <div className="bg-blue-800 p-4 rounded-lg text-center mb-8  text-white">
          <h1 className="text-3xl font-bold mb-2">JSON Formatter</h1>
          <p className="text-lg text-white ">
            Format, validate, and minify your JSON data
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className=" dark:bg-gray-950 rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b-2 dark:bg-slate-900 border-gray-600 flex justify-between items-center">
              <h2 className="text-lg font-medium dark:text-white text-gray-900 flex items-center gap-2">
                <CodeBracketIcon className="w-5 h-5" />
                Input JSON
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={loadExample}
                  className="inline-flex items-center px-3 py-1 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700  dark:bg-slate-900 dark:text-white bg-white hover:bg-gray-50"
                >
                  Load Example
                </button>
                <button
                  onClick={clearAll}
                  className="inline-flex items-center px-3 py-1 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700  dark:bg-slate-900 dark:text-white bg-white hover:bg-gray-50"
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="relative p-4">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                className="w-full h-96 font-mono text-sm p-4 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Paste your JSON here..."
                spellCheck="false"
              />
              {error && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <div className="flex items-center">
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Output Section */}
          <div className="dark:bg-gray-950 rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b-2 border-gray-600 flex justify-between items-center dark:text-white text-gray-900">
              <h2 className="text-lg font-medium dark:text-white text-gray-900 flex items-center gap-2">
                {error ? (
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                ) : output ? (
                  <CheckCircleIcon className="w-5 h-5 text-green-500" />
                ) : (
                  <CodeBracketIcon className="w-5 h-5" />
                )}
                {error
                  ? 'Validation Error'
                  : output
                    ? 'Formatted JSON'
                    : 'Output'}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={toggleMinify}
                  className="inline-flex items-center px-3 py-1 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:bg-slate-900 dark:text-white bg-white hover:bg-gray-50"
                >
                  {isMinified ? (
                    <ArrowsPointingOutIcon className="w-4 h-4 mr-1" />
                  ) : (
                    <MinusSmallIcon className="w-4 h-4 mr-1" />
                  )}
                  {isMinified ? 'Beautify' : 'Minify'}
                </button>
                {output && (
                  <>
                    <button
                      onClick={copyToClipboard}
                      className="inline-flex items-center px-3 py-1 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      {copied ? (
                        <ClipboardDocumentCheckIcon className="w-4 h-4 mr-1 text-green-500" />
                      ) : (
                        <ClipboardIcon className="w-4 h-4 mr-1" />
                      )}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={downloadJSON}
                      className="inline-flex items-center px-3 py-1 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                      Download
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="p-4">
              {output ? (
                <pre
                  ref={outputRef}
                  className="h-96 overflow-auto font-mono text-sm p-4 dark:bg-transparent bg-gray-50 rounded-md border dark:text-white border-gray-600"
                >
                  {output}
                </pre>
              ) : (
                <div className="h-96 flex items-center justify-center rounded-md border border-gray-600">
                  <div className="text-center text-gray-500">
                    <CodeBracketIcon className="mx-auto h-12 w-12" />
                    <h3 className="mt-2 text-sm font-medium">
                      {error
                        ? 'Invalid JSON Input'
                        : 'Formatted JSON will appear here'}
                    </h3>
                    <p className="mt-1 text-sm">
                      {error
                        ? 'Fix the errors in the input'
                        : 'Enter JSON to format or validate'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              About JSON Formatter
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 p-2 rounded-lg">
                <ArrowsPointingOutIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">Beautify</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Format your JSON with proper indentation and line breaks for
                  better readability.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-green-100 p-2 rounded-lg">
                <MinusSmallIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">Minify</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Compress your JSON by removing all unnecessary whitespace to
                  reduce file size.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-purple-100 p-2 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">Validate</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Check your JSON for syntax errors and get detailed error
                  messages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
