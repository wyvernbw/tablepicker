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

type Providers = "google" | "apple";

export default function SignInPage() {
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
    <div className="flex h-screen flex-grow flex-row bg-zinc-900">
      <div className="sm:basis-0 lg:basis-3/5"></div>
      <Separator orientation="vertical" />
      <div className="flex h-screen  flex-col items-center gap-2 bg-zinc-950 p-16 align-middle sm:w-screen sm:basis-full lg:basis-2/5">
        {" "}
        <H1 className="my-8"> Log In </H1>
        <OAuthButton provider="google">continue with Google</OAuthButton>
        <OAuthButton provider="apple">continue with Apple</OAuthButton>
        <div className="mx-0 my-2 flex w-full shrink items-center gap-2 p-0">
          <Separator orientation="horizontal" className="min-w-0 shrink" />
          <p className="basis-auto"> Or </p>
          <Separator className="min-w-0 shrink" />
        </div>
        <Form {...form}>
          Log in with email
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="secure password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="my-6">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
