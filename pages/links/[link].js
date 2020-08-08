import React, { useState, useContext } from "react";

import Layout from "../../components/Layout";
import Alert from "../../components/Alert";

import clientAxios from "../../config/axios";
import appContext from "../../context/app/appContext";

export async function getServerSideProps(props) {
  const result = await clientAxios.get(`/api/links/${props.params.link}`);

  return {
    props: {
      link: result.data,
    },
  };
}

export async function getServerSidePaths() {
  const links = await clientAxios.get("/api/links");

  return {
    paths: links.data.links.map((link) => ({
      params: { link: link.url },
    })),
    fallback: false,
  };
}

export default ({ link }) => {
  const [hasPassword, setHasPassword] = useState(link.password);
  const [password, setPassword] = useState("");

  const AppContext = useContext(appContext);
  const { showAlert, message_file } = AppContext;

  const validatePassword = async (e) => {
    e.preventDefault();

    const data = { password };

    try {
      const response = await clientAxios.post(`/api/links/${link.link}`, data);
      setHasPassword(response.data.password);
    } catch (error) {
      showAlert(error.response.data.msg);
    }
  };
  return (
    <Layout>
      {hasPassword ? (
        <>
          <p className="text-center">This link is protected by a password.</p>
          {message_file && <Alert />}
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
              <form
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={(e) => validatePassword(e)}
              >
                <div className="mb-4">
                  <label
                    className="block text-black text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Name
                  </label>
                  <input
                    type="password"
                    className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                  value="Verify password"
                />
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">
            Download your file
          </h1>
          <div className="flex items-center justify-center mt-10">
            <a
              href={`${process.env.backendUrl}/api/files/${link.file}`}
              className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
            >
              Here
            </a>
          </div>
        </>
      )}
    </Layout>
  );
};
