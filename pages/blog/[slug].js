import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import marked from "marked";
import Sidebar from '../../components/navigation/sidebar'
import styles from '../styles.module.css'

const Post = ({ htmlString, data, links }) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta title="description" content={data.description} />
      </Head>
      <div className={styles.postPage}>
      <Sidebar slugs={links}/>
      <div className={styles.pageContent} dangerouslySetInnerHTML={{ __html: htmlString }} />
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync("posts");
  const paths = files.map(filename => ({
    params: {
      slug: filename.replace(".md", "")
    }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMetadata = fs
    .readFileSync(path.join("posts", slug + ".md"))
    .toString();
    const files = fs.readdirSync("posts");
  const parsedMarkdown = matter(markdownWithMetadata);

  const htmlString = marked(parsedMarkdown.content);

  return {
    props: {
      htmlString,
      data: parsedMarkdown.data,
      links: files.map(filename => filename.replace(".md", ""))
    }
  };
};

export default Post;
