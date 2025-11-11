import { auth } from "@/auth";
import LoginButton from "./components/login/LoginButton";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }

  return (
    <>
      <div>
        <main>
          <h2>euanmorton.co.uk</h2>

          <h2>You are not signed in</h2>
          <LoginButton></LoginButton>
        </main>
      </div>
    </>
  );
}
