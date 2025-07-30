import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

export default function Layout() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  if (!isSignedIn) return <Redirect href={"/sign-in"} />;

  return <Redirect href={"/(tabs)"} />;
}