import Image from "next/image"
import Link from "next/link"
import { Sparkles, Wallet, Compass, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

const features = [
  {
    icon: Sparkles,
    title: "Lập lịch trình bằng AI",
    description:
      "Mô tả chuyến đi trong mơ của bạn và nhận lịch trình chi tiết từng ngày trong vài giây.",
  },
  {
    icon: Wallet,
    title: "Tối ưu hóa ngân sách",
    description:
      "Gợi ý thông minh giúp chuyến đi của bạn nằm trong ngân sách dự kiến mà vẫn trọn vẹn niềm vui.",
  },
  {
    icon: Compass,
    title: "Gợi ý điểm đến thông minh",
    description:
      "Lựa chọn khách sạn, nhà hàng và điểm tham quan phù hợp nhất với sở thích của bạn.",
  },
]

export default function WelcomePage() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-background">
      {/* soft ambient accents */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

      {/* top bar */}
      <header className="relative z-10 flex items-center justify-center px-6 py-6">
        <Logo />
      </header>

      {/* hero */}
      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center px-6 pb-16 pt-6 text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
          <Sparkles className="h-4 w-4 text-primary" />
          Trợ lý du lịch AI cá nhân của bạn
        </span>

        <h1 className="max-w-3xl text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Lên Kế Hoạch Chuyến Đi Hoàn Hảo Cùng AI
        </h1>
        <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Hãy cho chúng tôi biết nơi bạn muốn đến, AI của PlanUp sẽ thiết lập lịch trình cá nhân hóa cho bạn chỉ trong vài giây.
        </p>

        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="h-12 w-full rounded-xl px-8 text-base sm:w-auto hover:scale-102 transition-transform shadow-md"
            render={<Link href="/dashboard" />}
          >
            Bắt đầu lập kế hoạch
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 w-full rounded-xl border-border bg-card px-8 text-base sm:w-auto hover:bg-muted/50 transition-colors"
            render={<Link href="/dashboard" />}
          >
            Khám phá chuyến đi mẫu
          </Button>
        </div>

        {/* hero illustration */}
        <div className="relative mt-12 w-full max-w-3xl">
          <div className="rounded-3xl border border-border bg-card/70 p-3 shadow-xl backdrop-blur">
            <Image
              src="/images/travel-hero.png"
              alt="Minh họa đường bay kết nối các địa danh nổi tiếng thế giới"
              width={960}
              height={600}
              priority
              className="h-auto w-full rounded-2xl"
            />
          </div>
        </div>

        {/* feature cards */}
        <div className="mt-16 grid w-full gap-5 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-card p-6 text-left shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30 group"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* bottom area */}
      <footer className="relative z-10 border-t border-border bg-card/60 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Sẵn sàng bất cứ lúc nào. Hoàn toàn miễn phí.
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="rounded-lg" render={<Link href="/login" />}>
              Đăng nhập
            </Button>
            <Button
              variant="outline"
              className="rounded-lg border-border bg-card"
              render={<Link href="/register" />}
            >
              Đăng ký
            </Button>
            <Button className="rounded-lg" render={<Link href="/dashboard" />}>
              Trải nghiệm không cần tài khoản
            </Button>
          </div>
        </div>
      </footer>
    </main>
  )
}
