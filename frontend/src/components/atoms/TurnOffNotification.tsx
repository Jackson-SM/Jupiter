import { IconBellFilled } from '@tabler/icons-react';
import { Switch } from '../ui/Switch';

export const TurnOffNotification = () => {
  return (
    <div className="flex border border-border rounded-md justify-between px-2 items-center">
      <IconBellFilled className="w-6 h-6 mr-2" />
      <div className="p-2 flex flex-col gap-1">
        <h3 className="text-sm font-bold">
          Turn off notifications
        </h3>
        <p className="text-xs">
          Turn off notifcation in all devices.
        </p>
      </div>
      <Switch />
    </div>
  );
};
