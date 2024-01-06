import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactQueryOptions } from "~/server/api/root";
import { RouterOutputs, api } from "~/utils/api";
import { ProductCard } from "./product-card";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { H3 } from "./h3";

type Categories = RouterOutputs["category"]["getCategories"];
export type Category = Categories[0];

export const Products = (props: { categories: Categories }) => {
  const { categories } = props;

  const getProducts = (category: Category) => {
    return api.category.getProductsByCategory.useQuery({ id: category.id });
  };

  return (
    <Card className="h-[500px]">
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
                <ul className="flex gap-2">
                  {getProducts(category).data?.map((product) => (
                    <li key={product.id}>
                      <ProductCard
                        key={product.id}
                        product={product}
                        category={category}
                      />
                    </li>
                  ))}
                </ul>
              </TabsContent>
            ))}
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  );
};
