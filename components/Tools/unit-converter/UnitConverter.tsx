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

  const handleToUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToUnit(e.target.value as keyof (typeof units)['length']);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return mounted ? (
    <div
      className={`w-full max-w-4xl mx-auto p-6 bg-${theme === 'dark' ? 'gray-900' : 'white'} rounded-xl shadow-xl transition-all`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold text-${theme === 'dark' ? 'white' : 'gray-900'}">
          Unit Converter
        </h2>
      </div>

      <div className="space-y-6">
        <div className="flex gap-6 justify-center">
          <button
            onClick={() => handleCategoryChange('length')}
            className={`${
              category === 'length'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            } p-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex items-center`}
          >
            <RulerIcon className="h-6 w-6 mr-2" />
            Length
          </button>
          <button
            onClick={() => handleCategoryChange('weight')}
            className={`${
              category === 'weight'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            } p-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex items-center`}
          >
            <ScaleIcon className="h-6 w-6 mr-2" />
            Weight
          </button>
          <button
            onClick={() => handleCategoryChange('temperature')}
            className={`${
              category === 'temperature'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            } p-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex items-center`}
          >
            <ThermometerSunIcon className="h-6 w-6 mr-2" />
            Temperature
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col">
            <label className="text-lg font-medium">From Value</label>
            <input
              type="number"
              value={fromValue}
              onChange={handleFromValueChange}
              className="mt-2 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Enter value"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-medium">To Value</label>
            <input
              type="text"
              value={toValue}
              readOnly
              className="mt-2 p-4 border border-gray-300 rounded-xl bg-gray-100 text-gray-500"
              placeholder="Converted value"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-6">
          <div className="flex flex-col">
            <label className="text-lg font-medium">From Unit</label>
            <select
              value={fromUnit}
              onChange={handleFromUnitChange}
              className="mt-2 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
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
            <label className="text-lg font-medium">To Unit</label>
            <select
              value={toUnit}
              onChange={handleToUnitChange}
              className="mt-2 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
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
  ) : null;
}
