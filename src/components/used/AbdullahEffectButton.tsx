import { cn } from '~/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import * as React from 'react'

function rippleEffect(event : React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const btn = event?.currentTarget;
    
      const circle = document.createElement("span");
      const diameter = Math.max(btn?.clientWidth, btn?.clientHeight);
      const radius = diameter / 2;
  
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event?.clientX - (btn?.offsetLeft + radius)}px`;
      circle.style.top = `${event?.clientY - (btn?.offsetTop + radius)}px`;
      circle.classList.add("ripple");
  
      const ripple = btn?.getElementsByClassName("ripple")[0];
  
      if (ripple) {
          ripple.remove();
      }
  
      btn?.appendChild(circle);
  }
  
//   const btn = document.getElementById("bt");
//   btn.addEventListener("click", rippleEffect);

const buttonVariantsAbdullah = cva(
    " overflow-hidden  relative gap-x-2  inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none  disabled:opacity-50  disabled:pointer-events-none",
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
          'bg-transparent text-slate-400 text-sm hover:bg-gray-50    ',
        link: 'bg-transparent  underline-offset-4 hover:underline text-slate-900 hover:text-blue-500 hover:bg-transparent ',
        rukia: 'w-full bg-blue-500 text-white hover:bg-blue-800 ',
        
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
    VariantProps<typeof buttonVariantsAbdullah> {
  isLoading?: boolean ,
  onClick? : (() => void) ,
  onPromisClick? : () => Promise<void>
}

 const AbdullahEffectButton =
  ({ className, children, variant, isLoading, size, onClick , onPromisClick , ...props } :ButtonProps ) => {

    const buttonRef = React.useRef(null)

    async function handleClick (e : React.MouseEvent<HTMLButtonElement, MouseEvent>){
        rippleEffect(e)
       if(onPromisClick){
        await onPromisClick()
       }
       if( onClick){
         onClick()
       }
    }

    return (
      <button
        className={cn(buttonVariantsAbdullah({ variant, size, className }))}
        ref={buttonRef}
        disabled={isLoading}
        onClick={(e) => handleClick(e)}
        {...props}>
        {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
        {children}
        
      </button>
    )
  }
export { AbdullahEffectButton, buttonVariantsAbdullah }