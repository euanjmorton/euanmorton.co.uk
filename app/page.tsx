import { auth } from "@/auth";
import LoginButton from "./components/login/LoginButton";
import LogoutButton from "./components/login/LogoutButton";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return (
      <>
        <div>Not authenticated..</div>
        <LoginButton></LoginButton>
      </>
    );
  }

  return (
    <>
      <div>
        <main>
          <h2>euanmorton.co.uk</h2>

          <LogoutButton></LogoutButton>
        </main>
      </div>
    </>
  );
}
