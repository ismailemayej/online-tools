'use client';

import { useState, useEffect } from 'react';
import {
  PaintBrushIcon,
  MoonIcon,
  SunIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';

export default function ColorPickerPage() {
  const [color, setColor] = useState('#3b82f6');
  const [rgb, setRgb] = useState('59, 130, 246');
  const [hsl, setHsl] = useState('213, 92%, 60%');
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    updateColorValues(newColor);
  };

  const updateColorValues = (hex: string) => {
    // Hex to RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    setRgb(`${r}, ${g}, ${b}`);

    // Hex to HSL
    const hsl = hexToHSL(hex);
    setHsl(`${hsl.h}, ${hsl.s}%, ${hsl.l}%`);
  };

  const hexToHSL = (hex: string) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return null;

  return (
    <>
      <div className=" w-full my-4 dark:bg-gray-900 bg-blue-800 text-white rounded-xl flex flex-col sm:flex-row items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2 m-4">
          <PaintBrushIcon className="w-8 h-8" />
          Color Picker
        </h1>
      </div>

      <div
        className={`min-h-screen transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-gray-900 text-gray-100'
            : 'bg-gray-50 text-gray-900'
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          <div
            className={`rounded-xl shadow-lg overflow-hidden ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="flex flex-col md:flex-row gap-8 p-6">
              {/* Color Picker Section */}
              <div className="flex-1">
                <div className="mb-6">
                  <label
                    htmlFor="color-picker"
                    className="block text-sm font-medium mb-2"
                  >
                    Select Color
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      id="color-picker"
                      value={color}
                      onChange={handleColorChange}
                      className="w-16 h-16 cursor-pointer rounded-lg border border-gray-300"
                    />
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => {
                        setColor(e.target.value);
                        updateColorValues(e.target.value);
                      }}
                      className={`flex-1 p-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600'
                          : 'bg-white border-gray-300'
                      }`}
                    />
                  </div>
                </div>

                {/* Color Preview */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-3">Color Preview</h2>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div
                        className="w-full h-20 rounded-lg mb-2"
                        style={{ backgroundColor: color }}
                      ></div>
                      <p className="text-sm text-center">Primary</p>
                    </div>
                    <div>
                      <div
                        className="w-full h-20 rounded-lg mb-2"
                        style={{ backgroundColor: `${color}20` }}
                      ></div>
                      <p className="text-sm text-center">Light</p>
                    </div>
                    <div>
                      <div
                        className="w-full h-20 rounded-lg mb-2"
                        style={{ backgroundColor: `${color}80` }}
                      ></div>
                      <p className="text-sm text-center">Dark</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Values Section */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-4">Color Values</h2>

                <div className="space-y-4">
                  {/* HEX */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      HEX
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        value={color}
                        readOnly
                        className={`flex-1 p-2 rounded-l-lg border ${
                          theme === 'dark'
                            ? 'bg-gray-700 border-gray-600'
                            : 'bg-white border-gray-300'
                        }`}
                      />
                      <button
                        onClick={() => copyToClipboard(color)}
                        className={`px-3 rounded-r-lg flex items-center ${
                          theme === 'dark'
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-blue-500 hover:bg-blue-600'
                        } text-white`}
                      >
                        <ClipboardDocumentIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* RGB */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      RGB
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        value={`rgb(${rgb})`}
                        readOnly
                        className={`flex-1 p-2 rounded-l-lg border ${
                          theme === 'dark'
                            ? 'bg-gray-700 border-gray-600'
                            : 'bg-white border-gray-300'
                        }`}
                      />
                      <button
                        onClick={() => copyToClipboard(`rgb(${rgb})`)}
                        className={`px-3 rounded-r-lg flex items-center ${
                          theme === 'dark'
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-blue-500 hover:bg-blue-600'
                        } text-white`}
                      >
                        <ClipboardDocumentIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* HSL */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      HSL
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        value={`hsl(${hsl})`}
                        readOnly
                        className={`flex-1 p-2 rounded-l-lg border ${
                          theme === 'dark'
                            ? 'bg-gray-700 border-gray-600'
                            : 'bg-white border-gray-300'
                        }`}
                      />
                      <button
                        onClick={() => copyToClipboard(`hsl(${hsl})`)}
                        className={`px-3 rounded-r-lg flex items-center ${
                          theme === 'dark'
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-blue-500 hover:bg-blue-600'
                        } text-white`}
                      >
                        <ClipboardDocumentIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Color Palette Suggestions */}
                <div className="mt-8">
                  <h2 className="text-lg font-semibold mb-3">
                    Suggested Palette
                  </h2>
                  <div className="grid grid-cols-5 gap-2">
                    {generatePalette(color).map((shade, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div
                          className="w-full h-10 rounded cursor-pointer"
                          style={{ backgroundColor: shade }}
                          onClick={() => {
                            setColor(shade);
                            updateColorValues(shade);
                          }}
                        ></div>
                        <span className="text-xs mt-1 break-words">
                          {shade}
                        </span>
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
              className={`fixed bottom-4 right-4 p-3 rounded-lg shadow-lg ${
                theme === 'dark'
                  ? 'bg-green-800 text-green-100'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              Copied to clipboard!
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function generatePalette(baseColor: string): string[] {
  // Simple palette generation - in a real app, consider using a library for more control
  const hex = baseColor.slice(1);
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return [
    `#${Math.min(r + 50, 255)
      .toString(16)
      .padStart(2, '0')}${Math.min(g + 50, 255)
      .toString(16)
      .padStart(2, '0')}${Math.min(b + 50, 255)
      .toString(16)
      .padStart(2, '0')}`,
    `#${Math.min(r + 25, 255)
      .toString(16)
      .padStart(2, '0')}${Math.min(g + 25, 255)
      .toString(16)
      .padStart(2, '0')}${Math.min(b + 25, 255)
      .toString(16)
      .padStart(2, '0')}`,
    baseColor,
    `#${Math.max(r - 25, 0)
      .toString(16)
      .padStart(2, '0')}${Math.max(g - 25, 0)
      .toString(16)
      .padStart(2, '0')}${Math.max(b - 25, 0)
      .toString(16)
      .padStart(2, '0')}`,
    `#${Math.max(r - 50, 0)
      .toString(16)
      .padStart(2, '0')}${Math.max(g - 50, 0)
      .toString(16)
      .padStart(2, '0')}${Math.max(b - 50, 0)
      .toString(16)
      .padStart(2, '0')}`,
  ];
}
