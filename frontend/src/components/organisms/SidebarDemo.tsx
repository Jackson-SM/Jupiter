'use client';

import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from '@/components/ui/Sidebar';
import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/lib/utils';
import {
  IconBrandHipchat,
  IconCalendar,
  IconLayoutDashboard,
  IconLogout,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Logo, LogoIcon } from '../atoms/Logo';

type ContainersType = {
  name: string;
  links?: {
    label: string;
    href: string;
    icon?: JSX.Element;
  }[];
};

export function SidebarDemo() {
  const containers: ContainersType[] = [
    {
      name: 'Tasks',
      links: [
        { label: 'Configure Project', href: '#taskcode' },
      ],
    },
    {
      name: 'Projects',
      links: [{ label: 'Jupiter', href: '#projectcode' }],
    },
  ];
  const containerMainMenu: ContainersType = {
    name: 'Main Menu',
    links: [
      {
        label: 'Dashboard',
        href: '/dashboard',
        icon: (
          <IconLayoutDashboard className="h-5 w-5 flex-shrink-0" />
        ),
      },
      {
        label: 'Projects',
        href: '/dashboard/projects',
        icon: (
          <IconCalendar className="h-5 w-5 flex-shrink-0" />
        ),
      },
      {
        label: 'Messages',
        href: '/dashboard/messages',
        icon: (
          <IconBrandHipchat className="h-5 w-5 flex-shrink-0" />
        ),
      },
    ],
  };
  const [open, setOpen] = useState(false);
  return (
    <Sidebar open={open} setOpen={setOpen} animate={true}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {open ? <Logo>Jupiter</Logo> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-2">
            <ContainerSidebar
              container={containerMainMenu}
            />
            {containers.map((container, idx) => (
              <ContainerSidebar
                container={container}
                key={container.name + idx}
              />
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          <SidebarLink
            link={{
              label: 'Log-out',
              href: '#',
              icon: <IconLogout />,
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

type ContainerSidebarProps = React.ComponentProps<'div'> & {
  container: ContainersType;
};

const ContainerSidebar = ({
  container,
}: ContainerSidebarProps) => {
  const { open, animate } = useSidebar();
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2">
      <div className="text-accent-foreground dark:text-accent-foreground text-xs font-semibold uppercase mb-2 mt-1">
        <motion.span
          animate={{
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
        >
          {container.name}
        </motion.span>
      </div>
      {container.links?.map((link, idx) => (
        <SidebarLink
          key={idx}
          link={link}
          active={pathname === link.href}
          className={cn(
            'transition-all duration-150 pl-2',
            !open && 'pl-0',
          )}
        />
      ))}
    </div>
  );
};
