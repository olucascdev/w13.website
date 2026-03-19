import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex min-h-11 min-w-11 items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-accent text-white hover:bg-accent-dim hover:shadow-[0_0_32px_var(--accent-glow)]',
        glass: 'liquid-glass bg-transparent text-foreground hover:text-foreground',
        ghost:
          'bg-transparent text-muted-foreground hover:bg-white/[0.04] hover:text-foreground',
      },
      size: {
        default: 'px-5 py-2.5',
        lg: 'px-8 py-3.5 text-[0.9rem]',
        icon: 'h-11 w-11 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  )
}

export { Button }
