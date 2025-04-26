"use client";

import { useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [tenure, setTenure] = useState<number>(0);
  const [emi, setEmi] = useState<number | null>(null);

  const calculateEMI = () => {
    const monthlyRate = interestRate / (12 * 100);
    const numberOfMonths = tenure * 12;
    const emiValue =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
    setEmi(emiValue);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Loan EMI Calculator
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Amount (৳)
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter loan amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter interest rate"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Tenure (Years)
            </label>
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter tenure"
            />
          </div>
        </div>

        <button
          onClick={calculateEMI}
          className="flex items-center justify-center w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition"
        >
          Calculate EMI <ArrowRightIcon className="w-5 h-5 ml-2" />
        </button>

        {emi !== null && (
          <div className="mt-6 text-center bg-green-100 p-4 rounded-xl">
            <p className="text-lg font-semibold text-green-800">
              Monthly EMI: ৳ {emi.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
