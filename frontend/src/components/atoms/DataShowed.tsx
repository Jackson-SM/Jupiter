import { cn } from '@/lib/utils';
import { IconCalendarFilled } from '@tabler/icons-react';

type DataShowedProps = React.ComponentProps<'div'>;

export const DataShowed = ({
  className,
  ...props
}: DataShowedProps) => {
  return (
    <div
      className={cn('flex gap-1 text-xs', className)}
      {...props}
    >
      <IconCalendarFilled className="w-4 h-4" />
      <span>17/09/2024</span>
    </div>
  );
};
