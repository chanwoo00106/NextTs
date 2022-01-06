import Head from "next/head";
import SideBar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main>
        <SideBar />
      </main>
      <h1>chanPotify</h1>
    </div>
  );
}
