import Dropdown from "./Dropdown"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"

export default function AvatarIsLoggin() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                
                <img
                  src="/placeholder-user.jpg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>

              <DropdownMenuSeparator />
                <Dropdown.Link href={route('logout')} method="post" as="button">Logout</Dropdown.Link>
              {/* <DropdownMenuItem>Logout</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
    )
}