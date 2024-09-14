import { cn } from '@/lib/utils';
import Link from 'next/link';

type LinkNavProps = React.ComponentProps<typeof Link>;

export const LinkNav = ({
  children,
  className,
  ...props
}: LinkNavProps) => {
  return (
    <Link
      className={cn(
        'text-sm transition-colors duration-300 hover:text-accent-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
