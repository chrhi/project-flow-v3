import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet"
import { Menu } from "lucide-react"
 
export function MobileSideBar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent position="right" size="lg">
        <SheetHeader>
          <SheetTitle>ProjectFlow Navigation</SheetTitle>
        </SheetHeader>
        <div className="w-full flex h-[90%] mt-4 flex-col items-start gap-4 py-4">
         <Button variant="ghost" size="lg">Accuel</Button>
         <Button variant="ghost" size="lg" >Inisiating</Button>
         <Button variant="ghost" size="lg" >Planning</Button>
         <Button variant="ghost" size="lg" >Executing</Button>
         <Button variant="ghost" size="lg" >Controlling</Button>
         <Button variant="ghost" size="lg" >Closing</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}