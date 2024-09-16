import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../ui/Avatar';

export const Profile = () => {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
