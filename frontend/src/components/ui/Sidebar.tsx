'use client';
import { SidebarProvider } from '@/context/SidebarContext';
import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/lib/utils';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import Link, { LinkProps } from 'next/link';
import React from 'react';

interface Links {
  label: string;
  href: string;
  icon?: React.JSX.Element | React.ReactNode;
}

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider
      open={open}
      setOpen={setOpen}
      animate={animate}
    >
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (
  props: React.ComponentProps<typeof motion.div>,
) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar
        {...(props as React.ComponentProps<'div'>)}
      />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          'h-full px-4 py-4 hidden  md:flex md:flex-col bg-muted dark:bg-muted w-[300px] flex-shrink-0',
          className,
        )}
        animate={{
          width: animate
            ? open
              ? '300px'
              : '60px'
            : '300px',
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          'h-10 px-4 py-4 flex flex-row md:hidden  items-center justify-between bg-muted dark:bg-muted w-full',
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <IconMenu2
            className="text-muted-foreground dark:text-muted-foreground"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
              className={cn(
                'fixed h-full w-full inset-0 bg-muted dark:bg-muted p-10 z-[100] flex flex-col justify-between',
                className,
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-muted-foreground dark:text-muted-foreground"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  active,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
  active?: boolean;
}) => {
  const { open, animate } = useSidebar();
  return (
    <Link
      href={link.href}
      className={cn(
        'text-foreground flex items-center justify-start group/sidebar py-2 hover:text-accent-foreground dark:hover:text-accent-foreground',
        className,
        active &&
          'text-primary-foreground dark:text-primary-foreground before:content-[" "] before:w-2 before:h-2 before:rounded-full before:bg-primary before:absolute before:left-2 hover:before:bg-accent dark:hover:before:bg-accent',
        !open && 'before:opacity-0 before:transition-all',
      )}
      {...props}
    >
      {link.icon}

      <motion.span
        animate={{
          display: animate
            ? open
              ? 'inline-block'
              : 'none'
            : 'inline-block',
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className={cn(
          'text-foreground dark:text-foreground text-sm group-hover/sidebar:translate-x-1 group-hover/sidebar:text-accent-foreground dark:group-hover/sidebar:text-accent-foreground transition duration-150 whitespace-pre inline-block pl-2',
          active &&
            'text-primary-foreground dark:text-primary-foreground',
        )}
      >
        {link.label}
      </motion.span>
    </Link>
  );
};
