import Image from "next/image";
import SideBar from "./components/SideBar/SideBar";
import NavBar from "./components/NavBar/NavBar";

export default function Home() {
  return (
    <div>
      <main className="">
        <NavBar></NavBar>
        <SideBar></SideBar>
      </main>
    </div>
  );
}
