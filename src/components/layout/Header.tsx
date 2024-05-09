// src/components/layout/Header.

import Link from 'next/link';
import { ThemeToggle } from '../theme/ThemeToggle';
import { Typography } from '../ui/Typography';
import { AuthButton } from '@/components/features/auth/AuthButton';
import { SiteConfig } from '@/lib/site-config';
import Image from 'next/image';

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.svg" width={50} height={35} alt="app logo" /> <div className="flex items-baseline gap-2">
            <Typography variant="h3" as={Link} href="/">
              {SiteConfig.title}
            </Typography>
            <Typography
              as={Link}
              variant="link"
              href="/explorer"
              className="text-muted-foreground hover:text-foreground"
            >
              Explorer
            </Typography>
            <Typography
              as={Link}
              variant="link"
              href="/courses"
              className="text-muted-foreground hover:text-foreground"
            >
              Courses
            </Typography>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <AuthButton />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
