import { cn } from '@/lib/utils';

type LabelInputContainerProps = React.ComponentProps<'div'>;

export const LabelInputContainer = ({
  children,
  className,
  ...props
}: LabelInputContainerProps) => {
  return (
    <div
      className={cn(
        'flex flex-col space-y-2 w-full',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
