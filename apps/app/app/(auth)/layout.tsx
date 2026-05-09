export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col bg-alternative min-h-screen">
      <div className="flex flex-1 h-full">
        <main className="flex flex-col items-center flex-1 shrink-0 px-5 pt-10 pb-6 border-r shadow-lg bg-background">
          {children}
        </main>
        {/* <aside className="flex-col items-center justify-center flex-1 flex-shrink hidden basis-1/5 xl:flex"></aside> */}
      </div>
    </div>
  );
}
