import { Icons } from "@figtree/ui/components/icons"

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-full min-h-dvh flex-col items-center justify-between pb-6 lg:pb-8">
      <nav className="flex items-center justify-center gap-2 px-8 py-4">
        <div className="flex w-full items-center justify-between md:w-auto">
          <Icons.logoWithText className="h-7 w-auto" />
        </div>
      </nav>
      <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-4 px-2 lg:px-8">
        <div className="mx-auto -mt-4 grid w-full max-w-5xl flex-1 flex-col items-center justify-center justify-items-center overflow-hidden rounded-3xl border bg-background shadow-sm lg:max-h-155 lg:grid-cols-2">
          <section className="flex h-full w-full animate-in flex-col justify-between gap-8 p-6 duration-500 fade-in lg:border-r lg:p-9">
            {children}
          </section>
          <aside className="bg-dot-wide relative hidden h-full w-full animate-in flex-col items-center justify-center gap-8 overflow-hidden bg-surface p-10 transition-[padding] duration-300 ease-in-out fade-in lg:flex"></aside>
        </div>
      </div>
    </div>
  )
}
