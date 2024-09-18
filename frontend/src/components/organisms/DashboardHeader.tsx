import { MessageDropdown } from '../molecules/MessageDropdown';
import { NotificationDropdown } from '../molecules/NotificationDropdown';
import { ProfileOptions } from '../molecules/ProfileOptions';
import { Settings } from '../molecules/Settings';

export const DashboardHeader = () => {
  return (
    <header className="bg-muted flex gap-2 p-4 items-center rounded-md border border-border/[0.4] justify-between">
      <ProfileOptions />
      <div className="flex items-center">
        <NotificationDropdown />
        <MessageDropdown />
        <Settings />
      </div>
    </header>
  );
};
