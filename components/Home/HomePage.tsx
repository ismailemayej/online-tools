"use client";
import {
  ArrowRightIcon,
  CameraIcon,
  ChartBarIcon,
  ClockIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { categories, tools } from "./tools";
import { useState } from "react";

export default function HomePage() {
  const [hoveredTool, setHoveredTool] = useState<number | null>(null);

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Free Online Tools for Everyone
          </h1>
        </div>
      </div>

      {/* Popular Tools Section */}
      <div id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {tools.map((tool, index) => (
            <Link
              key={tool.name}
              href={tool.href}
              className={`relative group col-span-1 flex flex-col items-center p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 ${hoveredTool === index ? "ring-2 ring-blue-500 scale-105" : ""}`}
              onMouseEnter={() => setHoveredTool(index)}
              onMouseLeave={() => setHoveredTool(null)}
            >
              {/* Animated Background Effect */}
              <div
                className={`absolute inset-0 rounded-2xl ${tool.color.split(" ")[0]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>

              {/* Large Interactive Icon */}
              <div
                className={`mb-6 p-5 rounded-full ${tool.color} transition-all duration-300 ${hoveredTool === index ? "scale-110" : ""}`}
              >
                <tool.icon className="h-10 w-10" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
                {tool.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                {tool.description}
              </p>

              {/* Animated Button */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <span className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                  Use tool
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Why choose our tools?
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Instant Results",
                description:
                  "Get immediate outputs without any processing delays or waiting time.",
                icon: ClockIcon,
                color: "bg-blue-500",
              },
              {
                name: "No Installation",
                description:
                  "All tools work directly in your browser with zero setup required.",
                icon: GlobeAltIcon,
                color: "bg-green-500",
              },
              {
                name: "Privacy Focused",
                description:
                  "Your data never leaves your browser - we don't store or track anything.",
                icon: DocumentTextIcon,
                color: "bg-purple-500",
              },
              {
                name: "Regular Updates",
                description:
                  "We constantly improve and add new tools based on user feedback.",
                icon: CodeBracketIcon,
                color: "bg-indigo-500",
              },
              {
                name: "Mobile Friendly",
                description:
                  "All tools work perfectly on any device, from phones to desktops.",
                icon: CameraIcon,
                color: "bg-pink-500",
              },
              {
                name: "Completely Free",
                description:
                  "Access all features without any hidden costs or premium tiers.",
                icon: ChartBarIcon,
                color: "bg-orange-500",
              },
            ].map((feature) => (
              <div
                key={feature.name}
                className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div
                  className={`flex items-center justify-center h-16 w-16 rounded-full ${feature.color} text-white mb-6 mx-auto`}
                >
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3">
                  {feature.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
