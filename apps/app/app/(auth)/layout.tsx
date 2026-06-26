export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="flex h-full flex-1">
        <main className="flex flex-1 shrink-0 flex-col items-center border-r bg-surface px-5 pt-10 pb-6 shadow-lg">
          {children}
        </main>
        {/* <aside className="flex-col items-center justify-center flex-1 flex-shrink hidden basis-1/5 xl:flex"></aside> */}
      </div>
    </div>
  )
}
