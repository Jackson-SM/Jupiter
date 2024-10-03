'use client';

import { cn } from '@/lib/utils';
import {
  HTMLMotionProps,
  motion,
  Variants,
} from 'framer-motion';
import { CirclePing } from './CirclePing';

export type NotificationDataType = {
  title: string;
  time: string;
  unread: boolean;
};

type NotificationProps = HTMLMotionProps<'li'> & {
  notificationData: NotificationDataType;
};

export const Notification = ({
  notificationData,
  className,
  ...props
}: NotificationProps) => {
  const itemVariant: Variants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <motion.li
      className={cn(
        'p-5 text-sm flex flex-col gap-2 rounded-lg border border-border/50 relative cursor-pointer transition-color duration-100',
        className,
      )}
      variants={itemVariant}
      {...props}
    >
      {notificationData.unread && (
        <CirclePing className="absolute -left-0.5 -top-1" />
      )}
      <div className="flex flex-col">
        <h2>{notificationData.title}</h2>
        <span className="text-accent-foreground text-xs ml-1">
          {notificationData.time}
        </span>
      </div>
    </motion.li>
  );
};
