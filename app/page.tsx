import HomePage from "./components/HomePage";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <div>
        <main>
          <HomePage session={session}></HomePage>
        </main>
      </div>
    </>
  );
}
