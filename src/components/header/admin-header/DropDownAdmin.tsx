import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
  } from "lucide-react"
  import { userReducer } from "~/store/userReducer"
  import { Button } from "~/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "~/components/ui/dropdown-menu"

 import { ChevronsUpDown } from "lucide-react"
import { Title } from "@tremor/react"
import { useRouter } from "next/router"
import Cookies from "js-cookie"
import { RemoveProjectManager, removeAll } from "~/lib/MetaData"

  
  export function DropDownAdmin() {

    const router = useRouter();
    
    const handleLogout = async  () => {
      Cookies.remove("abdullah-access-token")
      RemoveProjectManager()
      removeAll()
      await router.push("/")
    }
    
    return (
      <DropdownMenu>
        <div className="flex gap-x-4 items-center justify-start">
        <Title>mahdi.chahri55@gmail.com</Title>
        <DropdownMenuTrigger asChild>
        <Button variant="ghost"><ChevronsUpDown className="w-4 h-4 text-gray-400" /></Button>
        </DropdownMenuTrigger>
        </div>
        
        <DropdownMenuContent className="w-56">
           
        <DropdownMenuItem onClick={async () => await router.push("/app")}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Retourner à mon compte</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Déconnexion</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  