import GithubIcon from '../../assets/github-logo.png'
import '../../index.css'
import "./Footer.css"

/**
 *
 * Defines the footer found at the bottom of each webpage. The footer
 * contains extra links for providing the users with extra information
 * and an additional way to navigate the website.
 *
 * Footer with columns and rows containing supplemental links
 * @returns The footer component
 */

function Footer() {
  return (
    <> 
      <footer className="footer">
        <div className="footer-column-side">
          <p>This project was created as our Capstone project for our Java Full Stack Training at Revature</p>
          <br></br>
          <p>Front End: Joshua, Miguel, Diego, Bo Kong, and Bo Bonning</p>
          <br></br>
          <p>Back End Developers: Trey, Michael, Daniel, Megan, and Ralph</p>
        </div>

        <div className="footer-column-middle">
          <GithubLogo />
        </div>

        <div className="footer-column-side">
          <p>Contact us: johndoe@email.com</p>
        </div>
      </footer>
    </>
  );
}

// function GithubLink(props) {
//   return (
//     <Link to={props.path} className="github-link" target="_blank">
//         {props.children}
//     </Link>
//   );
// }

function GithubLogo() {
  return (
    <a href="https://github.com/Will-Java-FS/revlearn-frontend-team1">
      <img 
        src={GithubIcon}
        alt="RevLearn Logo"
        loading="lazy"
        id="github-icon"
        ></img>
    </a>
    // <Link to={props.path} className="github-link" target="_blank">
    //     {props.children}
    // </Link>
  );
}
// function GithubImage() {
//   return (
//       <Link to="https://github.com/Will-Java-FS/revlearn-frontend-team1" target="_blank">
//           <img
//               src={GithubIcon}
//               alt="Github Icon"
//               loading="lazy"
//               id="github-icon"
//           />
//       </Link>
//   )
// }

export default Footer;