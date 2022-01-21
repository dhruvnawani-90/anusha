import React, { useState } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link'

function MobileNav(props) {
 
  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      <Navbar bg="transparent" expand="lg">
      <Navbar.Brand href="#home">
      <a href="/" className="nav-link p-0"><img
        src="/images/logo.svg"
        width="100"
        height="70"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      /></a>
    </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"  onClick={handleToggle} />
        <div  className={`fullMenu bg-theme ${!isActive ? 'open' : ''}`}>
        <ul  className={`mobile-menu light ${!isActive ? 'o-1' : ''}`}>
              <li><a href="/adobe-captivate" className="nav-link">ADOBE CAPTIVATE</a></li>
              <li><a href="/adobe-wijk" className="nav-link">ADOBE WIJK</a></li>
              <li><a href="/adobe-animate" className="nav-link">ADOBE ANIMATE</a></li>
              <li><a href="/adobe-customer-stories" className="nav-link">ADOBE CUSTOMER SUCCESS</a></li>
              <li><a  href="/other-projects" className="nav-link">ADOBE OTHER PROJECTS</a></li>
              <li><a href="/contact" className="nav-link"><img src="/images/contact.svg"/></a></li>
          </ul>
        </div>
      </Navbar>
    </>
  ); 
}
  
export default MobileNav;




