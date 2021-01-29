import React, { useState, useEffect} from 'react';
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import marked from "marked";
import { GiHamburgerMenu } from "react-icons/gi";
import { IconContext } from "react-icons";
import Sidebar from '../../components/navigation/sidebar'
import styles from '../styles.module.css'

const Post = ({ htmlString, data, links }) => {
  const [visible, setVisible] = useState(true)
  const toggleVisibility = () =>{
    setVisible(!visible)
  }
  if(visible === false){
    //*we don't show the sidebar if visible is set to false
    return(
      <>
      <Head>
        <title>{data.title}</title>
        <meta title="description" content={data.description} />
      </Head>
      <IconContext.Provider value={{size:"2em", className: "global-class-name" }}>
  <div>
  <GiHamburgerMenu style={{position:'fixed'}} onClick={toggleVisibility} / >  </div>
</IconContext.Provider>
      <div className={styles.postPage}>
      <div className={styles.pageContent} dangerouslySetInnerHTML={{ __html: htmlString }} />
      </div>
    </>
    )
  }
  else{//*else we show the sidebar because visible is true 
    return (
      <>
        <Head>
          <title>{data.title}</title>
          <meta title="description" content={data.description} />
        </Head>
        <div className={styles.postPage}>
        <Sidebar click={toggleVisibility} slugs={links}/>
        <div className={styles.pageContent} dangerouslySetInnerHTML={{ __html: htmlString }} />
        </div>
      </>
    );
  }
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
