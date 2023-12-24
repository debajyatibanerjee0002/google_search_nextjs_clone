import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/Header";
import Response from "@/Response";
import SearchResults from "@/components/SearchResults";

const Search = ({ results }) => {
  const router = useRouter();
  const searchItem = router.query.term;

  return (
    <div>
      <Head>
        <title>{`${searchItem} - Google search`}</title>
      </Head>

      {/* Header */}
      <Header searchItem={searchItem} />

      {/* Search Results */}
      <SearchResults results={results} />
    </div>
  );
};

export default Search;

export async function getServerSideProps(context) {
  const useDummyData = false;
  const startIndex = context.query.start || "0";

  const API_KEY = process.env.API_KEY;
  const CONTEXT_KEY = process.env.CONTEXT_KEY;

  const data = useDummyData
    ? Response
    : await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`
      ).then((response) => response.json());

  return {
    props: {
      results: data,
    },
  };
}
