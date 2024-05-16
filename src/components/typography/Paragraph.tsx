import * as React from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '~/lib/utils'

export const paragraphVariants = cva(
  'max-w-prose text-slate-700  mb-2 text-center',
  {
    variants: {
      size: {
        default: 'text-base sm:text-lg',
        sm: 'text-sm sm:text-base',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}

export const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        {...props}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        className={cn(paragraphVariants({ size, className }))}>
        {children}
      </p>
    )
  }
)

Paragraph.displayName = 'Paragraph'

