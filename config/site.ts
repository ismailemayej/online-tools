import {
  WrenchIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  PhotoIcon,
  ChartBarIcon,
  CalculatorIcon,
  ArrowPathIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/outline';

export const siteConfig = {
  name: 'ToolKit Pro',
  description:
    'Your all-in-one online tools collection for developers, designers, and creators.',
  url: 'https://toolkitpro.vercel.app',
  links: {
    github: 'https://github.com/yourusername/toolkit-pro',
    feedback: 'https://github.com/yourusername/toolkit-pro/issues',
    twitter: 'https://twitter.com/yourhandle',
  },
  navItems: [
    {
      label: 'Text Tools',
      href: '/text',
      icon: DocumentTextIcon,
      highlight: true,
    },
    {
      label: 'Code Tools',
      href: '/code',
      icon: CodeBracketIcon,
    },
    {
      label: 'Image Tools',
      href: '/image',
      icon: PhotoIcon,
    },
    {
      label: 'Data Tools',
      href: '/data',
      icon: ChartBarIcon,
    },
    {
      label: 'Calculators',
      href: '/calculators',
      icon: CalculatorIcon,
    },
  ],
  navMenuItems: [
    {
      label: 'All Tools',
      href: '/all-tools',
      icon: WrenchIcon,
    },
    {
      label: 'Text Tools',
      href: '/text',
      icon: DocumentTextIcon,
    },
    {
      label: 'Code Tools',
      href: '/code',
      icon: CodeBracketIcon,
    },
    {
      label: 'Image Tools',
      href: '/image',
      icon: PhotoIcon,
    },
    {
      label: 'Data Tools',
      href: '/data',
      icon: ChartBarIcon,
    },
    {
      label: 'Calculators',
      href: '/calculators',
      icon: CalculatorIcon,
    },
    {
      label: 'Feedback',
      href: '/feedback',
      icon: ChatBubbleLeftEllipsisIcon,
    },
  ],
  toolCategories: [
    {
      name: 'Text',
      slug: 'text',
      tools: [
        {
          name: 'Case Converter',
          description: 'Convert text between different cases',
          href: '/text/case-converter',
          icon: DocumentTextIcon,
        },
        {
          name: 'Word Counter',
          description: 'Count words, characters, and more',
          href: '/text/word-counter',
          icon: DocumentTextIcon,
        },
      ],
    },
    {
      name: 'Code',
      slug: 'code',
      tools: [
        {
          name: 'JSON Formatter',
          description: 'Format and validate JSON',
          href: '/code/json-formatter',
          icon: CodeBracketIcon,
        },
      ],
    },
  ],
};

export type SiteConfig = typeof siteConfig;
