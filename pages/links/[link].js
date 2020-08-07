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
      <h1 className="text-4xl text-center text-gray-700">Download your file</h1>
      <div className="flex items-center justify-center mt-10">
        <a
          href={`${process.env.backendUrl}/api/files/${link.file}`}
          className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
        >
          Here
        </a>
      </div>
    </Layout>
  );
};
