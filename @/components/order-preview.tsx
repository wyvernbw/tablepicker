import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { MoveRight, ShoppingBag } from "lucide-react";

export const OrderPreview = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>
          View order <ShoppingBag className="ml-2" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Here's your order</DrawerTitle>
          <DrawerDescription>x items</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex items-center">
          <Button className="w-min">
            Checkout
            <MoveRight className="ml-2" />
          </Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
