import React, { useContext, useEffect } from "react";
import Link from "next/link";

import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";

import Dropzone from "../components/Dropzone";
import Layout from "../components/Layout";
import Alert from "../components/Alert";

const Index = () => {
  // Access state
  const AuthContext = useContext(authContext);
  const { authenticatedUser } = AuthContext;

  const AppContext = useContext(appContext);
  const { message_file, url } = AppContext;

  useEffect(() => {
    authenticatedUser();
  }, []);

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        {url ? (
          <>
            <p className="text-center text-2xl mt-10">
              <span className="font-bold text-3xl text-red-700 uppercase">
                Your URL is:
              </span>
              {` ${process.env.frontendUrl}/links/${url}`}
            </p>

            <button
              type="button"
              className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-10"
              onClick={() =>
                navigator.clipboard.writeText(
                  `${process.env.frontendUrl}/links/${url}`
                )
              }
            >
              Copy link
            </button>
          </>
        ) : (
          <>
            {" "}
            {message_file && <Alert />}
            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
              <Dropzone />
              <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
                  Share files easily and privately
                </h2>
                <p className="text-lg leading-loose">
                  <span className="text-red-500 font-bold">
                    ReactNode Send{" "}
                  </span>
                  allows you to send files safely. When you upload a file,
                  ReactNode Send generates a link that you can share with the
                  recipient. For more security, you also have the option to set
                  a password.
                </p>
                <Link href="/createaccount">
                  <a className="text-red-500 font-bold text-lg hover:text-red-700">
                    Create an account for more benefits
                  </a>
                </Link>
              </div>
            </div>{" "}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;
