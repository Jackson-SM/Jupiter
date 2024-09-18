import { cn } from '@/lib/utils';

type CirclePingProps = React.ComponentProps<'div'>;

export const CirclePing = ({
  className,
  ...props
}: CirclePingProps) => {
  return (
    <div
      className={cn(
        "relative bg-primary w-2 h-2 rounded-full before:content-[''] before:w-3 before:h-3 before:bg-primary/50 before:absolute before:animate-ping before:rounded-full before:-left-0.5 before:-top-0.5",
        className,
      )}
      {...props}
    />
  );
};
