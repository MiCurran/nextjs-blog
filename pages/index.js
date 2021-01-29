import Link from "next/link";
import fs from "fs";
import Styles from './styles.module.css'

const Home = ({ slugs }) => (
  <div className={Styles.postPage}>
  <div className={Styles.nav}>
    <h1>Michael Curran Developer Blog</h1>
    <h4>A simple dev blog created with next js</h4>
    {slugs.map(slug => {
      return (
        <div key={slug}>
          <Link href={"/blog/" + slug}>
            <a>{slug.replace(/-/g," ")}</a>
          </Link>
        </div>
      );
    })}
  </div>
  </div>
);

export const getStaticProps = async () => {
  const files = fs.readdirSync("posts");
  return {
    props: {
      slugs: files.map(filename => filename.replace(".md", ""))
    }
  };
};

export default Home;
