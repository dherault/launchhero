import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '~utils/ui'

import Spinner from '~components/common/Spinner'

const buttonVariants = cva(
  'cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap rounded-xs text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90',
        destructive: 'bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90',
        outline: 'border border-neutral-200 bg-white hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
        secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80',
        ghost: 'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
        white: 'bg-white text-primary hover:bg-white/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90',
        whatsapp: 'bg-[#25D366] text-white hover:bg-[#25D366/90]',
        link: 'text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50',
      },
      size: {
        xs: 'h-6 rounded-md px-2 text-xs',
        sm: 'h-8 rounded-md px-3',
        default: 'h-10 px-4 py-2',
        lg: 'h-12 rounded-md px-8 text-lg',
        xl: 'h-14 rounded-md px-8 text-xl',
        icon: 'h-10 w-10 shrink-0',
        'icon-sm': 'h-8 w-8 shrink-0',
        'icon-xs': 'h-6 w-6 shrink-0 rounded-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  as?: string
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, as = 'button', loading = false, children, disabled, ...props }, ref) => {
    const Component = as

    return (
      // @ts-expect-error
      <Component
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <>
            <Spinner className="inline w-4 mr-3" />
            {!size?.includes('icon') && 'Loading...'}
          </>
        )}
        {!loading && children}
      </Component>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
