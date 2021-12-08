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
      <Link href="/"><a className="nav-link p-0"><img
        src="/images/logo.svg"
        width="100"
        height="70"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      /></a></Link>
    </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"  onClick={handleToggle} />
        <div  className={`fullMenu bg-theme ${!isActive ? 'open' : ''}`}>
        <ul  className={`mobile-menu light ${!isActive ? 'o-1' : ''}`}>
              <li><Link href="/adobe-captivate"><a className="nav-link">ADOBE CAPTIVATE</a></Link></li>
              <li><Link href="/adobe-wijk"><a className="nav-link">ADOBE WIJK</a></Link></li>
              <li><Link href="/adobe-animate"><a className="nav-link">ADOBE ANIMATE</a></Link></li>
              <li><Link href="/adobe-customer-stories"><a className="nav-link">ADOBE CUSTOMER SUCCESS</a></Link></li>
              <li><Link href="/other-projects"><a className="nav-link">ADOBE OTHER PROJECTS</a></Link></li>
              <li><Link href="/contact"><a className="nav-link"><img src="/images/contact.svg"/></a></Link></li>
          </ul>
        </div>
      </Navbar>
    </>
  ); 
}
  
export default MobileNav;




