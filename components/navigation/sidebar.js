import Link from "next/link";
import Styles from './styles.module.css'
import { FaTwitter, FaGithub } from "react-icons/fa";

const Sidebar = ({ slugs }) => (
  <div className={Styles.sidebar}>
    <h3>Michael Curran Developer Blog</h3>
    <p className={Styles.sidebarDescription}>A simple dev blog created with next js</p>
    <h3>POSTS</h3>
    {slugs.map(slug => {
      return (
        <div key={slug}>
          <Link href={"/blog/" + slug}>
            <a className={Styles.link}>{slug.replace(/-/g," ")}</a>
          </Link>
        </div>
      );
    })}
    <div className={Styles.socialIcons}>
    <a href="https://twitter.com/mcurran386" target="blank"><FaTwitter /></a>
    <a href="https://github.com/MiCurran" target="blank"><FaGithub /></a>
        </div>
    <div className={Styles.footer}>
      <a href="https://michaelcurran.vercel.app" target="blank">MichaelCurran.vercel.app</a>
    </div>
  </div>
);


export default Sidebar;
