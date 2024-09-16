type DashboardContentProps = React.ComponentProps<'div'>;

export const DashboardContent = ({
  children,
}: DashboardContentProps) => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-border dark:border-border bg-background dark:bg-background flex flex-col gap-2 flex-1 w-full h-full">
        {children}
      </div>
    </div>
  );
};
