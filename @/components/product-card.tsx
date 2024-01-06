import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { api } from "~/utils/api";
import { Category } from "./products";

type Product = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string | null;
  price: number;
};

export const ProductCard = ({
  product,
  category,
}: {
  product: Product;
  category: Category;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{category.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Description</p>
      </CardContent>
      <CardFooter className="flex gap-4">
        <p>{product.price} lei</p>
        <Button variant="default">Order</Button>
      </CardFooter>
    </Card>
  );
};
