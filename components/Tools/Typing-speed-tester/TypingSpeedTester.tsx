"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  KeyboardIcon,
  TimerIcon,
  GaugeIcon,
  CheckCircleIcon,
  ClockIcon,
  SunIcon,
  MoonIcon,
} from "lucide-react";

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!",
  "Programming is the art of telling another human what one wants the computer to do. Clean code always looks like it was written by someone who cares.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. The only way to do great work is to love what you do.",
  "The universe is under no obligation to make sense to you. Science is not only a disciple of reason but also one of romance and passion.",
  "Music is the divine way to tell beautiful, poetic things to the heart. Art enables us to find ourselves and lose ourselves at the same time.",
];

export default function TypingSpeedTester() {
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [stats, setStats] = useState({
    wpm: 0,
    accuracy: 100,
    correctChars: 0,
    incorrectChars: 0,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Select random text on component mount
  useEffect(() => {
    resetTest();
    // Check for user's preferred color scheme
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
    }
  }, []);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && !isComplete) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      interval && clearInterval(interval);
    }

    return () => {
      interval && clearInterval(interval);
    };
  }, [isActive, isComplete, timer]);

  // Calculate stats whenever user input changes
  useEffect(() => {
    if (isActive && text.length > 0) {
      calculateStats();
    }
  }, [userInput, text]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const calculateStats = useCallback(() => {
    let correct = 0;
    let incorrect = 0;

    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === text[i]) {
        correct++;
      } else {
        incorrect++;
      }
    }

    // Calculate WPM (assuming 5 characters = 1 word)
    const minutes = timer / 60;
    const words = correct / 5;
    const wpm = minutes > 0 ? Math.round(words / minutes) : 0;

    // Calculate accuracy
    const totalTyped = correct + incorrect;
    const accuracy =
      totalTyped > 0 ? Math.round((correct / totalTyped) * 100) : 100;

    setStats({
      wpm,
      accuracy,
      correctChars: correct,
      incorrectChars: incorrect,
    });

    // Check if test is complete
    if (userInput.length === text.length) {
      setIsComplete(true);
      setIsActive(false);
    }
  }, [userInput, text, timer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Start timer on first keystroke
    if (!isActive && value.length === 1) {
      setIsActive(true);
    }

    setUserInput(value);
  };

  const resetTest = () => {
    const randomText =
      sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setText(randomText);
    setUserInput("");
    setTimer(0);
    setIsActive(false);
    setIsComplete(false);
    setStats({
      wpm: 0,
      accuracy: 100,
      correctChars: 0,
      incorrectChars: 0,
    });

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const renderTextWithHighlighting = () => {
    return text.split("").map((char, index) => {
      let className = "";

      if (index < userInput.length) {
        className =
          userInput[index] === char
            ? darkMode
              ? "text-green-400"
              : "text-green-600"
            : darkMode
              ? "text-red-400 bg-red-900/30"
              : "text-red-600 bg-red-100";
      } else if (index === userInput.length) {
        className = darkMode ? "bg-blue-900/50" : "bg-blue-100";
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800"}`}
    >
      <div
        className={`w-full rounded-2xl shadow-xl overflow-hidden transition-colors duration-300 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <KeyboardIcon className="w-8 h-8" />
              Typing Speed Test
            </h1>
            <p className="text-center opacity-90 mt-2">
              Test your typing speed and accuracy
            </p>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? "bg-gray-700 text-yellow-300" : "bg-blue-700 text-white"}`}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Main content */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              className={`p-4 rounded-lg flex items-center gap-3 ${darkMode ? "bg-gray-700" : "bg-blue-50"}`}
            >
              <div
                className={`p-2 rounded-full ${darkMode ? "bg-gray-600" : "bg-blue-100"}`}
              >
                <GaugeIcon
                  className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                />
              </div>
              <div>
                <p
                  className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  Speed
                </p>
                <p
                  className={`text-xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                >
                  {stats.wpm} WPM
                </p>
              </div>
            </div>

            <div
              className={`p-4 rounded-lg flex items-center gap-3 ${darkMode ? "bg-gray-700" : "bg-green-50"}`}
            >
              <div
                className={`p-2 rounded-full ${darkMode ? "bg-gray-600" : "bg-green-100"}`}
              >
                <CheckCircleIcon
                  className={`w-5 h-5 ${darkMode ? "text-green-400" : "text-green-600"}`}
                />
              </div>
              <div>
                <p
                  className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  Accuracy
                </p>
                <p
                  className={`text-xl font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}
                >
                  {stats.accuracy}%
                </p>
              </div>
            </div>

            <div
              className={`p-4 rounded-lg flex items-center gap-3 ${darkMode ? "bg-gray-700" : "bg-purple-50"}`}
            >
              <div
                className={`p-2 rounded-full ${darkMode ? "bg-gray-600" : "bg-purple-100"}`}
              >
                <ClockIcon
                  className={`w-5 h-5 ${darkMode ? "text-purple-400" : "text-purple-600"}`}
                />
              </div>
              <div>
                <p
                  className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  Time
                </p>
                <p
                  className={`text-xl font-bold ${darkMode ? "text-purple-400" : "text-purple-600"}`}
                >
                  {timer}s
                </p>
              </div>
            </div>

            <div
              className={`p-4 rounded-lg flex items-center gap-3 ${darkMode ? "bg-gray-700" : "bg-amber-50"}`}
            >
              <div
                className={`p-2 rounded-full ${darkMode ? "bg-gray-600" : "bg-amber-100"}`}
              >
                <TimerIcon
                  className={`w-5 h-5 ${darkMode ? "text-amber-400" : "text-amber-600"}`}
                />
              </div>
              <div>
                <p
                  className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  Progress
                </p>
                <p
                  className={`text-xl font-bold ${darkMode ? "text-amber-400" : "text-amber-600"}`}
                >
                  {text.length > 0
                    ? Math.round((userInput.length / text.length) * 100)
                    : 0}
                  %
                </p>
              </div>
            </div>
          </div>

          {/* Text display */}
          <div
            ref={textRef}
            className={`p-6 rounded-lg border text-2xl leading-relaxed min-h-32 font-mono ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}
          >
            {renderTextWithHighlighting()}
          </div>

          {/* Input area */}
          <div className="space-y-4">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              disabled={isComplete}
              className={`w-full p-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-6 text-lg ${darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "border-gray-300"}`}
              placeholder={
                isComplete
                  ? "Test completed! Click restart to try again"
                  : "Start typing here..."
              }
              autoFocus
            />

            <div className="flex justify-between items-center">
              <button
                onClick={resetTest}
                className={`px-6 py-3 rounded-lg font-medium transition flex items-center gap-2 ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-100" : "bg-gray-100 hover:bg-gray-200 text-gray-800"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                Restart Test
              </button>

              {isComplete && (
                <div
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${darkMode ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-800"}`}
                >
                  <CheckCircleIcon className="w-5 h-5" />
                  Test completed!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`mt-8 text-center ${darkMode ? "text-gray-400" : "text-gray-600"}`}
      >
        <p>
          Tip: Try to type without looking at your keyboard for best results
        </p>
      </div>
    </div>
  );
}
