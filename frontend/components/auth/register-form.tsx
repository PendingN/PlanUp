"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Mountain,
  Gem,
  Users,
  User,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SocialButtons } from "@/components/auth/social-buttons"
import { cn } from "@/lib/utils"

const styles = [
  { id: "adventure", label: "Phiêu lưu", icon: Mountain },
  { id: "luxury", label: "Sang trọng", icon: Gem },
  { id: "family", label: "Gia đình", icon: Users },
  { id: "solo", label: "Một mình", icon: User },
  { id: "business", label: "Công tác", icon: Briefcase },
]

const popularDestinations = [
  "Hà Nội",
  "Phú Quốc",
  "Đà Nẵng",
  "Hội An",
  "Vịnh Hạ Long",
  "Sapa",
  "Đà Lạt",
  "Nha Trang",
]

const TOTAL_STEPS = 2

export function RegisterForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [travelStyle, setTravelStyle] = useState<string | null>(null)
  const [destinations, setDestinations] = useState<string[]>([])

  function toggleDestination(value: string) {
    setDestinations((prev) =>
      prev.includes(value)
        ? prev.filter((d) => d !== value)
        : [...prev, value],
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Tạo tài khoản của bạn
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {step === 1
            ? "Chỉ cần vài thông tin cơ bản để bắt đầu."
            : "Cá nhân hóa các đề xuất cho bạn (không bắt buộc)."}
        </p>
      </div>

      {/* progress indicator */}
      <div className="mb-8 flex items-center gap-3">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
          const index = i + 1
          const done = index < step
          const active = index === step
          return (
            <div key={index} className="flex flex-1 items-center gap-3">
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                  done && "bg-primary text-primary-foreground",
                  active && "bg-primary text-primary-foreground ring-4 ring-primary/15",
                  !done && !active && "bg-muted text-muted-foreground",
                )}
              >
                {done ? <Check className="h-4 w-4" /> : index}
              </span>
              <div
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  index < step ? "bg-primary" : "bg-muted",
                  index === TOTAL_STEPS && "hidden",
                )}
              />
            </div>
          )
        })}
      </div>

      {step === 1 && (
        <form
          className="grid gap-5"
          onSubmit={(e) => {
            e.preventDefault()
            setStep(2)
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="name">Họ và tên</Label>
            <Input id="name" placeholder="Nguyễn Văn A" className="h-11 rounded-xl" />
          </div>
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
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="h-11 rounded-xl"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm">Xác nhận mật khẩu</Label>
            <Input
              id="confirm"
              type="password"
              placeholder="••••••••"
              className="h-11 rounded-xl"
            />
          </div>

          <Button type="submit" className="h-11 w-full rounded-xl text-base hover:scale-102 transition-transform shadow-md">
            Tiếp tục
            <ArrowRight className="h-4 w-4" />
          </Button>

          <div className="my-1 flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              hoặc
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <SocialButtons />

          <p className="text-center text-sm text-muted-foreground">
            Đã có tài khoản?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Đăng nhập ngay
            </Link>
          </p>
        </form>
      )}

      {step === 2 && (
        <div className="grid gap-7">
          <div className="grid gap-3">
            <Label>Phong cách du lịch</Label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {styles.map((style) => {
                const selected = travelStyle === style.id
                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setTravelStyle(style.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-all",
                      selected
                        ? "border-primary bg-primary/5 text-primary shadow-sm"
                        : "border-border bg-card text-foreground hover:border-primary/40",
                    )}
                  >
                    <style.icon className="h-5 w-5" />
                    {style.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid gap-3">
            <Label>Điểm đến yêu thích</Label>
            <div className="flex flex-wrap gap-2">
              {popularDestinations.map((dest) => {
                const selected = destinations.includes(dest)
                return (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => toggleDestination(dest)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary/40",
                    )}
                  >
                    {dest}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
              className="h-11 rounded-xl border-border bg-card"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="h-11 flex-1 rounded-xl text-base"
            >
              Hoàn tất &amp; bắt đầu lên kế hoạch
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="text-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Bỏ qua lúc này
          </button>
        </div>
      )}
    </div>
  )
}
