import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import Head from "next/head";
interface HomeProps {
  newsResults: any;
  usersResults: any;
}

const Home = ({
  newsResults: { articles },
  usersResults: { results: users },
}: HomeProps) => {
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
        <Widgets articles={articles} users={users} />

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
  const users = await fetch(
    "https://randomuser.me/api/?results=600&inc=name,login,picture&noinfo"
  );
  const dataOfNewses = await newses.json();
  const dataOfUsers = await users.json();
  return {
    props: {
      newsResults: dataOfNewses,
      usersResults: dataOfUsers,
    },
  };
};
