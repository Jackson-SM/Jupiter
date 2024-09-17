import { IconBellFilled } from '@tabler/icons-react';
import { Button } from '../ui/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/Popover';

export const Notifications = () => {
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
      <PopoverContent className="ml-2 mr-2">
        <div className="p-4">Notification</div>
      </PopoverContent>
    </Popover>
  );
};
