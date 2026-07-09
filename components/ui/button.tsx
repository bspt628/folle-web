import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-medium transition-all duration-300 ease-out active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[hsl(var(--brand)/0.5)] focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      // 通常は白枠+透明、ホバーで左から緑が埋まる（背景を左基準で 0%→100% に拡大）
      variant: {
        default:
          "border border-white/80 text-white bg-gradient-to-r from-[hsl(var(--brand))] to-[hsl(var(--brand))] bg-left bg-no-repeat bg-[length:0%_100%] hover:bg-[length:100%_100%] hover:border-[hsl(var(--brand))]",
        destructive:
          "bg-destructive text-white hover:brightness-110 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-white/50 text-white bg-gradient-to-r from-[hsl(var(--brand))] to-[hsl(var(--brand))] bg-left bg-no-repeat bg-[length:0%_100%] hover:bg-[length:100%_100%] hover:border-[hsl(var(--brand))]",
        secondary:
          "bg-secondary text-secondary-foreground hover:brightness-110",
        ghost: "text-white hover:bg-white/10",
        link: "text-[hsl(var(--primary))] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-2 has-[>svg]:px-4",
        sm: "h-10 gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-14 px-8 text-base has-[>svg]:px-6",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
