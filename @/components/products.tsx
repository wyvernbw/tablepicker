import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactQueryOptions } from "~/server/api/root";
import { RouterOutputs, api } from "~/utils/api";
import { ProductCard } from "./product-card";
import { Card, CardContent } from "./ui/card";

type Categories = RouterOutputs["category"]["getCategories"];
type Category = Categories[0];

export const Products = (props: { categories: Categories }) => {
  const { categories } = props;

  const getProducts = (category: Category) => {
    return api.category.getProductsByCategory.useQuery({ id: category.id });
  };

  return (
    <Card className="h-[500px]">
      <CardContent>
        <Tabs defaultValue={categories[0]?.id} className="my-6 flex flex-col">
          <TabsList className="w-min">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <ul className="">
            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <ul className="flex gap-2">
                  {getProducts(category).data?.map((product) => (
                    <li key={product.id}>
                      <ProductCard key={product.id} product={product} />
                    </li>
                  ))}
                </ul>
              </TabsContent>
            ))}
          </ul>
        </Tabs>
      </CardContent>
    </Card>
  );
};
