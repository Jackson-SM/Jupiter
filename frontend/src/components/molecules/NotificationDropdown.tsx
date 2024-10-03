'use client';

import { IconBellFilled } from '@tabler/icons-react';
import { motion, Variants } from 'framer-motion';
import { Notification } from '../atoms/Notification';
import { TurnOffNotification } from '../atoms/TurnOffNotification';
import { Button } from '../ui/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/Popover';
import { ScrollArea } from '../ui/ScrollArea';

export const NotificationDropdown = () => {
  const listVariant: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.15,
      },
    },
  };

  const notifications = [
    {
      title: 'New order has been placed',
      time: '2 minutes ago',
      unread: true,
    },
    {
      title: 'New user registered',
      time: '1 hour ago',
      unread: true,
    },
    {
      title: 'New order has been placed',
      time: '2 minutes ago',
      unread: true,
    },
    {
      title: 'New user registered',
      time: '1 hour ago',
      unread: false,
    },
    {
      title: 'New order has been placed',
      time: '2 minutes ago',
      unread: true,
    },
    {
      title: 'New user registered',
      time: '1 hour ago',
      unread: true,
    },
    {
      title: 'New user registered',
      time: '1 hour ago',
      unread: false,
    },
    {
      title: 'New user registered',
      time: '1 hour ago',
      unread: false,
    },
    {
      title: 'New user registered',
      time: '1 hour ago',
      unread: true,
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full w-12 h-12 p-0 hover:text-primary"
        >
          <IconBellFilled className="text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1 w-80">
        <ScrollArea className="flex flex-col max-h-[600px] p-3">
          <div className="flex flex-col gap-3 mb-3">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">
                Notifications
              </h3>
              <span className="text-xs">
                You have{' '}
                {
                  notifications.filter(
                    (ntf) => ntf.unread === true,
                  ).length
                }{' '}
                unread notifications
              </span>
            </div>
            <TurnOffNotification />
          </div>
          <motion.ul
            className="ml-2 mr-2 flex flex-col gap-2"
            variants={listVariant}
            initial="hidden"
            animate="show"
          >
            {notifications.map((notification, idx) => {
              return (
                <Notification
                  notificationData={notification}
                  key={idx + notification.title}
                />
              );
            })}
          </motion.ul>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
