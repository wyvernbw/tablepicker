import { H1 } from "@/components/h1";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSignIn } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRouter } from "next/router";
import { H2 } from "@/components/h2";
import { H3 } from "@/components/h3";

type Providers = "google" | "apple";

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useSignIn();
  const OAuthButton = ({
    provider,
    children,
  }: {
    provider: Providers;
    children?: React.ReactNode;
  }) => {
    return (
      <Button
        variant={"outline"}
        className="w-full"
        onClick={() => {
          console.log(`logging in with ${provider}`);
          signIn?.authenticateWithRedirect({
            strategy: `oauth_${provider}`,
            redirectUrl: "/",
            redirectUrlComplete: "/",
          });
        }}
      >
        {children}
      </Button>
    );
  };

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="flex h-screen flex-grow flex-row ">
      <div className="bg-zinc-50 p-8 sm:basis-0 lg:basis-3/5 dark:bg-zinc-900">
        <H3>CH9</H3>
      </div>
      <Separator orientation="vertical" />
      <div className="flex h-screen  flex-col items-center gap-2 p-16 align-middle sm:w-screen sm:basis-full lg:basis-2/5 dark:bg-zinc-950">
        {" "}
        <div className="flex w-full justify-end">
          <ThemeToggle />
        </div>
        <H1 className="my-8"> Log In </H1>
        <OAuthButton provider="google">Continue with Google</OAuthButton>
        <OAuthButton provider="apple">Continue with Apple</OAuthButton>
        <div className="mx-0 my-2 flex w-full shrink items-center gap-2 p-0">
          <Separator orientation="horizontal" className="min-w-0 shrink" />
          <p className="basis-auto text-sm opacity-50"> OR </p>
          <Separator className="min-w-0 shrink" />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="address@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-6">
              Log in with Email
            </Button>
          </form>
        </Form>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            router.push("/");
          }}
        >
          Continue as Guest
        </Button>
      </div>
    </div>
  );
}
