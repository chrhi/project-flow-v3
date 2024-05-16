import type {  FC , ReactNode } from 'react'
import { Header } from '../header/Header'

interface AppLayoutAbdullahProps {
  children : ReactNode
}

const AppLayout: FC<AppLayoutAbdullahProps> = ({children}) => {
 return (
    <>
  
    <Header />
    <main className=" custopn-page-height  flex flex-col overflow-x-hidden scrollbar-hide  justify-center container  items-center bg-white dark:bg-stone-900 ">
    {children}
    </main>
    </>
      
 )
}

export default AppLayout