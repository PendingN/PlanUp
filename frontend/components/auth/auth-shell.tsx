import Image from "next/image"
import Link from "next/link"
import { Quote } from "lucide-react"
import { Logo } from "@/components/logo"

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-dvh bg-background">
      {/* left illustration panel */}
      <aside className="relative hidden w-1/2 overflow-hidden bg-primary lg:flex">
        <Image
          src="/images/travel-auth.png"
          alt="Khách du lịch đeo ba lô ngắm cảnh quan bờ biển tuyệt đẹp vào giờ vàng"
          fill
          priority
          className="object-cover opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
        <div className="relative z-10 flex w-full flex-col justify-between p-10">
          <Link href="/" className="inline-flex">
            <span className="rounded-xl bg-card/90 px-3 py-2 backdrop-blur">
              <Logo />
            </span>
          </Link>
          <blockquote className="max-w-md text-primary-foreground">
            <Quote className="h-8 w-8 opacity-70" />
            <p className="mt-3 text-pretty text-2xl font-semibold leading-snug">
              Thế giới là một cuốn sách, và những ai không đi du lịch chỉ đọc được một trang.
            </p>
            <footer className="mt-3 text-sm text-primary-foreground/80">
              — Thánh Augustine
            </footer>
          </blockquote>
        </div>
      </aside>

      {/* right form panel */}
      <section className="flex w-full flex-col lg:w-1/2">
        <div className="flex items-center justify-between px-6 py-6 lg:hidden">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center px-6 py-8">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </section>
    </main>
  )
}
