import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

type Product = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string | null;
  price: number;
};

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>Double Shot</CardDescription>
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
