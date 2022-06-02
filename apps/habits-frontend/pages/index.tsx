import { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/layout";

const IndexPage: NextPage = () => {
  return (
    <Layout title="Daily Habits">
      <Head>
        <title>habits - Daily Habits</title>
      </Head>
      <section>
        <div className="mb-10">
          <div className="px-4 mx-auto mt-16 max-w-7xl sm:mt-24 sm:px-6">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="">Build </span>
                <span className="text-green-600 ">habits</span>
                <span className=""> that last</span>
              </h1>
              <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Habits account for about 40 percent of our behaviors on any
                given day.
                <br />
                Now you can track them.
                <br />
                And build new ones.
              </p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex flex-col" aria-hidden="true">
            <div className="flex-1" />
            <div className="flex-1 w-full bg-gray-800" />
          </div>
          <div className="px-4 mx-auto max-w-7xl sm:px-6">
            <img
              className="relative rounded-lg shadow-lg sm:hidden"
              src="/app-screenshot.png"
              alt="App screenshot"
            />
            <img
              className="relative hidden rounded-lg shadow-lg sm:block max-h-[40rem] mx-auto"
              src="/app-screenshot-big.png"
              alt="App screenshot"
            />
          </div>
        </div>
        <div className="bg-gray-800">
          <div className="max-w-2xl px-4 py-16 mx-auto text-center sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Boost your productivity.</span>
              <span className="block">Start using habits today.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-indigo-200">
              "When you learn to transform your habits, you can transform your
              life."
              <br /> -James Clear, Author of{" "}
              <a
                href="https://jamesclear.com/atomic-habits"
                className="hover:underline"
              >
                Atomic Habits
              </a>
            </p>
            <a
              href="/app"
              className="inline-flex items-center justify-center w-full px-5 py-3 mt-8 text-base font-medium text-gray-600 bg-white border border-transparent rounded-md hover:bg-green-50 sm:w-auto"
            >
              Sign up - It's free!
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;
