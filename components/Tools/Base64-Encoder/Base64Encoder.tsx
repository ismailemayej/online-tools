'use client';
import { useState } from 'react';

export default function Base64Encoder() {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  const handleEncode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (error) {
      setOutput('Encoding error: Invalid input!');
    }
  };

  const handleDecode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
    } catch (error) {
      setOutput('Decoding error: Invalid input!');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6">
        <h1 className="text-2xl font-bold text-center">
          Base64 Encoder / Decoder
        </h1>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl flex flex-col">
        <div className="flex-1 flex flex-col space-y-6">
          <textarea
            className="flex-1 w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Enter your text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="flex space-x-4 justify-center">
            <button
              onClick={handleEncode}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Encode
            </button>
            <button
              onClick={handleDecode}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              Decode
            </button>
          </div>

          <textarea
            className="flex-1 w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Result will appear here..."
            value={output}
            readOnly
          />
        </div>
      </main>
    </div>
  );
}
