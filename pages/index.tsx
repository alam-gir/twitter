import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { authOptions } from "./api/auth/[...nextauth]";
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

export const getServerSideProps = async (contex: GetServerSidePropsContext) => {
  // get session for securing page
  const session = await getServerSession(contex.req, contex.res, authOptions);
  if (!session) {
    // if not sined in then nevigate to signin page
    return { redirect: { destination: "/api/auth/signin" } };
  }

  const [newses, users] = await Promise.all([
    fetch(
      "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
    ).then((response) => response.json()),

    fetch(
      "https://randomuser.me/api/?results=600&inc=name,login,picture&noinfo"
    ).then((response) => response.json()),
  ]);
  return {
    props: {
      newsResults: newses,
      usersResults: users,
    },
  };
};
