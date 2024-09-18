import { cn } from '@/lib/utils';
import { CirclePing } from './CirclePing';

export type NotificationDataType = {
  title: string;
  time: string;
  unread: boolean;
};

type NotificationProps = React.ComponentProps<'div'> & {
  notificationData: NotificationDataType;
};

export const Notification = ({
  notificationData,
  className,
  ...props
}: NotificationProps) => {
  return (
    <div
      className={cn(
        'bg-accent p-4 text-sm flex flex-col gap-2 rounded-lg hover:bg-muted-above border border-border/25 relative cursor-pointer transition-color duration-100',
        className,
      )}
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
    </div>
  );
};
