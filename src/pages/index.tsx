import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

export default function Home() {
  const products = api.product.getProducts.useQuery();

  return (
    <>
      <Head>
        <title>Catalog</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-4">
        <ModeToggle />
        <div> {products.data?.map((value) => value.name)}</div>
      </main>
    </>
  );
}
