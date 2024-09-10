export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-[100vh] flex items-center justify-center">
      {children}
    </main>
  );
}
