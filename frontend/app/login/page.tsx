import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthShell } from "@/components/auth/auth-shell"
import { SocialButtons } from "@/components/auth/social-buttons"

export default function LoginPage() {
  return (
    <AuthShell>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Chào mừng quay trở lại
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Đăng nhập để tiếp tục lập kế hoạch cho hành trình tiếp theo của bạn.
        </p>
      </div>

      <form className="grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="h-11 rounded-xl"
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Mật khẩu</Label>
            <Link
              href="#"
              className="text-sm font-medium text-primary hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="h-11 rounded-xl"
          />
        </div>

        <Button className="h-11 w-full rounded-xl text-base hover:scale-102 transition-transform shadow-md" render={<Link href="/dashboard" />}>
          Đăng nhập
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          hoặc
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <SocialButtons />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Chưa có tài khoản?{" "}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Tạo tài khoản mới
        </Link>
      </p>
    </AuthShell>
  )
}
