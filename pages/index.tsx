import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import Head from "next/head";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Twitter</title>
      </Head>
      <main className="flex min-h-screen max-w-7xl mx-auto">
        {/* {sidebar}   */}
        <Sidebar />

        {/* {feed}   */}
        <Feed />

        {/* {widgets}   */}
        <Widgets />

        {/* {modals} */}
      </main>
    </div>
  );
};

export default Home;
