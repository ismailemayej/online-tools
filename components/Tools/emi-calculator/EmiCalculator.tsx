'use client';
import { useState, useEffect } from 'react';
import {
  ArrowRightIcon,
  CurrencyDollarIcon,
  ScaleIcon,
  ClockIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/solid';
export default function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(5);
  const [emi, setEmi] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Check for user's preferred color scheme
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setDarkMode(true);
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const calculateEMI = () => {
    const monthlyRate = interestRate / (12 * 100);
    const numberOfMonths = tenure * 12;
    const emiValue =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

    setEmi(emiValue);
    setTotalPayment(emiValue * numberOfMonths);
    setTotalInterest(emiValue * numberOfMonths - loanAmount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateEMI();
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-indigo-50 to-blue-100'}`}
    >
      <div className="w-full max-w-6xl mx-auto">
        <div
          className={`rounded-3xl shadow-xl overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          {/* Header with dark mode toggle */}
          <div
            className={`bg-gradient-to-r from-indigo-600 to-blue-600 p-6 md:p-8 text-white flex justify-between items-center`}
          >
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Loan EMI Calculator
              </h1>
              <p className="opacity-90 mt-1 md:mt-2">
                Calculate your monthly loan payments easily
              </p>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-blue-700 text-white'}`}
              aria-label={
                darkMode ? 'Switch to light mode' : 'Switch to dark mode'
              }
            >
              {darkMode ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Main content - responsive layout */}
          <div className="flex flex-col lg:flex-row">
            {/* Form section - always on left */}
            <div className="w-full lg:w-1/2 p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label
                      className={`flex text-sm font-medium mb-1 items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      <CurrencyDollarIcon className="w-5 h-5 mr-2 text-indigo-400" />
                      Loan Amount (৳)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className={`w-full border rounded-lg py-3 px-4 pl-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                        placeholder="100,000"
                        min="0"
                      />
                      <span
                        className={`absolute left-3 top-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                      >
                        ৳
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      className={`text-sm font-medium mb-1 flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      <ScaleIcon className="w-5 h-5 mr-2 text-indigo-400" />
                      Interest Rate (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={interestRate}
                        onChange={(e) =>
                          setInterestRate(Number(e.target.value))
                        }
                        className={`w-full border rounded-lg py-3 px-4 pl-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                        placeholder="8.5"
                        step="0.01"
                        min="0"
                      />
                      <span
                        className={`absolute left-3 top-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                      >
                        %
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      className={`flex text-sm font-medium mb-1 items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      <ClockIcon className="w-5 h-5 mr-2 text-indigo-400" />
                      Loan Tenure (Years)
                    </label>
                    <input
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className={`w-full border rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                      placeholder="5"
                      min="1"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center"
                >
                  Calculate EMI
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </button>
              </form>
            </div>

            {/* Results section - bottom on mobile, right side on desktop */}
            {emi !== null && (
              <div
                className={`w-full lg:w-1/2 p-6 md:p-8 ${darkMode ? 'lg:border-l border-gray-700' : 'lg:border-l border-gray-200'}`}
              >
                <div
                  className={`rounded-xl p-6 shadow-inner ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}
                >
                  <h3
                    className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}
                  >
                    Loan Summary
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      className={`p-4 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-white'} shadow-sm`}
                    >
                      <p
                        className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                      >
                        Monthly Payment
                      </p>
                      <p className="text-2xl font-bold text-indigo-500">
                        ৳ {emi.toFixed(2)}
                      </p>
                    </div>

                    <div
                      className={`p-4 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-white'} shadow-sm`}
                    >
                      <p
                        className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                      >
                        Total Interest
                      </p>
                      <p className="text-2xl font-bold text-red-400">
                        ৳ {totalInterest.toFixed(2)}
                      </p>
                    </div>

                    <div
                      className={`p-4 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-white'} shadow-sm`}
                    >
                      <p
                        className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                      >
                        Principal Amount
                      </p>
                      <p className="text-2xl font-bold text-green-500">
                        ৳ {loanAmount.toFixed(2)}
                      </p>
                    </div>

                    <div
                      className={`p-4 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-white'} shadow-sm`}
                    >
                      <p
                        className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                      >
                        Total Payment
                      </p>
                      <p className="text-2xl font-bold text-green-500">
                        ৳ {totalPayment.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4
                      className={`text-md font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Payment Breakdown
                    </h4>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-4 h-4 bg-indigo-500 rounded-sm"></div>
                      <span
                        className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        Principal: ৳ {loanAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-400 rounded-sm"></div>
                      <span
                        className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        Interest: ৳ {totalInterest.toFixed(2)}
                      </span>
                    </div>
                    <div className="mt-4 h-3 bg-gray-300 rounded-full overflow-hidden">
                      <div
                        className="h-full"
                        style={{
                          width: `${(loanAmount / totalPayment) * 100}%`,
                          background: `linear-gradient(90deg, #6366F1 ${(loanAmount / totalPayment) * 100}%, #F87171 0%)`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
