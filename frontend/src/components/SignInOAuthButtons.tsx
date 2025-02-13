import { SignInButton, SignUpButton, useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
  const { isLoaded } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <Button
        variant={"secondary"}
        className="w-full text-white border-zinc-200 h-11"
        asChild
      >
        <SignInButton forceRedirectUrl={"/auth-callback"} children="Log in" />
      </Button>

      <Button
        variant={"secondary"}
        className="w-full text-white border-zinc-200 h-11"
        asChild
      >
        <SignUpButton forceRedirectUrl={"/auth-callback"} />
      </Button>
    </>
  );
};
export default SignInOAuthButtons;
