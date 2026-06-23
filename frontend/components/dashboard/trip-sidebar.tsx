"use client"

import {
  MapPin,
  CalendarDays,
  Users,
  Wallet,
  Pencil,
  Utensils,
  Landmark,
  BedDouble,
  Bus,
  Plus,
} from "lucide-react"
import { Logo } from "@/components/logo"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

const tripDetails = [
  { icon: MapPin, label: "Điểm đến", value: "Đà Nẵng - Hội An, Việt Nam" },
  { icon: CalendarDays, label: "Ngày đi", value: "12 Tháng 5, 2026" },
  { icon: CalendarDays, label: "Ngày về", value: "16 Tháng 5, 2026" },
  { icon: Users, label: "Thành viên", value: "2 người lớn" },
  { icon: Wallet, label: "Ngân sách", value: "8.500.000đ" },
]

const preferences = [
  { icon: Utensils, label: "Ẩm thực", value: 85 },
  { icon: Landmark, label: "Điểm tham quan", value: 90 },
  { icon: BedDouble, label: "Chất lượng khách sạn", value: 70 },
  { icon: Bus, label: "Phương tiện", value: 50 },
]

const savedTrips = [
  { name: "Du lịch Vịnh Hạ Long", dates: "Tháng 6, 2026", emoji: "Hạ Long" },
  { name: "Phượt Hà Giang", dates: "Tháng 9, 2026", emoji: "Hà Giang" },
  { name: "Nha Trang Hè Rực Rỡ", dates: "Tháng 7, 2026", emoji: "Nha Trang" },
]

export function TripSidebar() {
  return (
    <aside className="flex h-full w-full flex-col border-r border-border bg-sidebar/50 backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-border/80 px-5 py-4 bg-card/25">
        <Logo />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        {/* trip summary card */}
        <div className="rounded-2xl border border-border/80 bg-card/65 p-4 shadow-sm backdrop-blur-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Tóm tắt chuyến đi</h2>
            <Button variant="ghost" size="sm" className="h-7 gap-1 px-2 text-xs text-primary hover:bg-primary/5 transition-colors">
              <Pencil className="h-3.5 w-3.5" />
              Sửa
            </Button>
          </div>
          <ul className="grid gap-3">
            {tripDetails.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="truncate text-sm font-medium text-foreground">
                    {item.value}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* travel preferences */}
        <div className="mt-6">
          <h2 className="mb-3 text-sm font-semibold text-foreground">
            Sở thích chuyến đi
          </h2>
          <div className="grid gap-5 rounded-2xl border border-border/80 bg-card/65 p-4 shadow-sm backdrop-blur-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">
            {preferences.map((pref) => (
              <div key={pref.label} className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <pref.icon className="h-4 w-4 text-muted-foreground" />
                    {pref.label}
                  </span>
                  <span className="text-xs text-muted-foreground">{pref.value}%</span>
                </div>
                <Slider defaultValue={[pref.value]} max={100} step={5} />
              </div>
            ))}
          </div>
        </div>

        {/* saved trips */}
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Chuyến đi đã lưu</h2>
            <Button variant="ghost" size="sm" className="h-7 gap-1 px-2 text-xs text-primary hover:bg-primary/5 transition-colors">
              <Plus className="h-3.5 w-3.5" />
              Tạo mới
            </Button>
          </div>
          <ul className="grid gap-2">
            {savedTrips.map((trip) => (
              <li key={trip.name}>
                <button className="flex w-full items-center gap-3 rounded-xl border border-border/80 bg-card/65 p-3 text-left backdrop-blur-sm transition-all duration-300 hover:border-primary/45 hover:bg-card hover:shadow-sm">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/30 text-xs font-semibold text-secondary-foreground">
                    {trip.emoji.slice(0, 2)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {trip.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{trip.dates}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}
