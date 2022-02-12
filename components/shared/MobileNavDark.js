import React, { useState } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link'

function MobileNavDark(props) {
  const { destination } = props;
  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      <Navbar bg="transparent" expand="lg" className="dark-menu">
        <Navbar.Brand href="#home">
        <a href="/" className="nav-link p-0"><img
        src="/images/logo-dark.svg"
        width="100"
        height="70"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      /></a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="toogle" onClick={handleToggle} />
        <div  className={`fullMenu ${!isActive ? 'open' : ''}`}>
          <ul  className={`mobile-menu ${!isActive ? 'o-1' : ''}`}>
              <li><a href="/adobe-captivate" className="nav-link">ADOBE CAPTIVATE</a></li>
              <li><a href="/adobe-wijk" className="nav-link">ADOBE WIJK</a></li>
              <li><a href="/adobe-animate" className="nav-link">ADOBE ANIMATE</a></li>
              <li><a href="/adobe-customer-stories" className="nav-link">ADOBE CUSTOMER SUCCESS</a></li>
              <li><a href="/other-projects" className="nav-link">ADOBE OTHER PROJECTS</a></li>
              <li><a href={`/contact?${destination}`} className="nav-link"><img src="/images/contact-dark.svg"/></a></li>
          </ul>
        </div>
        
      </Navbar>
    </>
  ); 
}
  
export default MobileNavDark;




