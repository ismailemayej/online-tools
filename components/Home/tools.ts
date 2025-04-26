import {
  BanknotesIcon,
  CalculatorIcon,
  DocumentTextIcon,
  LockClosedIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
export const tools = [
  {
    name: "Age Calculator",
    icon: CalculatorIcon,
    description: "Calculate exact age in years, months, and days",
    href: "/age-calculator",
    category: "calculators",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
  },
  {
    name: "Word & Character Counter",
    icon: DocumentTextIcon,
    description: "Count words, characters, sentences, and reading time",
    href: "/word-counter",
    category: "text",
    color:
      "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300",
  },
  {
    name: "Password Generator",
    icon: LockClosedIcon,
    description: "Create strong, random passwords with customizable options",
    href: "/password-generator",
    category: "security",
    color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
    features: [
      "Custom length (4-32 chars)",
      "Uppercase/lowercase",
      "Numbers & symbols",
      "Strength indicator",
    ],
  },
  {
    name: "QR Code Generator",
    icon: QrCodeIcon,
    description: "Create customizable QR codes for URLs, text, and more",
    href: "/qr-code-generator",
    category: "generators",
    color:
      "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
    features: [
      "Custom colors",
      "Adjustable size",
      "Error correction",
      "Instant download",
    ],
  },
  {
    name: "Loan EMI Calculator",
    icon: BanknotesIcon,
    description: "Easily calculate your monthly EMI for any loan",
    href: "/emi-calculator",
    category: "calculators",
    color:
      "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300",
  },
];

export const categories = [
  { name: "All", count: tools.length },
  {
    name: "Calculators",
    count: tools.filter((t) => t.category === "calculators").length,
  },
  {
    name: "Productivity",
    count: tools.filter((t) => t.category === "productivity").length,
  },
  { name: "Text", count: tools.filter((t) => t.category === "text").length },
  { name: "Media", count: tools.filter((t) => t.category === "media").length },
  { name: "Web", count: tools.filter((t) => t.category === "web").length },
];
