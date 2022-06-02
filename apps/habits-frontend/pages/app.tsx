import Head from "next/head";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import HabitList from "../components/habit-list";
import Layout from "../components/layout";
import MobileDateSelector from "../components/mobile-date-selector";
import { ExclamationIcon } from "@heroicons/react/solid";

export async function getStaticProps() {
  // fetch list of posts
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_page=1"
  );
  const postList = await response.json();
  return {
    props: {
      postList,
    },
  };
}

export default withPageAuthRequired(function IndexPage({ postList, user }) {
  return (
    <Layout title="Daily Habits" user={user}>
      <Head>
        <title>habits - Daily Habits</title>
      </Head>
      <section>
        <div className="p-4 rounded-md bg-yellow-50">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationIcon
                className="w-5 h-5 text-yellow-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Warning: This is a demo site!
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Do not enter sensitive data on this app. Your data will not be
                  secure.
                  <br />
                  The app is still under heavy development.
                </p>
              </div>
            </div>
          </div>
        </div>
        <HabitList user={user} />
      </section>
      <MobileDateSelector />
    </Layout>
  );
});
