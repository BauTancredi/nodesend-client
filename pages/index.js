import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";

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
      <h1>Index</h1>
    </Layout>
  );
};

export default Index;
