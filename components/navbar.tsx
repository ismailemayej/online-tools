//src/components/navbar.tsx
'use client';
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from '@heroui/navbar';
import { Button } from '@heroui/button';
import { Kbd } from '@heroui/kbd';
import { Link } from '@heroui/link';
import { Input } from '@heroui/input';
import { link as linkStyles } from '@heroui/theme';
import NextLink from 'next/link';
import clsx from 'clsx';

import { siteConfig } from '@/config/site';
import { ThemeSwitch } from '@/components/theme-switch';
import { SearchIcon, Logo } from '@/components/icons';

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search tools"
      classNames={{
        inputWrapper: 'bg-default-100',
        input: 'text-sm',
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={['command']}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search tools..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar maxWidth="xl" position="sticky" isBordered>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <Logo className="w-6 h-6" />
            <p className="font-bold text-inherit">{siteConfig.name}</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-6 justify-start ml-6">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium hover:text-primary transition-colors',
                  item.highlight && 'text-primary font-medium'
                )}
                color="foreground"
                href={item.href}
              >
                {item.icon && <item.icon className="inline mr-2 w-4 h-4" />}
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden lg:flex w-64">{searchInput}</NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2">
          {/* <Link
            isExternal
            aria-label="Feedback"
            href={siteConfig.links.feedback}
            className="p-2 rounded-full hover:bg-default-100"
          >
            <FeedbackIcon className="text-default-600 w-5 h-5" />
          </Link> */}
          <ThemeSwitch />
        </NavbarItem>
        {/* <NavbarItem className="hidden md:flex">
          <Button
            as={Link}
            className="text-sm font-medium"
            href="/all-tools"
            startContent={<ToolsIcon className="text-current w-4 h-4" />}
            variant="flat"
            color="primary"
          >
            All Tools
          </Button>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-4">{searchInput}</div>
        <div className="mx-4 mt-6 flex flex-col gap-3">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={index === 0 ? 'primary' : 'foreground'}
                href={item.href}
                size="lg"
                className="w-full py-3 px-2 rounded-lg hover:bg-default-100"
              >
                {item.icon && <item.icon className="inline mr-3 w-5 h-5" />}
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
        <div className="mx-4 mt-8 pt-4 border-t border-default-200 flex gap-4">
          {/* <Link
            isExternal
            aria-label="GitHub"
            href={siteConfig.links.github}
            className="text-default-600"
          >
            <GithubIcon className="text-2xl" />
          </Link> */}
          {/* <Link
            isExternal
            aria-label="Feedback"
            href={siteConfig.links.feedback}
            className="text-default-600"
          >
            <FeedbackIcon className="text-2xl" />
          </Link> */}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
