"use client";
import { useState, useEffect } from "react";
import {
  CalculatorIcon,
  CalendarIcon,
  ArrowPathIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

type AgeResult = {
  years: number;
  months: number;
  days: number;
};

type DateInput = {
  day: string;
  month: string;
  year: string;
};

export default function AgeCalculator() {
  const [dateInput, setDateInput] = useState<DateInput>({
    day: "",
    month: "",
    year: "",
  });
  const [age, setAge] = useState<AgeResult | null>(null);
  const [error, setError] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Check system preference and handle changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateAge = (): void => {
    const { day, month, year } = dateInput;

    if (!day || !month || !year) {
      setError("Please enter complete date");
      setAge(null);
      return;
    }

    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) {
      setError("Please enter valid numbers");
      setAge(null);
      return;
    }

    if (monthNum < 1 || monthNum > 12) {
      setError("Month must be between 1-12");
      setAge(null);
      return;
    }

    if (dayNum < 1 || dayNum > 31) {
      setError("Day must be between 1-31");
      setAge(null);
      return;
    }

    if (yearNum < 1900 || yearNum > new Date().getFullYear()) {
      setError(`Year must be between 1900-${new Date().getFullYear()}`);
      setAge(null);
      return;
    }

    const birthDate = new Date(yearNum, monthNum - 1, dayNum);
    const today = new Date();

    if (
      birthDate.getDate() !== dayNum ||
      birthDate.getMonth() !== monthNum - 1 ||
      birthDate.getFullYear() !== yearNum
    ) {
      setError("Invalid date");
      setAge(null);
      return;
    }

    if (birthDate > today) {
      setError("Birth date cannot be in the future");
      setAge(null);
      return;
    }

    setError("");

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({
      years,
      months,
      days,
    });
  };

  const resetCalculator = (): void => {
    setDateInput({
      day: "",
      month: "",
      year: "",
    });
    setAge(null);
    setError("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <CalculatorIcon className="h-8 w-8 text-blue-500 dark:text-blue-400 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Age Calculator
          </h1>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Your Date of Birth
        </label>
        <div className="flex space-x-2">
          <div className="flex-1">
            <input
              type="number"
              name="day"
              placeholder="DD"
              value={dateInput.day}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              min="1"
              max="31"
            />
          </div>
          <div className="flex-1">
            <input
              type="number"
              name="month"
              placeholder="MM"
              value={dateInput.month}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              min="1"
              max="12"
            />
          </div>
          <div className="flex-1">
            <input
              type="number"
              name="year"
              placeholder="YYYY"
              value={dateInput.year}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={calculateAge}
          className="flex-1 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors duration-200"
        >
          <CalculatorIcon className="h-5 w-5 mr-2" />
          Calculate Age
        </button>
        <button
          onClick={resetCalculator}
          className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-md flex items-center justify-center transition-colors duration-200"
        >
          <ArrowPathIcon className="h-5 w-5 mr-2" />
          Reset
        </button>
      </div>

      {age && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-md transition-colors duration-300">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Your Age
          </h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white dark:bg-gray-800 p-3 rounded shadow transition-colors duration-300">
              <p className="text-3xl font-bold text-blue-500 dark:text-blue-400">
                {age.years}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Years</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded shadow transition-colors duration-300">
              <p className="text-3xl font-bold text-blue-500 dark:text-blue-400">
                {age.months}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Months</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded shadow transition-colors duration-300">
              <p className="text-3xl font-bold text-blue-500 dark:text-blue-400">
                {age.days}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Days</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Born on{" "}
            {new Date(
              parseInt(dateInput.year),
              parseInt(dateInput.month) - 1,
              parseInt(dateInput.day)
            ).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      )}
    </div>
  );
}
