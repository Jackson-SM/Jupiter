'use client';

import { cn } from '@/lib/utils';
import {
  HTMLMotionProps,
  motion,
  Variants,
} from 'framer-motion';
import Link from 'next/link';
import { DataShowed } from '../atoms/DataShowed';

export type WorkspaceType = {
  title: string;
  description: string;
};

type WorkspaceCardProps = HTMLMotionProps<'li'> & {
  workspace: WorkspaceType;
};

export const WorkspaceCard = ({
  workspace,
  className,
  ...props
}: WorkspaceCardProps) => {
  const workspaceVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
    },
  };

  return (
    <motion.li
      variants={workspaceVariants}
      className={cn(
        'w-full h-full bg-card rounded-md hover:bg-accent transition-colors duration-150 relative overflow-hidden',
        className,
      )}
      {...props}
    >
      <div className="absolute top-0 left-[-99.2%] w-full h-full bg-primary rounded-md overflow-hidden" />
      <Link
        href="#"
        className="w-full h-full p-4 flex flex-col gap-4"
      >
        <div className="">
          <h1 className="text-2xl mb-2">
            {workspace.title}
          </h1>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-2" />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs relative border border-border px-2 py-1 rounded-lg">
            3 Projects
          </span>
          <DataShowed className="text-card-foreground" />
        </div>
      </Link>
    </motion.li>
  );
};
