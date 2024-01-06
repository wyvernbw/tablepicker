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
import { Minus, MoveRight, Plus, ShoppingBag } from "lucide-react";
import { Product } from "./product-card";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";

export const OrderPreview = ({
  order,
  removeFromOrderFn,
  addToOrderFn,
}: {
  order: Product[];
  removeFromOrderFn: (product: Product) => void;
  addToOrderFn: (product: Product) => void;
}) => {
  const [quantities, setQuantities] = useState<{
    [x: string]: number;
  }>({});

  useEffect(() => {
    const q = order
      .map((product) => ({
        [product.id]: order.filter((p) => p.id === product.id).length,
      }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});
    setQuantities(q);
  }, [order]);

  const orderItems = [...new Set(order)];
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
          <DrawerDescription>{order.length} items</DrawerDescription>
        </DrawerHeader>
        <ul className="flex flex-col items-center gap-2">
          {orderItems.map((product) => (
            <li key={product.id}>
              <Card className="flex flex-grow-0 flex-row items-center gap-4 p-4">
                <p>{product.name}</p>
                <p className="opacity-60">{product.categoryName}</p>
                <p>{product.price} lei</p>
                <div className="flex items-center">
                  <Button
                    size="icon"
                    className="scale-75"
                    onClick={() => removeFromOrderFn(product)}
                  >
                    <Minus />
                  </Button>
                  <p>x {quantities[product.id]}</p>
                  <Button
                    size="icon"
                    className="scale-75"
                    onClick={() => addToOrderFn(product)}
                  >
                    <Plus />
                  </Button>
                </div>
              </Card>
            </li>
          ))}
        </ul>
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
