import { cn } from '~/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import * as React from 'react'

const buttonVariants = cva(
  ' inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors   disabled:opacity-50  disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'bg-blue-500 text-white hover:bg-blue-800 ',
        destructive: 'text-white hover:bg-red-600 ',
        outline:
          'bg-blue-500 text-white hover:bg-blue-800   border border-slate-200 ',
        subtle:
          'bg-blue-100 text-slate-900 hover:bg-blue-200  ',
        ghost:
          'bg-transparent text-slate-900  hover:bg-blue-50  data-[state=open]:bg-transparent',
        link: 'bg-transparent  underline-offset-4 hover:underline text-slate-900 hover:text-blue-500 hover:bg-transparent ',
        rukia: 'w-full bg-blue-500 text-white hover:bg-blue-800 ',
        primary : " bg-gradient-to-br from-blue-500 to-sky-400 rounded-lg font-semibold ",
        secondary : "rounded-lg border bg-white  flex items-center  font-semibold   justify-between p-1 px-4 shadow-sm hover:bg-gray-100 hover:text-gray-800 text-gray-500"
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-2 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        none : "p-1"
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

 const AbdullahButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, isLoading, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading}
        {...props}>
        {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
        {children}
      </button>
    )
  }
)


export { AbdullahButton, buttonVariants }