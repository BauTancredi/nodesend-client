import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import Link from "next/link";

import authContext from "../context/auth/authContext";

const Index = () => {
  // Access state
  const AuthContext = useContext(authContext);
  const { authenticatedUser } = AuthContext;

  useEffect(() => {
    authenticatedUser();
  }, []);

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
          <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
            <p>Dropzone here</p>
          </div>
          <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
            <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
              Share files easily and privately
            </h2>
            <p className="text-lg leading-loose">
              <span className="text-red-500 font-bold">ReactNode Send </span>
              allows you to send files safely. When you upload a file, ReactNode
              Send generates a link that you can share with the recipient. For
              more security, you also have the option to set a password.
            </p>
            <Link href="/createaccount">
              <a className="text-red-500 font-bold text-lg hover:text-red-700">
                Create an account for more benefits
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
