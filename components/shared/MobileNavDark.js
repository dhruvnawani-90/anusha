import React, { useState } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link'
import { useRouter } from "next/router";
import { getCookie } from "../../utils/helpers";
import { GUEST_MAGIC_CODE } from "../../utils/constants";

function MobileNavDark(props) {
  const { destination, setisContactClicked, setisAuthenticated, setclickedRoute } = props;
  const [isActive, setActive] = useState("false");
  const router = useRouter();
  const handleToggle = () => {
    setActive(!isActive);
  };
  const checkAuth = (path) => {
    let magic_code = getCookie(GUEST_MAGIC_CODE);
    if (magic_code && typeof magic_code === 'string') {
      router.push(path);
    } else {
      setclickedRoute(path);
      setisAuthenticated(false);
    }
  }
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
        <div className={`fullMenu ${!isActive ? 'open' : ''}`}>
          <ul className={`mobile-menu ${!isActive ? 'o-1' : ''}`}>
            <li onClick={() => checkAuth('/adobe-captivate')}><a href="#" className="nav-link">ADOBE CAPTIVATE</a></li>
            <li onClick={() => checkAuth('/adobe-wijk')}><a href="#" className="nav-link">ADOBE WIJK</a></li>
            <li onClick={() => checkAuth('/adobe-animate')}><a href="#" className="nav-link">ADOBE ANIMATE</a></li>
            <li onClick={() => checkAuth('/adobe-customer-stories')}><a href="#" className="nav-link">ADOBE CUSTOMER SUCCESS</a></li>
            <li onClick={() => checkAuth('/other-projects')}><a href="#" className="nav-link">ADOBE OTHER PROJECTS</a></li>
            {/* {`/contact?${destination}`} */}
            <li onClick={() => setisContactClicked(true)}><a href="#" className="nav-link"><img src="/images/contact-dark.svg" /></a></li>
          </ul>
        </div>

      </Navbar>
    </>
  );
}

export default MobileNavDark;




