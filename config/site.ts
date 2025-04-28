import { HomeIcon, InfoIcon } from 'lucide-react';

export const siteConfig = {
  name: 'Your Site Name',
  description: 'Your site description',
  url: 'https://yoursite.com',
  links: {
    github: 'https://github.com/your-repo',
    feedback: 'https://feedback.yoursite.com',
    twitter: 'https://twitter.com/yourhandle',
  },
  navItems: [
    {
      label: 'Home',
      href: '/',
      icon: HomeIcon,
      highlight: true,
    },
    {
      label: 'About',
      href: '/about',
      icon: InfoIcon,
      highlight: false,
    },
  ],
  navMenuItems: [
    {
      label: 'Contact',
      href: '/contact',
      icon: InfoIcon,
    },
  ],
  relatedItems: [
    { label: 'Related Tool 1', href: '/related-tool-1', icon: null },
    { label: 'Related Tool 2', href: '/related-tool-2', icon: null },
  ],
};
