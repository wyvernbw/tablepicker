import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Account = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"link"} size={"icon"}>
          <Avatar>
            <AvatarImage src="https://github.com/wyvernbw.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <p>My Name</p>
          <p className="font-normal opacity-60">my.address@example.com</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>My orders</DropdownMenuItem>
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
