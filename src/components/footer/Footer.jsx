import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="containerFooter">
        <div className="top">
          <h2 className="category-heading">Categories</h2>
          <div className="category-list">
            <Link
              className="link menuLink"
              to="/gigs?cat=design"
              onClick={() => {
                refetch();
              }}
            >
              <span>Design</span>
            </Link>
            <Link
              className="link menuLink"
              to="/gigs?cat=animation"
              onClick={() => {
                refetch();
              }}
            >
              <span>Animation</span>
            </Link>
            <Link
              className="link menuLink"
              to="/gigs?cat=writing"
              onClick={() => {
                refetch();
              }}
            >
              <span>Writing & Translation</span>
            </Link>
            <Link
              className="link menuLink"
              to="/gigs?cat=ai"
              onClick={() => {
                refetch();
              }}
            >
              <span>AI Services</span>
            </Link>
            <Link
              className="link menuLink"
              to="/gigs?cat=web"
              onClick={() => {
                refetch();
              }}
            >
              <span>Web Development</span>
            </Link>
            <Link
              className="link menuLink"
              to="/gigs?cat=photography"
              onClick={() => {
                refetch();
              }}
            >
              <span>Photography</span>
            </Link>
          </div>
          <hr className="divider" />
        </div>

        <div className="bottom">
          <div className="social-icons">
            <img src="/img/twitter.png" alt="Twitter" />
            <img src="/img/instagram.png" alt="Instagram" />
            <img src="/img/linkedin.png" alt="LinkedIn" />
            <img src="/img/meta.png" alt="Facebook" />
          </div>
          <div className="bottomD">
            <div className="bottom-logo">Gigster</div>
            <span className="copyright">© Gigster International Ltd. 2023</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
