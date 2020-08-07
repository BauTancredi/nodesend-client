import Layout from "../../components/Layout";
import clientAxios from "../../config/axios";

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
  return (
    <Layout>
      <h1>From [links.js]</h1>
    </Layout>
  );
};
