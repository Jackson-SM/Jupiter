import { cn } from '@/lib/utils';

type ButtonRoundedIconProps = React.ComponentProps<'button'> & {
  icon: React.ReactNode;
};

export const ButtonRoundedIcon = ({
  icon,
  children,
  className,
  ...props
}: ButtonRoundedIconProps) => {
  return (
    <button
      className={cn(
        'relative group/btn flex items-center justify-start px-2 w-10 text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-secondary/[0.3] dark:shadow-[0px_0px_9px_0.1px_] dark:hover:bg-accent',
        className,
      )}
      type="submit"
      {...props}
    >
      {icon}
      <BottomGradient />
      {children}
    </button>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-primary to-transparent" />
    </>
  );
};
