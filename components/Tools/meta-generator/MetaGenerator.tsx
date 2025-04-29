'use client';

import { useState, useEffect } from 'react';
import {
  CodeBracketIcon,
  MoonIcon,
  SunIcon,
  ClipboardDocumentIcon,
  EyeIcon,
  TrashIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';

export default function MetaTagGenerator() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tags, setTags] = useState([
    { name: 'title', content: 'My Awesome Website', isOpen: true },
    {
      name: 'description',
      content: 'This is my amazing website built with Next.js',
      isOpen: true,
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
      isOpen: true,
    },
    { name: 'og:title', content: 'My Awesome Website', isOpen: false },
    {
      name: 'og:description',
      content: 'This is my amazing website built with Next.js',
      isOpen: false,
    },
    {
      name: 'og:image',
      content: 'https://example.com/image.jpg',
      isOpen: false,
    },
  ]);
  const [newTag, setNewTag] = useState({ name: '', content: '', isOpen: true });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedTags = [...tags];
    updatedTags[index] = { ...updatedTags[index], [field]: value };
    setTags(updatedTags);
  };

  const addNewTag = () => {
    if (newTag.name.trim() && newTag.content.trim()) {
      setTags([...tags, newTag]);
      setNewTag({ name: '', content: '', isOpen: true });
    }
  };

  const removeTag = (index: number) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const toggleTag = (index: number) => {
    const updatedTags = [...tags];
    updatedTags[index].isOpen = !updatedTags[index].isOpen;
    setTags(updatedTags);
  };

  const generateMetaTags = () => {
    return tags
      .filter((tag) => tag.name && tag.content)
      .map((tag) => {
        if (tag.name.startsWith('og:')) {
          return `  <meta property="${tag.name}" content="${tag.content}" />`;
        } else if (tag.name === 'title') {
          return `  <title>${tag.content}</title>`;
        } else {
          return `  <meta name="${tag.name}" content="${tag.content}" />`;
        }
      })
      .join('\n');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`<head>\n${generateMetaTags()}\n</head>`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const previewMetaTags = () => {
    return tags
      .filter((tag) => tag.name && tag.content)
      .map((tag) => ({
        name: tag.name.startsWith('og:')
          ? `property="${tag.name}"`
          : `name="${tag.name}"`,
        content: tag.content,
      }));
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? ' text-gray-100' : ' text-gray-900'}`}
    >
      <div className="container mx-auto pb-12">
        <div className="flex justify-between items-center  mb-8 dark:bg-gray-900 bg-blue-700 p-4 rounded-xl text-white px-3 py-8 text-center">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <CodeBracketIcon className="w-8 h-8" />
            Meta Tag Generator
          </h1>
        </div>

        <div
          className={`rounded-xl p-3 shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tag Editor Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Configure Your Meta Tags
              </h2>

              <div className="space-y-4">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{tag.name || 'New Tag'}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleTag(index)}
                          className={`p-1 rounded ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeTag(index)}
                          className={`p-1 rounded ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {tag.isOpen && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            value={tag.name}
                            onChange={(e) =>
                              handleInputChange(index, 'name', e.target.value)
                            }
                            className={`w-full p-2 rounded border ${theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
                            placeholder="e.g., description, og:title"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Content
                          </label>
                          <input
                            type="text"
                            value={tag.content}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                'content',
                                e.target.value
                              )
                            }
                            className={`w-full p-2 rounded border ${theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
                            placeholder="Enter content value"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Add New Tag */}
                <div
                  className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
                >
                  <h3 className="font-medium mb-3">Add New Tag</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={newTag.name}
                        onChange={(e) =>
                          setNewTag({ ...newTag, name: e.target.value })
                        }
                        className={`w-full p-2 rounded border ${theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
                        placeholder="e.g., keywords, author"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Content
                      </label>
                      <input
                        type="text"
                        value={newTag.content}
                        onChange={(e) =>
                          setNewTag({ ...newTag, content: e.target.value })
                        }
                        className={`w-full p-2 rounded border ${theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
                        placeholder="Enter content value"
                      />
                    </div>
                    <button
                      onClick={addNewTag}
                      className={`flex items-center gap-1 px-3 py-2 rounded ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                    >
                      <PlusIcon className="w-4 h-4" />
                      Add Tag
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Generated Code</h2>
                <button
                  onClick={copyToClipboard}
                  className={`flex items-center gap-1 px-3 py-2 rounded ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                >
                  <ClipboardDocumentIcon className="w-4 h-4" />
                  Copy Code
                </button>
              </div>

              <div
                className={`p-4 rounded-lg overflow-auto max-h-96 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
              >
                <pre className="text-sm">
                  <code>{`<head>\n${generateMetaTags()}\n</head>`}</code>
                </pre>
              </div>

              <h2 className="text-xl font-semibold mt-6 mb-4">Preview</h2>
              <div
                className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              >
                <div className="space-y-2">
                  {previewMetaTags().map((tag, index) => (
                    <div
                      key={index}
                      className="flex flex-wrap gap-1 items-center"
                    >
                      <span
                        className={`px-2 py-1 rounded text-xs ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-100'}`}
                      >
                        {tag.name}
                      </span>
                      <span className="text-sm">→</span>
                      <span className="text-sm">{tag.content}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Message */}
        {copied && (
          <div
            className={`fixed bottom-4 right-4 p-3 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-green-800 text-green-100' : 'bg-green-100 text-green-800'}`}
          >
            Copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
}
