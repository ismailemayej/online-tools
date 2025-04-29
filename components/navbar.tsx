// src/components/navbar.tsx
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
import { Avatar, Select, SelectItem } from '@nextui-org/react';
import { tools } from './Home/tools';

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
      {/* Start Content */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <Logo className="w-6 h-6" />
            <p className="font-bold text-inherit">{siteConfig.name}</p>
          </NextLink>
        </NavbarBrand>

        {/* Main Navigation Items */}
        <ul className="hidden lg:flex gap-6 justify-start ml-6">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium hover:text-primary transition-colors',
                  item.highlight && 'text-primary font-medium'
                )}
                href={item.href}
              >
                {item.icon && <item.icon className="inline mr-2 w-4 h-4" />}
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* End Content */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden lg:flex w-64">
          <Select
            className="w-56"
            items={tools}
            // labelPlacement="outside"
            placeholder="All Tools"
          >
            {(tools) => (
              <SelectItem key={tools.name} textValue={tools.name}>
                <Link href={tools.href} color="foreground">
                  <div className="flex gap-2 items-center w-52">
                    <tools.icon className="h-6 w-6" />
                    <div className="flex flex-col">
                      <span className="text-small">{tools.name}</span>
                    </div>
                  </div>
                </Link>
              </SelectItem>
            )}
          </Select>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Toggle Button */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        <div className="mx-4 mt-6 flex flex-col gap-3">
          {/* Related Items in Mobile Menu */}
          {tools.map((item, index) => (
            <NavbarMenuItem
              key={`related-${index}`}
              className="flex gap-2 justify-center items-center"
            >
              <item.icon className="h-6 w-6" />
              <Link
                href={item.href}
                size="lg"
                color="success"
                className="w-full py-3 px-2 rounded-lg hover:bg-default-100"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
