import Link from "next/link";
import Styles from './styles.module.css'
import { FaTwitter, FaGithub } from "react-icons/fa";
import { IconContext } from "react-icons";
import { ImCross } from "react-icons/im";

const Sidebar = ({ slugs, click }) => (
  <div className={Styles.sidebar}>
    <IconContext.Provider value={{size:"2em", className: "global-class-name" }}>
  <div>
  <ImCross onClick={click} / >
  </div>
</IconContext.Provider>
      <div className={Styles.navContent}>
    <h2>Michael Curran Developer Blog</h2>
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
    <div className={Styles.footer}>
    <div className={Styles.socialIcons}>
    <a href="https://twitter.com/mcurran386" target="blank"><FaTwitter /></a>
    <a href="https://github.com/MiCurran" target="blank"><FaGithub /></a>
        </div>
    
      <a href="https://michaelcurran.vercel.app" target="blank">MichaelCurran.vercel.app</a>
    </div>
    </div>
  </div>
);


export default Sidebar;
