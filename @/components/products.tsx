import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactQueryOptions } from "~/server/api/root";

import { RouterOutputs, api } from "~/utils/api";
import { ProductCard } from "./product-card";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { H3 } from "./h3";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { OrderPreview } from "./order-preview";
import { useState } from "react";
import { Product } from "@prisma/client";

type Categories = RouterOutputs["category"]["getCategories"];
export type Category = Categories[0];

export const Products = (props: { categories: Categories }) => {
  const { categories } = props;

  const getProducts = (category: Category) => {
    return api.category.getProductsByCategory.useQuery({ id: category.id });
  };

  const [order, setOrder] = useState<Product[]>([]);
  const addToOrder = (product: Product) => {
    setOrder([...order, product]);
  };
  const removeFromOrder = (product: Product) => {
    order.splice(order.indexOf(product), 1);
    setOrder([...order]);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Add to order</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={categories[0]?.id} className="mb-6 flex flex-col">
          <TabsList className="w-min">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollArea>
            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <ul className="flex flex-wrap gap-2">
                  {getProducts(category).data?.map((product) => (
                    <li key={product.id}>
                      <ProductCard
                        key={product.id}
                        product={product}
                        category={category}
                        addToOrderFn={addToOrder}
                      />
                    </li>
                  ))}
                </ul>
              </TabsContent>
            ))}
            <ScrollBar orientation="vertical"></ScrollBar>
          </ScrollArea>
        </Tabs>
      </CardContent>
      <CardFooter className="flex gap-2">
        <OrderPreview
          order={order}
          addToOrderFn={addToOrder}
          removeFromOrderFn={removeFromOrder}
        ></OrderPreview>
      </CardFooter>
    </Card>
  );
};
