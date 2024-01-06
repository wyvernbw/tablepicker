import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { RouterOutputs, api } from "~/utils/api";
import { Category } from "./products";

export type Product = RouterOutputs["product"]["getProducts"][0];

export const ProductCard = ({
  product,
  category,
  addToOrderFn,
}: {
  product: Product;
  category: Category;
  addToOrderFn: (product: Product) => void;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.categoryName}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Description</p>
      </CardContent>
      <CardFooter className="flex gap-4">
        <p>{product.price} lei</p>
        <Button variant="default" onClick={() => addToOrderFn(product)}>
          Order
        </Button>
      </CardFooter>
    </Card>
  );
};
