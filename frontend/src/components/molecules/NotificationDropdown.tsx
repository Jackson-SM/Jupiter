import { IconBellFilled } from '@tabler/icons-react';
import { Notification } from '../atoms/Notification';
import { Button } from '../ui/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/Popover';

export const NotificationDropdown = () => {
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
      <PopoverContent className="ml-2 mr-2 flex flex-col gap-2 max-h-96 overflow-y-auto">
        {notifications.map((notification, idx) => {
          return (
            <Notification
              notificationData={notification}
              key={idx + notification.title}
            />
          );
        })}
      </PopoverContent>
    </Popover>
  );
};
