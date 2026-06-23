"use client"

import {
  MapPin,
  BedDouble,
  Plane,
  Utensils,
  Landmark,
  Users,
  PieChart,
  Sparkles,
  Pencil,
  GripVertical,
  Plus,
  FileText,
  Download,
  Share2,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const budgetItems = [
  { label: "Di chuyển", amount: 2500000, color: "bg-chart-1" },
  { label: "Khách sạn", amount: 3750000, color: "bg-chart-2" },
  { label: "Ăn uống", amount: 1200000, color: "bg-chart-3" },
  { label: "Vui chơi", amount: 500000, color: "bg-chart-4" },
  { label: "Chi phí khác", amount: 500000, color: "bg-chart-5" },
]

const totalBudget = 8500000
const spent = budgetItems.reduce((sum, item) => sum + item.amount, 0)
const remaining = totalBudget - spent

type ModuleProps = {
  icon: React.ElementType
  title: string
  children: React.ReactNode
  draggable?: boolean
}

function PlanModule({ icon: Icon, title, children, draggable = true }: ModuleProps) {
  return (
    <div className="rounded-2xl border border-border/75 bg-card/65 p-4 shadow-sm backdrop-blur-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {draggable && (
            <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground/60" />
          )}
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </span>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
          <Pencil className="h-3.5 w-3.5" />
          <span className="sr-only">Edit {title}</span>
        </Button>
      </div>
      {children}
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  )
}

export function PlanSidebar() {
  return (
    <aside className="flex h-full w-full flex-col border-l border-border bg-sidebar/50 backdrop-blur-md">
      <div className="border-b border-border/80 px-5 py-4 bg-card/25">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <CheckCircle2 className="h-4 w-4 text-chart-4" />
          Kế Hoạch Đã Xác Nhận
        </h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Các lựa chọn bạn đã duyệt sẽ xuất hiện ở đây
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div className="grid gap-4">
          <PlanModule icon={MapPin} title="Điểm đến" draggable={false}>
            <Row label="Thành phố" value="Đà Nẵng - Hội An" />
            <Row label="Quốc gia" value="Việt Nam" />
          </PlanModule>

          <PlanModule icon={BedDouble} title="Nơi lưu trú">
            <Row label="Khách sạn" value="Sala Danang Beach" />
            <Row label="Nhận phòng" value="12 Tháng 5" />
            <Row label="Trả phòng" value="16 Tháng 5" />
            <Row label="Hạng phòng" value="Deluxe Twin Sea View" />
            <Row label="Chi phí" value="3.750.000đ" />
          </PlanModule>

          <PlanModule icon={Plane} title="Phương tiện di chuyển">
            <Row label="Vé máy bay" value="1.800.000đ khứ hồi" />
            <Row label="Thuê xe máy" value="500.000đ" />
            <Row label="Taxi / Đưa đón" value="200.000đ" />
          </PlanModule>

          <PlanModule icon={Utensils} title="Ăn uống & Ẩm thực">
            <Row label="Nhà hàng đã lưu" value="4 quán ăn" />
            <Row label="Ngân sách ăn uống" value="1.200.000đ" />
          </PlanModule>

          <PlanModule icon={Landmark} title="Điểm tham quan">
            <Row label="Bán đảo Sơn Trà" value="Ngày 1 · Chiều" />
            <Row label="Phố cổ Hội An" value="Ngày 2 · Tối" />
            <Row label="Bà Nà Hills" value="Ngày 3 · Sáng" />
            <Button variant="ghost" size="sm" className="mt-1 h-8 w-full justify-center gap-1 rounded-lg text-xs text-primary hover:bg-primary/5 transition-colors">
              <Plus className="h-3.5 w-3.5" />
              Thêm địa điểm
            </Button>
          </PlanModule>

          <PlanModule icon={Users} title="Thành viên" draggable={false}>
            <Row label="Người lớn" value="2" />
            <Row label="Trẻ em" value="0" />
          </PlanModule>

          <PlanModule icon={PieChart} title="Phân bổ ngân sách" draggable={false}>
            <div className="mb-3 flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
              {budgetItems.map((item) => (
                <span
                  key={item.label}
                  className={item.color}
                  style={{ width: `${(item.amount / totalBudget) * 100}%` }}
                />
              ))}
            </div>
            <div className="grid gap-1">
              {budgetItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between py-0.5 text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                    {item.label}
                  </span>
                  <span className="font-medium text-foreground">
                    {item.amount.toLocaleString()}đ
                  </span>
                </div>
              ))}
            </div>
          </PlanModule>

          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 backdrop-blur-sm shadow-inner transition-all hover:bg-primary/8 duration-300">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              AI Phân Tích Ngân Sách
            </h3>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Còn lại</span>
              <span className="text-lg font-bold text-chart-4">
                {remaining.toLocaleString()}đ
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Bạn còn dư {remaining.toLocaleString()}đ so với ngân sách dự kiến. Đặt trước vé máy bay và phòng khách sạn có thể giúp bạn tiết kiệm thêm 10-15%, và ưu tiên ẩm thực đường phố tại Hội An sẽ giúp tối ưu chi phí hiệu quả hơn.
            </p>
          </div>
        </div>
      </div>

      {/* fixed bottom actions */}
      <div className="border-t border-border/80 bg-card/85 p-4 backdrop-blur-md">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="h-10 gap-1.5 rounded-xl border-border bg-card text-xs hover:bg-muted/50 transition-colors">
            <FileText className="h-4 w-4" />
            Xuất file PDF
          </Button>
          <Button variant="outline" className="h-10 gap-1.5 rounded-xl border-border bg-card text-xs hover:bg-muted/50 transition-colors">
            <Download className="h-4 w-4" />
            Xuất dữ liệu
          </Button>
          <Button variant="outline" className="h-10 gap-1.5 rounded-xl border-border bg-card text-xs hover:bg-muted/50 transition-colors">
            <Share2 className="h-4 w-4" />
            Chia sẻ
          </Button>
          <Button className="h-10 gap-1.5 rounded-xl text-xs hover:scale-102 transition-transform shadow-md">
            <CheckCircle2 className="h-4 w-4" />
            Xác nhận đặt vé
          </Button>
        </div>
      </div>
    </aside>
  )
}
