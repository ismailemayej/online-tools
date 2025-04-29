'use client';
import { useState, useEffect } from 'react';

import {
  MoonIcon,
  RulerIcon,
  ScaleIcon,
  SunIcon,
  ThermometerSunIcon,
} from 'lucide-react';
import { UnitCategory } from '@/types';

const units = {
  length: {
    meter: {
      name: 'Meter',
      convertFrom: (value: number) => value,
      convertTo: (value: number) => value,
    },
    kilometer: {
      name: 'Kilometer',
      convertFrom: (value: number) => value * 1000,
      convertTo: (value: number) => value / 1000,
    },
  },
  weight: {
    gram: {
      name: 'Gram',
      convertFrom: (value: number) => value,
      convertTo: (value: number) => value,
    },
    kilogram: {
      name: 'Kilogram',
      convertFrom: (value: number) => value * 1000,
      convertTo: (value: number) => value / 1000,
    },
  },
  temperature: {
    celsius: {
      name: 'Celsius',
      convertFrom: (value: number) => value,
      convertTo: (value: number) => value,
    },
    fahrenheit: {
      name: 'Fahrenheit',
      convertFrom: (value: number) => (value - 32) * (5 / 9),
      convertTo: (value: number) => value * (9 / 5) + 32,
    },
  },
};

export default function UnitConverter() {
  const [mounted, setMounted] = useState(false);
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [fromUnit, setFromUnit] =
    useState<keyof (typeof units)['length']>('meter');
  const [toUnit, setToUnit] = useState<keyof (typeof units)['length']>('meter');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setFromUnit(
      Object.keys(units[category])[0] as keyof (typeof units)['length']
    );
    setToUnit(
      Object.keys(units[category])[0] as keyof (typeof units)['length']
    );
  }, [category]);

  useEffect(() => {
    if (fromValue === '') {
      setToValue('');
      return;
    }
    const categoryUnits = units[category] as Record<
      string,
      {
        convertFrom: (value: number) => number;
        convertTo: (value: number) => number;
      }
    >;
    const baseValue = categoryUnits[fromUnit].convertFrom(
      parseFloat(fromValue)
    );
    const convertedValue = categoryUnits[toUnit].convertTo(baseValue);
    setToValue(convertedValue.toFixed(2));
  }, [fromValue, fromUnit, toUnit, category]);

  const handleCategoryChange = (newCategory: UnitCategory) => {
    setCategory(newCategory);
  };

  const handleFromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromValue(e.target.value);
  };

  const handleFromUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromUnit(e.target.value as keyof (typeof units)['length']);
  };

  const handleToUnitChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void = (e) => {
    setToUnit(e.target.value as keyof (typeof units)['length']);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return mounted ? (
    <div
      className={`min-h-screen flex flex-col items-center justify-start  py-8 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : ' text-gray-900'
      } transition-colors duration-300`}
    >
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-6 dark:bg-gray-900 bg-blue-800 text-white dark: p-4 rounded-xl ">
          <h2 className=" text-2xl lg:text-3xl font-extrabold">
            Unit Converter
          </h2>
        </div>

        {/* Main container */}
        <div className="w-full bg-white dark:bg-gray-800 p-6 md:p-10 rounded-xl shadow-xl transition-all">
          <div className="space-y-6">
            {/* Category Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                {
                  label: 'Length',
                  icon: <RulerIcon className="h-6 w-6 mr-2" />,
                  value: 'length',
                },
                {
                  label: 'Weight',
                  icon: <ScaleIcon className="h-6 w-6 mr-2" />,
                  value: 'weight',
                },
                {
                  label: 'Temperature',
                  icon: <ThermometerSunIcon className="h-6 w-6 mr-2" />,
                  value: 'temperature',
                },
              ].map(({ label, icon, value }) => (
                <button
                  key={value}
                  onClick={() => handleCategoryChange(value as UnitCategory)}
                  className={`flex items-center px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ${
                    category === value
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>

            {/* Input fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-lg font-medium dark:text-white">
                  From Value
                </label>
                <input
                  type="number"
                  value={fromValue}
                  onChange={handleFromValueChange}
                  className="mt-2 p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-black dark:text-white"
                  placeholder="Enter value"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg font-medium dark:text-white">
                  To Value
                </label>
                <input
                  type="text"
                  value={toValue}
                  readOnly
                  className="mt-2 p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-600 text-black dark:text-white"
                  placeholder="Converted value"
                />
              </div>
            </div>

            {/* Unit Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-lg font-medium dark:text-white">
                  From Unit
                </label>
                <select
                  value={fromUnit}
                  onChange={handleFromUnitChange}
                  className="mt-2 p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-black dark:text-white"
                >
                  {Object.keys(units[category]).map((unitKey) => (
                    <option key={unitKey} value={unitKey}>
                      {
                        (units[category] as Record<string, { name: string }>)[
                          unitKey
                        ].name
                      }
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-medium dark:text-white">
                  To Unit
                </label>
                <select
                  value={toUnit}
                  onChange={handleToUnitChange}
                  className="mt-2 p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-black dark:text-white"
                >
                  {Object.keys(units[category]).map((unitKey) => (
                    <option key={unitKey} value={unitKey}>
                      {
                        (units[category] as Record<string, { name: string }>)[
                          unitKey
                        ].name
                      }
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
