import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import Head from "next/head";
interface HomeProps {
  newsResults: any;
}

const Home = ({ newsResults: { articles } }: HomeProps) => {
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
        <Widgets articles={articles} />

        {/* {modals} */}
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const newses = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  );
  const data = await newses.json();

  return {
    props: {
      newsResults: data,
    },
  };
};
