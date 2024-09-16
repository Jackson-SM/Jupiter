'use client';

import { cn } from '@/lib/utils';
import { IconPlanet } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type LogoProps = {
  children: React.ReactNode;
  className?: string;
};

export const Logo = ({
  children,
  className,
}: LogoProps) => {
  return (
    <Link
      href="/"
      className={cn(
        'font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20',
        className,
      )}
    >
      <IconPlanet className="h-7 w-7 bg-background dark:bg-background border border-border p-1 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0 text-primary" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        {children}
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <IconPlanet className="h-7 w-7 bg-background dark:bg-background border border-border p-1 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0 text-primary" />
    </Link>
  );
};
