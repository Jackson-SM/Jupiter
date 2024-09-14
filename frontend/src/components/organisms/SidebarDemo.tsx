'use client';
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from '@/components/ui/Sidebar';
import {
  IconBrandHipchat,
  IconCalendar,
  IconLayoutDashboard,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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
        href: '#dashboard',
        icon: (
          <IconLayoutDashboard className="text-muted-foreground dark:text-muted-foreground h-5 w-5 flex-shrink-0" />
        ),
      },
      {
        label: 'Calendar',
        href: '#calendar',
        icon: (
          <IconCalendar className="text-muted-foreground dark:text-muted-foreground h-5 w-5 flex-shrink-0" />
        ),
      },
      {
        label: 'Chat',
        href: '#chat',
        icon: (
          <IconBrandHipchat className="text-muted-foreground dark:text-muted-foreground h-5 w-5 flex-shrink-0" />
        ),
      },
    ],
  };
  const [open, setOpen] = useState(false);
  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {open ? <Logo /> : <LogoIcon />}
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
        <div>
          <SidebarLink
            link={{
              label: 'Manu Arora',
              href: '#',
              icon: (
                <Image
                  src="https://assets.aceternity.com/manu.png"
                  className="h-7 w-7 flex-shrink-0 rounded-full"
                  width={50}
                  height={50}
                  alt="Avatar"
                />
              ),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Jupiter Labs
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
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

type ContainerSidebarProps = React.ComponentProps<'div'> & {
  container: ContainersType;
};

const ContainerSidebar = ({
  container,
}: ContainerSidebarProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-neutral-500 dark:text-neutral-400 text-xs font-semibold uppercase">
        {container.name}
      </div>
      {container.links?.map((link, idx) => (
        <SidebarLink key={idx} link={link} />
      ))}
    </div>
  );
};
