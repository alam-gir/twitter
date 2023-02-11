import Sidebar from "@/components/Sidebar";
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

        {/* {widgets}   */}

        {/* {modals} */}
      </main>
    </div>
  );
};

export default Home;
