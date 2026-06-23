"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import {
  Send,
  Mic,
  Paperclip,
  Sparkles,
  Star,
  MapPin,
  Plus,
  Repeat,
  Scale,
  Bookmark,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type ResponseCard = {
  type: "hotel" | "restaurant" | "attraction"
  title: string
  subtitle: string
  rating: number
  price: string
}

type Message = {
  id: number
  role: "user" | "assistant"
  text: string
  cards?: ResponseCard[]
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "user",
    text: "Tôi muốn đi du lịch Đà Nẵng - Hội An 4 ngày cùng người yêu với ngân sách khoảng 8 triệu đồng. Bạn gợi ý nơi ở giúp tôi nhé?",
  },
  {
    id: 2,
    role: "assistant",
    text: "Lựa chọn tuyệt vời! Đà Nẵng và Hội An là sự kết hợp hoàn hảo giữa biển xanh và phố cổ bình yên. Với ngân sách 8 triệu đồng, dưới đây là 2 khách sạn được đánh giá rất tốt, thuận tiện di chuyển mà tôi gợi ý cho hai bạn:",
    cards: [
      {
        type: "hotel",
        title: "Sala Danang Beach Hotel",
        subtitle: "Bãi biển Mỹ Khê · Sát biển, hồ bơi vô cực",
        rating: 4.8,
        price: "1.250.000đ/đêm",
      },
      {
        type: "hotel",
        title: "Little Hoi An Boutique Hotel & Spa",
        subtitle: "Phố cổ Hội An · Phong cách truyền thống",
        rating: 4.7,
        price: "980.000đ/đêm",
      },
    ],
  },
]

const suggestedPrompts = [
  "Lên lịch trình 4 ngày",
  "Gợi ý khách sạn tốt",
  "Tìm đặc sản địa phương",
  "Tối ưu hóa ngân sách",
]

const cardMeta = {
  hotel: { icon: MapPin, tint: "bg-primary/10 text-primary" },
  restaurant: { icon: MapPin, tint: "bg-accent/15 text-accent" },
  attraction: { icon: MapPin, tint: "bg-secondary/30 text-secondary-foreground" },
}

function AiResponseCard({ card }: { card: ResponseCard }) {
  const meta = cardMeta[card.type]
  return (
    <div className="rounded-xl border border-border/80 bg-card/65 p-4 shadow-sm backdrop-blur-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className={cn("flex h-9 w-9 items-center justify-center rounded-lg group-hover:scale-105 transition-transform duration-300", meta.tint)}>
            <meta.icon className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">{card.title}</p>
            <p className="text-xs text-muted-foreground">{card.subtitle}</p>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              <span className="font-medium text-foreground">{card.rating}</span>
            </div>
          </div>
        </div>
        <span className="shrink-0 text-sm font-semibold text-foreground">
          {card.price}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button size="sm" className="h-8 gap-1 rounded-lg text-xs hover:scale-102 transition-transform shadow-sm">
          <Plus className="h-3.5 w-3.5" />
          Thêm vào lịch trình
        </Button>
        <Button size="sm" variant="outline" className="h-8 gap-1 rounded-lg border-border bg-card text-xs hover:bg-muted/50 transition-colors">
          <Repeat className="h-3.5 w-3.5" />
          Thay thế
        </Button>
        <Button size="sm" variant="outline" className="h-8 gap-1 rounded-lg border-border bg-card text-xs hover:bg-muted/50 transition-colors">
          <Scale className="h-3.5 w-3.5" />
          So sánh
        </Button>
        <Button size="sm" variant="ghost" className="h-8 gap-1 rounded-lg text-xs hover:text-primary transition-colors">
          <Bookmark className="h-3.5 w-3.5" />
          Lưu lại
        </Button>
      </div>
    </div>
  )
}

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    const userMsg: Message = { id: Date.now(), role: "user", text: trimmed }
    const aiMsg: Message = {
      id: Date.now() + 1,
      role: "assistant",
      text: "Đây là một gợi ý nhanh dựa trên sở thích du lịch của bạn. (Bản thử nghiệm giao diện — hãy kết nối API của mô hình AI để nhận phản hồi trực tiếp).",
      cards: [
        {
          type: "attraction",
          title: "Chùa Linh Ứng - Bán đảo Sơn Trà",
          subtitle: "Tượng Phật Bà cao nhất Việt Nam, view biển Mỹ Khê cực đẹp",
          rating: 4.9,
          price: "Miễn phí",
        },
      ],
    }
    setMessages((prev) => [...prev, userMsg, aiMsg])
    setInput("")
  }

  return (
    <div className="flex h-full flex-col bg-background">
      {/* header */}
      <header className="flex items-center gap-3 border-b border-border/80 bg-card/40 px-6 py-4 backdrop-blur-md">
        <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary/10">
          <Image
            src="/images/ai-mascot.png"
            alt="Mascot trợ lý du lịch AI"
            width={40}
            height={40}
            className="h-9 w-9 object-contain"
          />
        </span>
        <div>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            Trợ lý Du lịch AI
            <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
          </p>
          <p className="text-xs text-muted-foreground">Khám phá Đà Nẵng - Hội An · 4 ngày</p>
        </div>
      </header>

      {/* messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6">
        <div className="mx-auto flex max-w-2xl flex-col gap-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex flex-col gap-3",
                msg.role === "user" ? "items-end" : "items-start",
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "rounded-br-md bg-primary text-primary-foreground"
                    : "rounded-bl-md border border-border bg-card text-foreground shadow-sm",
                )}
              >
                {msg.text}
              </div>
              {msg.cards && (
                <div className="grid w-full max-w-[92%] gap-3">
                  {msg.cards.map((card) => (
                    <AiResponseCard key={card.title} card={card} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* composer */}
      <div className="border-t border-border bg-card/60 px-6 py-4 backdrop-blur">
        <div className="mx-auto max-w-2xl">
          {/* suggested prompts */}
          <div className="mb-3 flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => send(prompt)}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {prompt}
                <ChevronRight className="h-3 w-3" />
              </button>
            ))}
          </div>

          <div className="flex items-end gap-2 rounded-2xl border border-border/80 bg-card/65 p-2 shadow-sm backdrop-blur-sm focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-300">
            <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0 rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors">
              <Paperclip className="h-4 w-4" />
              <span className="sr-only">Đính kèm tệp</span>
            </Button>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  send(input)
                }
              }}
              placeholder="Hỏi bất cứ điều gì về chuyến đi của bạn..."
              rows={1}
              className="min-h-9 resize-none border-0 bg-transparent p-2 text-sm shadow-none focus-visible:ring-0"
            />
            <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0 rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors">
              <Mic className="h-4 w-4" />
              <span className="sr-only">Nhập giọng nói</span>
            </Button>
            <Button
              size="icon"
              onClick={() => send(input)}
              className="h-9 w-9 shrink-0 rounded-lg hover:scale-105 transition-transform"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Gửi tin nhắn</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
