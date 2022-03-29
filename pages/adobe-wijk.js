
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, usePresence } from "framer-motion"
import NavSec from "../components/shared/NavSec"
import MobileNav from "../components/shared/MobileNav"
import NavSecDark from "../components/shared/NavSecDark"
import Slider from "react-slick";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Container from 'react-bootstrap/Container'
import Image from 'next/image'
import ReactPlayer from 'react-player';
import Modal from 'react-bootstrap/Modal'
import { GUEST_MAGIC_CODE } from "../utils/constants"
import { parseCookies } from "../utils/helpers"
import { requireAuth } from '../utils/auth'
import Contact from "../components/contact";
import Authentication from "../components/auth";

function AdobeWiki({ links, authenticated }) {
    const router = useRouter();
    const getSlideValue = () => {
        const path = router.asPath;
        var url = new URL(`https://xyz.com/${path}`);
        var slide = url.searchParams.get("slide");
        return slide ? slide : 0;
    }
    const [activeSlide, setactiveSlide] = useState(getSlideValue());
    const [tempSlide, setTempSlide] = useState(false);
    const sliderefd = useRef();
    function removeParam(parameter) {
        var url = document.location.href;
        var urlparts = url.split('?');
        if (urlparts.length >= 2) {
            var urlBase = urlparts.shift();
            var queryString = urlparts.join("?");

            var prefix = encodeURIComponent(parameter) + '=';
            var pars = queryString.split(/[&;]/g);
            for (var i = pars.length; i-- > 0;)
                if (pars[i].lastIndexOf(prefix, 0) !== -1)
                    pars.splice(i, 1);
            url = urlBase + '?' + pars.join('&');
            window.history.pushState('', document.title, url);
        }
        return url;
    }
    useEffect(() => {
        sliderefd?.current?.slickGoTo(activeSlide);
        removeParam("slide");
    }, [activeSlide, removeParam]);
    const settings = {
        dots: true,
        lazyLoad: true,
        fade: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => setactiveSlide(next)
    };
    useEffect(() => {
        console.log({ activeSlide });
    }, [activeSlide]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isPresent, safeToRemove] = usePresence()

    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);


    useEffect(() => {
        console.log(isPresent, "isPresent isPresent isPresent")
        !isPresent && setTimeout(safeToRemove, 1000)
    }, [isPresent])

    const changeSlide = (y) => {
        const div = sliderefd.current;
        if (div) {
            y > 0 ? div.slickPrev() : div.slickNext();
        }
    };

    useEffect(() => {
        window.addEventListener("wheel", (e) => {
            changeSlide(e.wheelDelta);
        });
    }, []);
    const [isActive, setActive] = useState(false);
    const addClass = () => {
        setActive(true);
    };
    const removeClass = () => {
        setActive(false);
    };
    const [isPlaying, setIsPlaying] = useState(true);
    const handleContextMenu = useCallback((event) => {
        event.preventDefault();
    }, []);

    useEffect(() => {
        if (show) {
            setTempSlide(activeSlide);
            setactiveSlide(false);
        } else {
            setactiveSlide(tempSlide);
            setTempSlide(false);
        }
    }, [show]);
    useEffect(() => {
        if (show2) {
            setTempSlide(activeSlide);
            setactiveSlide(false);
        } else {
            setactiveSlide(tempSlide);
            setTempSlide(false);
        }
    }, [show2]);
    const [isContactClicked, setisContactClicked] = useState(false);
    useEffect(() => {
        console.log({ isContactClicked });
    }, [isContactClicked]);
    const [isAuthenticated, setisAuthenticated] = useState(authenticated);
    const [clickedRoute, setclickedRoute] = useState(false);
    return (
        <>
            <main>
                <div className="main-wrapper web-version">
                    <Slider {...settings} ref={(slider) => (sliderefd.current = slider)} className="dark bg-slick ad-slick wijk wijk-slick">
                        <AnimatePresence exitBeforeEnter={true} >
                            <motion.div key={activeSlide}>
                                <div className="nav-light"><NavSec setclickedRoute={setclickedRoute} setisAuthenticated={setisAuthenticated} setisContactClicked={setisContactClicked} destination={`destination=/adobe-wijk?slide=${activeSlide}`} /></div>
                                <div className="container trans-all">
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5, delay: 0.3 }} className="vert-text-main text-white">Introduction</motion.span>
                                    <Row className="position-relative">
                                        <Col xl={8} lg={8} className="offset-lg-4 offset-xl-4">
                                            {/* <motion.img key={1} initial={{opacity: 0, x:-40}} animate={{ opacity: 1, x:0  }} transition={{ ease: "easeOut", duration: 1}}  transition={{ ease: "easeOut", duration: 1}} src="/images/facebook-poster.webp" className="w100 position-relative z-9 w-max-60" /> */}
                                            <motion.div key={1} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ ease: "easeOut", duration: 1 }} className="w100 position-relative z-9 w-max-60">
                                                <ReactPlayer url={links?.adobe_wiki?.video_1} id="video_1" className="player" width="100%" height="100%" allowFullScreen playing={activeSlide === 0} />
                                            </motion.div>
                                            <motion.img key={2} initial={{ opacity: 0, y: 150 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: "easeOut", duration: 1 }} src="/images/pattern-rec.svg" className="p-rec" />
                                        </Col>
                                        <Col lg={12}>
                                            <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delau: 0.2 }} src="/images/pattern-xl.svg" className="p-xl" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={12}>
                                            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 1 }} className="half-width-para mt-4">
                                                <p className="f-18 text-white f-bold">Project wijk ia an Adobe endeavour to help compaign creaters and marketers manage their campaigns, right from creaion to delivery.</p>
                                                <p className="f-14 text-white source-sans mb-0 para-normal-text">Whether we’re working with XD or other software leveraging components and states, intuitively predicting the behavioural relationship </p>
                                                <p className="text-white f-bold f-16 source-sans text-right mr-5 pr-3">+ Read more</p>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <AnimatePresence exitBeforeEnter={true} >
                            <motion.div key={activeSlide} className="trans-all">
                                <div className="nav-light"><NavSec setclickedRoute={setclickedRoute} setisAuthenticated={setisAuthenticated} setisContactClicked={setisContactClicked} destination={`destination=/adobe-wijk?slide=${activeSlide}`} /></div>
                                <div className="container trans-all">
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 0.3 }} style={{ top: '43%' }} className="vert-text-main text-white">The Wijk story</motion.span>
                                    <Row className="mt-80">
                                        <Col lg={10}>
                                            <motion.div initial={{ opacity: 0, y: '60px' }} animate={{ opacity: 1, y: 0 }} transition={{ ease: "easeOut", duration: 1, delay: 0 }} className="captivate-wrapper">
                                                <div className="icon-grid mt-5 mb-5">
                                                    <Image src="/images/girl.svg" width={70} height={66} />
                                                    <Image src="/images/men.svg" width={55} height={70} />
                                                    <Image src="/images/women.svg" width={70} height={66} />
                                                </div>
                                                <p className="captivate-para text-white w100">
                                                    “All across the world, companies are using social media to personalise advertised content in order to be more cost effective, but this customisation is expensive and cumbersome.”
                                                </p>
                                                <p className="f-20 f-bold mt-5 text-white">Planning, managing and publishing personalised artwork across Facebook, IG, Youtube is an arduous task marketers face everyday. </p>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <AnimatePresence exitBeforeEnter={true} >
                            <motion.div key={activeSlide} className="trans-all">
                                <div className="nav-light"><NavSec setclickedRoute={setclickedRoute} setisAuthenticated={setisAuthenticated} setisContactClicked={setisContactClicked} destination={`destination=/adobe-wijk?slide=${activeSlide}`} /></div>
                                <div className="container">
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5, delay: 0.3 }} className="vert-text-main text-white">The Wijk story</motion.span>
                                    <Row>
                                        <Col lg={10}>
                                            <motion.div initial={{ opacity: 1, y: '60px' }} animate={{ opacity: 1, y: 0 }} transition={{ ease: "easeOut", duration: 1, delay: 0.2 }} className="captivate-wrapper">
                                                <motion.div initial={{ opacity: 1, y: '60px' }} animate={{ opacity: 1, y: -150 }} transition={{ ease: "easeOut", duration: 0.6, delay: 0 }} className="icon-grid">
                                                    <Image src="/images/girl.svg" width={70} height={66} />
                                                    <Image src="/images/men.svg" width={55} height={70} />
                                                    <Image src="/images/women.svg" width={70} height={66} />
                                                </motion.div>
                                                <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: -60 }} transition={{ ease: "easeOut", duration: 1, delay: 0 }}>
                                                    <p className="captivate-para text-white w100">
                                                        “All across the world, companies are using social media to personalise advertised content in order to be more cost effective, but this customisation is expensive and cumbersome.”
                                                    </p>
                                                    <p className="f-20 f-bold mt-4 text-white">Planning, managing and publishing personalised artwork across Facebook, IG, Youtube is an arduous task marketers face everyday. </p>
                                                </motion.div>
                                                <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -60 }} transition={{ ease: "easeOut", duration: 1, delay: 0.2 }} >
                                                    <motion.div key={1} initial={{ opacity: 0, scale: 0.75 }} animate={{ scale: 1, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.7, delay: 0.2 }} className="w100 origin  w-max-60 mt-4">
                                                        <ReactPlayer url={links?.adobe_wiki?.video_2} id="video_2" width="100%" height="500px" allowFullScreen playing={activeSlide === 2} />
                                                    </motion.div>
                                                    {/* <motion.img initial={{opacity: 0, scale:0.75}} animate={{scale:1, opacity: 1 }} transition={{ ease: "easeOut", duration:0.7, delay:0.2 }} src="/images/luvit.webp" className="" /> */}
                                                </motion.div>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <AnimatePresence exitBeforeEnter={true} >
                            <motion.div key={activeSlide}>
                                <NavSecDark setclickedRoute={setclickedRoute} setisAuthenticated={setisAuthenticated} setisContactClicked={setisContactClicked} destination={`destination=/adobe-wijk?slide=${activeSlide}`} />
                                <div className="container">
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 0.3 }} className="vert-text-main mid-black">The approaches</motion.span>
                                    <Row>
                                        <Col lg={12}>
                                            <div className="text-center mt-5">
                                                <motion.h4 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: "easeOut", duration: 1, delay: 0.2 }} className="sub-title color-dark ">Can we solve this problem for content creators? Could we…</motion.h4>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 0.92 }} transition={{ ease: "easeOut", duration: 1, delay: 0.2 }} className="col-lg-8 pr-0">
                                            <div className="box-wrapper border-rose h-100">
                                                <span className="f-12 text-pink uppercase f-bold">Approach 01 - Existing software</span>
                                                <h4 className="text-dark f-bold mt-3">Plug it into the CC ecosystem ?</h4>
                                                <div className="d-flex mt-5">
                                                    <div className="text-center px-4">
                                                        <h6 className="wijk-rotate-text">INDESIGN</h6>
                                                        <img src="/images/indesign.svg" />
                                                        <p className="f-16 source-sans mt-4">By leveraging object and text styles to scale artwork on InDesign</p>
                                                    </div>
                                                    <div className="text-center px-4">
                                                        <h6 className="wijk-rotate-text xd">XD</h6>
                                                        <img src="/images/xd.svg" />
                                                        <p className="f-16 source-sans mt-4">By building a plug-in to reproduce content at scale on Xd</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                        <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 0.92 }} transition={{ ease: "easeOut", duration: 1, delay: 0.2 }} className="col-lg-4 pl-0">
                                            <div className="box-wrapper border-blue h-100">
                                                <span className="f-12 border-blueColor uppercase f-bold">APPROACH 02- INDEPENDENT PRODUCT</span>
                                                <h4 className="text-dark f-bold mt-3">Build a new product?</h4>
                                                <div className="d-flex mt-5">
                                                    <div className="text-center">
                                                        <img src="/images/question.svg" />
                                                        <p className="f-16 source-sans mt-4">Can we build a product to exclusively address marketers’ needs?</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Row>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <AnimatePresence exitBeforeEnter={true} >
                            <motion.div key={activeSlide}>
                                <NavSecDark setclickedRoute={setclickedRoute} setisAuthenticated={setisAuthenticated} setisContactClicked={setisContactClicked} destination={`destination=/adobe-wijk?slide=${activeSlide}`} />
                                <Container>
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 1 }} className="vert-text-main mid-black">InDesign</motion.span>
                                    <Row>
                                        <Col md={6} className="col-xxl-12 col-xxl-10 col-xxl-8 col-xxl-6">
                                            <span className={`d-flex w100 ${isActive ? 'w-50' : ''}`} >
                                                {/* <motion.img initial={{opacity: 0, scale:0.8}} animate={{ opacity: 1, scale:1 }} transition={{ ease: "easeOut", duration: 0.6,  delay:0.5 }}  src="/images/inDesign.webp" alt="inDesign" className="w-100 origin" /> */}
                                                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 0.4 }} className="w-100 origin" >
                                                    <ReactPlayer url={links?.adobe_wiki?.video_3} id="video_3" className="player" width="1199px" height="681px" allowFullScreen playing={activeSlide === 4} />
                                                </motion.div>
                                                <div className="hammer-icon-container" onClick={handleShow}>
                                                    <img src="/images/hammer.svg" className="hammer-icon" />
                                                    <span className="watch-impletation">Watch implementation</span>
                                                </div>
                                            </span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={11} md={12}>
                                            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 1.5 }} className={`w100 ${isActive ? 'w-70' : ''}`}>
                                                <p className="mid-black f-bold mt-0 mb-2 f-18">A Keynote click-through created to explore how we can leverage template styles on InDesign to reproduce artwork content across different scales and dimensions. </p>
                                                <p className={`mid-black f-16 lh-22 source-sans ${isActive ? 'mt-4' : ''}`} >
                                                    Could we leverage Adobe’s own layout and template tool, InDesign? The answer seemed to be a (hesitant) yes, considering its  <span className="font-medium">familiarity and adoption by power users</span> to create layouts by using templates and styles. Moreover, <span className="font-medium">InDesign is already part of the CC ecosystem,</span> where <span className={`mid-black font-medium f-18 f-16 source-sans bold pointer ${isActive ? 'd-none' : ''}`} onClick={addClass}>+ Read more</span>
                                                    <span className={`d-none ${isActive ? 'd-inline' : ''}`}>
                                                        authors can share assets and collaborate. There seemed to persist the problem however, of syncing the content shared by copy writers, typically from different data points. Integrating with InDesign also seemed to do <span className="font-medium">little with the aspect of authoring</span> and managing campaigns, which later proved to be a crucial necessity. We decided to create a quick prototype of how it would plug-in to InDesign and gauge if this approach was viable.
                                                        <ul className="wijk-list">
                                                            <li>LIKES</li>
                                                            <li>CC presence, familiarity with templates</li>
                                                            <li>HESITATIONS</li>
                                                            <li>Syncing data, managing campaigns</li>
                                                        </ul>
                                                    </span>
                                                </p>

                                            </motion.div>
                                        </Col>
                                    </Row>
                                    <img className={`close-circle d-none ${isActive ? 'd-flex' : ''}`} src="/images/close-circle.png" onClick={removeClass} />
                                </Container>
                            </motion.div>
                        </AnimatePresence>
                        <AnimatePresence exitBeforeEnter={true} >
                            <motion.div key={activeSlide}>
                                <NavSecDark setclickedRoute={setclickedRoute} setisAuthenticated={setisAuthenticated} setisContactClicked={setisContactClicked} destination={`destination=/adobe-wijk?slide=${activeSlide}`} />
                                <Container>
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 1 }} className="vert-text-main mid-black">XD</motion.span>
                                    <Row>
                                        <Col md={6} className="col-xxl-12 col-xxl-10 col-xxl-8 col-xxl-6">
                                            <span className={`d-flex w100 ${isActive ? 'w-50' : ''}`} >
                                                {/* <motion.img initial={{opacity: 0, scale:0.8}} animate={{ opacity: 1, scale:1 }} transition={{ ease: "easeOut", duration: 0.6,  delay:0.5 }}  src="/images/inDesign.webp" alt="inDesign" className="w-100 origin" /> */}
                                                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 0.4 }} className="w-100 origin" >
                                                    <ReactPlayer url={links?.adobe_wiki?.video_4} id="video_4" className="player" width="1199px" height="681px" allowFullScreen playing={activeSlide === 5} />
                                                </motion.div>
                                                <div className="hammer-icon-container" onClick={handleShow2}>
                                                    <img src="/images/hammer.svg" className="hammer-icon" />
                                                    <span className="watch-impletation">Watch implementation</span>
                                                </div>
                                            </span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={10} md={12}>
                                            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 1.5 }} className={`w100 ${isActive ? 'w-70' : ''}`}>
                                                <p className="mid-black mt-0 f-18">A Keynote clickthrough speculating on how a  plug-in could allow authors to scale content using Xd, while syncing data in real-time from multiple sources.</p>
                                                <p className={`mid-black f-14 lh-22 source-sans ${isActive ? 'mt-4' : ''}`} >
                                                    Can we make it a plug- in to another friendly CC product? After eliminating Ps and AI due to engineering constraints, the potential candidate emerged to be Xd, with it’s plug-in-friendly authors and CC presence (the fact that it’s free didn’t hurt either!). Exploring Xd to support&nbsp;&nbsp; <span className={`mid-black font-medium f-18 f-16 source-sans bold pointer ${isActive ? 'd-none' : ''}`} onClick={addClass}>+ Read more</span>
                                                    <span className={`d-none ${isActive ? 'd-inline' : ''}`}>
                                                        port our idea seemed to be promising in many aspects, but we were particularly interested because we <span className="font-medium">could sync data in real time, which meant that designers could attach documents (Word, Excel, Google Docs, etc.) to the Xd file and get notified when alterations are made to the document.</span> <br />
                                                        Again, it failed to address the problem of managing campaigns effectively, and more importantly, it emerged campaign creators were not familiar with Xd as a tool of choice to build artwork for marketing purposes. In the chaotic environment of delivering marketing collateral with very short turn-around times, <span className="font-medium">designers were hesitant to familiarise themselves with a new software.</span> In the light of an anticipated lower adoption, we eliminated Xd but proceeded to leverage Xd’s ability to create and update development links and share them with developers.
                                                    </span>
                                                </p>

                                            </motion.div>
                                        </Col>
                                    </Row>
                                    <img className={`close-circle d-none ${isActive ? 'd-flex' : ''}`} src="/images/close-circle.png" onClick={removeClass} />
                                </Container>
                            </motion.div>
                        </AnimatePresence>
                        <AnimatePresence exitBeforeEnter={true} >
                            <motion.div key={activeSlide}>

                                <img src="/images/wave.svg" className="wave" />
                                <div className="nav-light"><NavSec setclickedRoute={setclickedRoute} setisAuthenticated={setisAuthenticated} setisContactClicked={setisContactClicked} destination={`destination=/adobe-wijk?slide=${activeSlide}`} /></div>
                                <div className="container">
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 1 }} className="vert-text-main pink">Reflection</motion.span>
                                    <Row>
                                        <Col lg={12}>
                                            <motion.h2 initial={{ opacity: 0, y: 40 }} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 0.4 }} className="reflection-title mt-5 pl-5 ml-4">Are we really doing the best<br /> we can, for these folks?</motion.h2>
                                        </Col>
                                        <Col lg={6} className="mt-5">
                                            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 0.4 }} className="text-right text-white">
                                                <p className="f-13">Are we taking their problems seriously enough?</p>
                                                <p className="f-13 mt-4">Are we effectively communicating what they go through for their livelihood?</p>
                                            </motion.div>
                                        </Col>
                                        <Col lg={12}>
                                            <motion.h1 initial={{ opacity: 0, x: '24%', y: '300px' }} animate={{ x: '30%', y: '300px', opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 0.4 }} className="rf-position-text text-white">Maybe we could do more.</motion.h1>
                                        </Col>
                                    </Row>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <AnimatePresence exitBeforeEnter={true} >
                            <motion.div key={activeSlide}>
                                <motion.img initial={{ opacity: 1, y: 0 }} animate={{ y: '-46%', opacity: 1 }} transition={{ ease: "easeOut", duration: 1.5, delay: 0.4 }} src="/images/wave.svg" className="wave" />
                                <div className="nav-light"><NavSec setclickedRoute={setclickedRoute} setisAuthenticated={setisAuthenticated} setisContactClicked={setisContactClicked} destination={`destination=/adobe-wijk?slide=${activeSlide}`} /></div>
                                <div className="container">
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 1 }} className="vert-text-main pink">Reflection</motion.span>
                                    <Row>
                                        <Col lg={12}>
                                            <motion.h2 initial={{ opacity: 0 }} animate={{ x: 400, y: -500, opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 0.4 }} className="reflection-title mt-5 pl-5 ml-4">Are we really doing the best<br /> we can, for these folks?</motion.h2>
                                        </Col>
                                        <Col lg={6} className="mt-5">
                                            <motion.div initial={{ opacity: 0 }} animate={{ y: -500, opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 0.4 }} className="text-right text-white">
                                                <p className="f-13">Are we taking their problems seriously enough?</p>
                                                <p className="f-13 mt-4">Are we effectively communicating what they go through for their livelihood?</p>
                                            </motion.div>
                                        </Col>
                                        <Col lg={12}>
                                            <motion.div initial={{ opacity: 0, x: '30%', y: '300' }} animate={{ x: 0, y: -100, opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 0.4 }} >
                                                <h1 className="rf-position-text text-white">Maybe we could do more.</h1>
                                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 0.4 }} className="text-right text-white ml-auto lh-2 w-70 mt-80">After scrutinising the creation process thoroughly, we agreed that we wanted to empower campaign creators to orchestrate and manage their campaigns from anywhere, at anytime. Since marketers are constantly juggling multiple projects, our strive was to enable them to create “Content On-The-Go”. </motion.p>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <AnimatePresence exitBeforeEnter={true} >
                            <motion.div key={activeSlide}>
                                <img src="/images/wave.svg" className="wave" />
                                <div className="nav-light"><NavSec setclickedRoute={setclickedRoute} setisAuthenticated={setisAuthenticated} setisContactClicked={setisContactClicked} destination={`destination=/adobe-wijk?slide=${activeSlide}`} /></div>
                                <div className="container">
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 1 }} className="vert-text-main pink">Reflection</motion.span>
                                    <Row>
                                        <Col lg={12}>
                                            <motion.div  >
                                                <motion.h1 initial={{ opacity: 0, y: '0' }} animate={{ y: '-100vh', opacity: 0 }} transition={{ ease: "easeOut", duration: 1.5, delay: 0 }} className="rf-position-text text-white mt-28">Maybe we could do more.</motion.h1>
                                                <motion.p initial={{ opacity: 0, y: '0' }} animate={{ y: '-100vh', opacity: 0 }} transition={{ ease: "easeOut", duration: 1.5, delay: 0 }} className="text-right text-white ml-auto w-86 f-24 lh-2 mt-80">After scrutinising the creation process thoroughly, we agreed that we wanted to empower campaign creators to orchestrate and manage their campaigns from anywhere, at anytime. Since marketers are constantly juggling multiple projects, our strive was to enable them to create “Content On-The-Go”. </motion.p>
                                                <motion.h1 initial={{ opacity: 0, y: '70vh' }} animate={{ y: -420, opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 0 }} className=" text-white pl-5 f-56">Introducing <span className="text-pink">Wijk</span></motion.h1>
                                                <motion.p initial={{ opacity: 0, y: '70vh' }} animate={{ y: -420, opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 0 }} className=" text-white pl-5 mt-4 f-24">A content production app that lets you create content on-to-go</motion.p>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <AnimatePresence exitBeforeEnter={true} >
                            <motion.div key={activeSlide}>
                                <NavSecDark setclickedRoute={setclickedRoute} setisAuthenticated={setisAuthenticated} setisContactClicked={setisContactClicked} destination={`destination=/adobe-wijk?slide=${activeSlide}`} />
                                <div className="container">
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 1 }} className="vert-text-main dark">Campaign orchestration</motion.span>
                                    <Row>
                                        <Col md={6} className="col-xxl-12 col-xxl-10 col-xxl-8 col-xxl-6">
                                            {/* <motion.img initial={{opacity: 0,  y:60}} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration:1, delay:0.4}} src="/images/Campaign-orchestration.webp" className="mt-3 w-100" /> */}

                                            <motion.div initial={{ opacity: 0, y: 60 }} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 0.4 }} className="mt-3 w-100">
                                                <ReactPlayer url={links?.adobe_wiki?.video_5} id="video_5" className="player" width="1199px" height="681px" allowFullScreen playing={activeSlide === 9} />
                                            </motion.div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={10} lg={11} md={12}>
                                            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 1.5 }}>
                                                <p className="f-bold f-18 mt-4">Campaign managers can set up campaigns, mark the channels for focus, and share content sheets with copywriters, and also share requests with designers, to start the creation process.</p>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <AnimatePresence exitBeforeEnter={true} >
                            <motion.div key={activeSlide}>
                                <NavSecDark setclickedRoute={setclickedRoute} setisAuthenticated={setisAuthenticated} setisContactClicked={setisContactClicked} destination={`destination=/adobe-wijk?slide=${activeSlide}`} />
                                <div className="container">
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 1 }} className="vert-text-main dark">Creation of assets</motion.span>
                                    <Row>
                                        <Col md={6} className="col-xxl-8 col-xxl-6">
                                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 0.4 }} className="mt-3 w-100 origin" >
                                                <ReactPlayer url={links?.adobe_wiki?.video_6} id="video_6" className="player" width="1199px" height="681px" allowFullScreen playing={activeSlide === 10} />
                                            </motion.div>
                                            {/* <motion.img initial={{opacity: 0, scale:0.8}} animate={{ opacity: 1, scale:1 }} transition={{ ease: "easeOut", duration: 0.6,  delay:0.4 }} src="/images/assets.webp" className="mt-3 w-100 origin" /> */}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={11} md={12}>
                                            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 1.5 }}>
                                                <p className="f-bold f-18 mt-0">Designers can start creating the assets on-the-go using the Wijk app. They can import images, and use placeholder text with desired formatting until the content is ready. Edits can be made to all artboards in bulk, or to a single artboard at a time. </p>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <AnimatePresence exitBeforeEnter={true} >
                            <motion.div key={activeSlide}>
                                <NavSecDark setclickedRoute={setclickedRoute} setisAuthenticated={setisAuthenticated} setisContactClicked={setisContactClicked} destination={`destination=/adobe-wijk?slide=${activeSlide}`} />
                                <div className="container">
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 1 }} className="vert-text-main dark">Preview and share</motion.span>
                                    <motion.div initial={{ opacity: 0, y: 80 }} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 1 }} className="row mt-4">
                                        <Col lg={6}>
                                            <motion.img initial={{ opacity: 1, x: 15 }} animate={{ x: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.2, delay: 1.5 }} src="/images/ps-1.webp" className="w100" />
                                        </Col>
                                        <Col lg={6}>
                                            <motion.img initial={{ opacity: 1, x: -15 }} animate={{ x: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.2, delay: 1.5 }} src="/images/ps-2.webp" className="w100" />
                                        </Col>
                                        <Col xl={3} lg={3}>
                                            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.2, delay: 2 }}>
                                                <p className="pAs-text">Preview AND PRESENT by <br /><span>platform</span> type</p>
                                                <p className="pAs-subtext">Eg: all Facebook posts across different focus groups</p>
                                            </motion.div>
                                        </Col>
                                        <Col xl={6} lg={6}>
                                            <div className="mt-m5 trans-180">
                                                {/* <img src="/images/ps-3.webp" className="w100" /> */}
                                                <ReactPlayer url={links?.adobe_wiki?.video_7} id="video_7" width="100%" height="400px" allowFullScreen playing={activeSlide === 11} />
                                                <p className="pAs-text text-center">PRESENT ARTWORK  <span>JUST THE WAY IT WOULD APPEAR</span></p>
                                            </div>
                                        </Col>
                                        <Col xl={3} lg={3}>
                                            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.2, delay: 2 }}>
                                                <p className="pAs-text text-right">Preview AND PRESENT by <br /><span>AUDIENCE</span> type</p>
                                                <p className="pAs-subtext text-right">Eg: all Facebook posts across different focus groups</p>
                                            </motion.div>
                                        </Col>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <AnimatePresence exitBeforeEnter={true} >
                            <motion.div key={activeSlide}>
                                <NavSecDark setclickedRoute={setclickedRoute} setisAuthenticated={setisAuthenticated} setisContactClicked={setisContactClicked} destination={`destination=/adobe-wijk?slide=${activeSlide}`} />
                                <div className="container">
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 1 }} className="vert-text-main dark">Collaboration and delivery</motion.span>
                                    <Row>
                                        <Col md={6} className="col-xxl-8 col-xxl-6">
                                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 0.4 }} className="mt-3 w-100 origin">
                                                <ReactPlayer url={links?.adobe_wiki?.video_8} id="video_8" className="player" width="1199px" height="681px" allowFullScreen playing={activeSlide === 12} />
                                            </motion.div>
                                            {/* <motion.img initial={{opacity: 0, scale:0.8}} animate={{ opacity: 1, scale:1 }} transition={{ ease: "easeOut", duration: 0.6,  delay:0.4 }} src="/images/Collaboration-and-delivery.webp" className="mt-3 w-100 origin" /> */}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={11} md={12}>
                                            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 1, delay: 1.5 }}>
                                                <p className="f-bold f-18 mt-0">As the creation production nears the end, stakeholders can collaborate (remotely), preview and review the collateral by artwork or audience type, depending on the clients’ preference. Once the assets are good to go, they can share a development link with the engineering team.</p>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <AnimatePresence exitBeforeEnter={true} >
                            <motion.div key={activeSlide}>
                                <NavSecDark setclickedRoute={setclickedRoute} setisAuthenticated={setisAuthenticated} setisContactClicked={setisContactClicked} destination={`destination=/adobe-wijk?slide=${activeSlide}`} />
                                <Container>
                                    <Row>
                                        <Col lg={12} className="mt-5">
                                            <motion.div className="position-relative" >
                                                <div className="contact-wrapper opacityOne position-absolute z--0">
                                                    <div className="d-flex align-items-end justify-content-between">
                                                        <motion.p initial={{ x: '-15vw' }} animate={{ x: '0' }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }} className="pv-proj text-white mb-4"><Link href="/adobe-captivate"><a className="text-dark d-flex align-items-center"><motion.img initial={{ opacity: '0', x: 40 }} animate={{ opacity: '1', x: 0 }} transition={{ ease: "easeOut", duration: 1, delay: 1.8 }} src="/images/leftArrowXs.svg" height="26" className="ml-3" /> Previous project</a></Link></motion.p>
                                                        <motion.h1 initial={{ x: '15vw' }} animate={{ x: '0' }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }} className=" text-dark contact-heading-2 mt-2 d-flex align-items-center"> Next project <motion.img initial={{ opacity: '0' }} animate={{ opacity: '1' }} transition={{ ease: "easeOut", duration: 1, delay: 1.8 }} src="/images/logo/right-arrow.png" className="ml-3" /></motion.h1>
                                                    </div>
                                                    <motion.div className="d-flex justify-content-end flex-column align-items-end">
                                                        <motion.p initial={{ x: '-15vw' }} animate={{ x: '0' }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }} className="contact-light-text text-dark  d-flex align-items-center no-wrap ">Get in touch for a detailed walkthrough of my work. <motion.img initial={{ x: -20, y: -20, opacity: 0 }} animate={{ x: 10, y: -40, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1.8 }} src="/images/logo/right-top-dark.png" /></motion.p>
                                                        <motion.p initial={{ x: '10vw' }} animate={{ x: '0' }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }} className="contact-mid-text text-dark">Contact me</motion.p>
                                                    </motion.div>
                                                </div>
                                                <div className="contact-wrapper bg-white border-black opacity-1 position-relative z-9">
                                                    <div className="d-flex align-items-end justify-content-between">
                                                        <motion.p initial={{ x: '-15vw' }} animate={{ x: '0' }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }} className="pv-proj theme-blue mb-4"><Link href="/adobe-captivate"><a className="theme-blue d-flex align-items-center"><motion.img initial={{ opacity: '0', x: 40 }} animate={{ opacity: '1', x: 0 }} transition={{ ease: "easeOut", duration: 1, delay: 1.8 }} src="/images/leftArrowXs.svg" height="26" className="ml-3" /> Previous project</a></Link></motion.p>
                                                        <motion.h1 initial={{ x: '15vw' }} animate={{ x: '0' }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }} className="contact-heading-2 mt-2 d-flex align-items-center"><Link href="/adobe-animate"><a className="theme-blue d-flex align-items-center"> Next project <motion.img initial={{ opacity: '0' }} animate={{ opacity: '1' }} transition={{ ease: "easeOut", duration: 1, delay: 1.8 }} src="/images/logo/right-arrow.png" className="ml-3" /></a></Link></motion.h1>
                                                    </div>
                                                    <motion.div className="d-flex justify-content-end flex-column align-items-end hoverText">
                                                        <motion.p initial={{ x: '-15vw' }} animate={{ x: '0' }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }} className="contact-light-text text-dark  d-flex align-items-center no-wrap "><a href={`#`} onClick={() => setisContactClicked(true)}>Get in touch for a detailed walkthrough of my work.
                                                            <motion.img initial={{ x: -20, y: -20, opacity: 0 }} animate={{ x: 10, y: -40, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1.8 }} src="/images/logo/right-top-dark.png" className="img-white inherit-display" />
                                                            <motion.img initial={{ x: -20, y: -20, opacity: 0 }} animate={{ x: 10, y: -40, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1.8 }} src="/images/right-top-purple.png" className="img-orange inherit-display" />
                                                        </a></motion.p>
                                                        <motion.p initial={{ x: '10vw' }} animate={{ x: '0' }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }} className="contact-mid-text text-dark purple"><a href={`#`} onClick={() => setisContactClicked(true)}>Contact me</a></motion.p>
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                </Container>
                            </motion.div>
                        </AnimatePresence>
                    </Slider>
                </div>
                <Modal show={show} onHide={handleClose} className="video-modal">
                    <Modal.Header closeButton></Modal.Header>
                    <Container >
                        <motion.div className="video-player mt-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }}>
                            <ReactPlayer url={links?.adobe_wiki?.video_9} id="video_9" className="player" width="1199px" height="681px" controls autoPlay playing={show} onContextMenu={handleContextMenu} playIcon={<div>Icon</div>} />
                        </motion.div>
                    </Container>
                </Modal>

                <Modal show={show2} onHide={handleClose2}>
                    <Modal.Header closeButton></Modal.Header>
                    <Container >
                        <motion.div className="video-player mt-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }}>
                            <ReactPlayer url={links?.adobe_wiki?.video_10} id="video_10" className="player" width="1199px" height="681px" allowFullScreen playing={show2} />
                        </motion.div>
                    </Container>
                </Modal>
                <div className="main-wrapper home-bg mobile-version p-0">
                    <MobileNav setclickedRoute={setclickedRoute} setisAuthenticated={setisAuthenticated} setisContactClicked={setisContactClicked} destination={`destination=/adobe-wijk?slide=${activeSlide}`} />
                    <div className="position-relative">
                        <Container className="px-4">
                            <Row className="align-items-center">
                                <Col md={12}>
                                    <div className="d-flex justify-content-end">
                                        <img src="/images/facebook-poster.webp" className="wijk-banner-mobile" />
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        <img src="/images/pattern-xl.svg" className="p-xl-mobile" />
                        <img src="/images/pattern-rec.svg" className="p-sm-mobile" />
                    </div>
                    <Container className="px-4">
                        <Row className="align-items-center">
                            <Col md={12} className="mt-5">
                                <h1 className="intro-text mt-3 text-white">Introduction</h1>
                                <p className="para-bold-text mt-3 text-white">Project Wijk is an Adobe endeavour to help campaign creators and marketers manage their campaigns, right from creation to delivery. </p>
                                <p className="para-normal-text source-sans mt-4 text-white">Whether we’re working with XD or other software leveraging components and states, intuitively predicting the behavioural relationship between the default state and other states can be tricky, with any change in properties made to objects in the default state always…</p>
                            </Col>
                        </Row>
                    </Container>
                    <Container className="px-4">
                        <Row className="align-items-center">
                            <Col md={12} className="mt-5">
                                <div className="icon-grid mb-4">
                                    <Image src="/images/girl.svg" width={70} height={66} />
                                    <Image src="/images/men.svg" width={55} height={70} />
                                    <Image src="/images/women.svg" width={70} height={66} />
                                </div>
                                <p className="captivate-para text-white w100">
                                    “All across the world, companies are using social media to personalise advertised content in order to be more cost effective, but this customisation is expensive and cumbersome.”
                                </p>
                                <p className="title-bold mt-4 text-white lh-40">Planning, managing and publishing personalised artwork across Facebook, IG, Youtube is an arduous task marketers face everyday. </p>
                            </Col>
                        </Row>
                    </Container>
                    <div className="mt-4 pb-4">
                        <img src="/images/luvit.webp" className="w-100 mb-5" />
                    </div>
                    <div className="bg-white py-5">
                        <Container className="px-4">
                            <Row className="align-items-center">
                                <Col md={12} className="mt-4">
                                    <p className="title-bold lh-30">Can we solve this problem for content creators? Could we…</p>
                                    <div className="mt-5">
                                        <div className="box-wrapper border-rose h-100">
                                            <span className="f-12 uppercase f-bold">Approach 01</span>
                                            <h4 className="text-dark f-18 f-light lh-28 mt-2">Plug it into the CC<br /> ecosystem ?</h4>
                                            <div className=" mt-5">
                                                <div className="text-center px-4">
                                                    <img src="/images/indesign.svg" />
                                                    <p className="f-14 source-sans mt-2">By leveraging object and text styles to scale artwork on InDesign</p>
                                                </div>
                                                <div className="text-center px-4 mt-5">
                                                    <img src="/images/xd.svg" />
                                                    <p className="f-14 source-sans mt-2">By building a plug-in to reproduce content at scale on Xd</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={12} className="mt-4">
                                    <div className="mt-5">
                                        <div className="box-wrapper border-rose h-100">
                                            <span className="f-12 uppercase f-bold">Approach 02</span>
                                            <h4 className="text-dark f-18 f-light lh-28 mt-2">Build a new product?</h4>
                                            <div className=" mt-5">
                                                <div className="text-center px-4">
                                                    <img src="/images/question.svg" />
                                                    <p className="f-14 source-sans mt-2">Can we build a product to exclusively address marketers’ needs?</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        <div className=" br-0  mt-80" >
                            <Image src="/images/inDesign.webp" alt="property-inspector" width={1199} height={681} />
                        </div>
                        <Container className="px-m4">
                            <Row>
                                <Col md={12} className="mt-4">
                                    <h1 className="intro-text mt-3">InDesign</h1>
                                    <p className="para-bold-text mt-3">A Keynote click-through created to explore how we can leverage template styles on InDesign to reproduce artwork content across different scales and dimensions. </p>
                                    <p className="para-normal-text source-sans mt-4">Could we leverage Adobe’s own layout and template tool, InDesign? The answer seemed to be a (hesitant) yes, considering its <span className="font-medium">familiarity and adoption by power users</span>to create layouts by using templates and styles. Moreover, InDesign is already part of the CC ecosystem, where autho…</p>
                                    <p className="readMore mt-4 mb-0"> +   Read more</p>
                                </Col>
                            </Row>
                        </Container>
                        <div className=" br-0  mt-80" >
                            <Image src="/images/inDesign.webp" alt="property-inspector" width={1199} height={681} />
                        </div>
                        <Container className="px-m4">
                            <Row>
                                <Col md={12} className="mt-4">
                                    <h1 className="intro-text mt-3">XD</h1>
                                    <p className="para-bold-text mt-3">A Keynote clickthrough speculating on how a  plug-in could allow authors to scale content using Xd, while syncing data in real-time from multiple sources.</p>
                                    <p className="para-normal-text source-sans mt-4">Can we make it a plug- in to another friendly CC product? After eliminating Ps and AI due to engineering constraints, the potential candidate emerged to be Xd, with it’s plug-in-friendly authors and CC presence (the fact that it’s free didn’t hurt either!). Exploring Xd to support</p>
                                    <p className="readMore mt-4 mb-4"> +   Read more</p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className="bg-dark-wijk py-5">
                        <Container className="px-m4">
                            <Row>
                                <Col md={12} className="mt-4">
                                    <h1 className="source-sans light f-32 text-pink lh-40">Are we really doing the best we can, for these folks?</h1>
                                </Col>
                            </Row>
                        </Container>
                        <div className="folks-bg my-5">
                            <Container className="px-m4">
                                <Row>
                                    <Col md={12} className="mb-5">
                                        <p className="f-14 text-white">Are we taking their problems seriously enough?</p>
                                    </Col>
                                    <Col md={12} className="mb-5">
                                        <p className="f-14 text-white mb-0">Are we effectively communicating what they go through for their livelihood?</p>
                                    </Col>
                                    <Col md={12}>
                                        <h1 className="mWm-text f-bold text-white mWw-transY">Maybe we could do more.</h1>
                                    </Col>

                                </Row>
                            </Container>
                        </div>
                        <Container className="px-m4 mt-80">
                            <Row>
                                <Col md={12}>
                                    <p className="f-14 f-medium text-white lh-28">After scrutinising the creation process thoroughly, we agreed that we wanted to empower campaign creators to orchestrate and manage their campaigns from anywhere, at anytime. Since marketers are constantly juggling multiple projects, our strive was to enable them to create “Content On-The-Go”. </p>
                                </Col>
                                <Col md={12} className="mt-5 text-center">
                                    <h1 className="mWm-text f-bold text-white ">Introducing <br /><span className="text-pink">Wijk</span></h1>
                                    <p className="f-14 text-white uppercase f-bold mt-5 mb-5">A content production app that lets you create content on-the-go.</p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className="bg-white py-5">
                        <div className=" br-0  mt-5" >
                            <img src="/images/Campaign-orchestration.webp" alt="Campaign-orchestration" className="w-100" />
                        </div>
                        <Container className="px-m4">
                            <Row>
                                <Col md={12} className="mt-4">
                                    <h1 className="intro-text mt-3">Campaign orchestration</h1>
                                    <p className="para-bold-text mt-3">Campaign managers can set up campaigns, mark the channels for focus, and share content sheets with copywriters, and also share requests with designers, to start the creation process.</p>

                                </Col>
                            </Row>
                        </Container>
                        <div className=" br-0  mt-80" >
                            <img src="/images/assets.webp" alt="assets" className="w-100" />
                        </div>
                        <Container className="px-m4">
                            <Row>
                                <Col md={12} className="mt-3">
                                    <h1 className="intro-text">Creation of assets</h1>
                                    <p className="para-bold-text mt-3">Designers can start creating the assets on-the-go using the Wijk app. They can import images, and use placeholder text with desired formatting until the content is ready. Edits can be made to all artboards in bulk, or to a single artboard at a time. </p>
                                </Col>
                            </Row>
                        </Container>
                        <Container className="px-m4">
                            <Row>
                                <Col md={12} className="mt-80">
                                    <img src="/images/ps-1.webp" alt="assets" className="w-100" />
                                    <p className="pAs-text uppercase">Preview AND PRESENT by <span>platform</span></p>
                                    <p className="pAs-subtext">Eg: all Facebook posts across different focus groups</p>
                                </Col>
                                <Col md={12} className="mt-5">
                                    <img src="/images/ps-2.webp" alt="assets" className="w-100" />
                                    <p className="pAs-text uppercase">Preview AND PRESENT by  <span>audience</span></p>
                                    <p className="pAs-subtext">Eg: all posts focused on female Facebook followers</p>
                                </Col>
                            </Row>
                        </Container>
                        <div className=" br-0  mt-5 mb-4" >
                            <img src="/images/ps-3.webp" alt="assets" className="w-100" />
                        </div>
                        <Container className="px-m4">
                            <Row>
                                <Col md={12}>
                                    <p className="pAs-text uppercase text-center">PRESENT ARTWORK <span>JUST THE WAY IT WOULD APPEAR</span></p>
                                </Col>
                            </Row>
                        </Container>
                        <div className=" br-0  mt-80" >
                            <img src="/images/Collaboration-and-delivery.webp" alt="assets" className="w-100" />
                        </div>
                        <Container className="px-m4">
                            <Row>
                                <Col md={12} className="mt-3">
                                    <h1 className="intro-text">Collaboration and delivery</h1>
                                    <p className="para-bold-text mt-3">As the creation production nears the end, stakeholders can collaborate (remotely), preview and review the collateral by artwork or audience type, depending on the clients’ preference. Once the assets are good to go, they can share a development link with the engineering team.</p>
                                </Col>
                            </Row>
                        </Container>
                        <div className="contact-wrapper-mobile pt-5 pb-2">
                            <Container>
                                <Row>
                                    <Col md={12}>
                                        <div className="cWb border-black">
                                            <h1><Link href="/adobe-animate"><a className="theme-blue">Next project</a></Link></h1>
                                            <p className="mt-3 mb-0  f-medium"><Link href="/adobe-captivate"><a className="text-dark">Previous project</a></Link></p>
                                            <p className="mt-80 mb-0 text-dark">Get in touch for a detailed walkthrough of my work.</p>
                                            <h2 className="text-dark mb-3 d-flex"><a href={`#`} onClick={() => setisContactClicked(true)}>Contact me <img src="/images/logo/right-top-dark.png" className="mob-contact-arrow" /></a></h2>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </div>
            </main>
            <Contact isContactClicked={isContactClicked} setisContactClicked={setisContactClicked} />
            <Authentication isAuthenticated={isAuthenticated} setisAuthenticated={setisAuthenticated} toPage={clickedRoute} />
        </>
    );
}

export async function getServerSideProps({ req, res, resolvedUrl }) {
    let authenticated = true;
    const data = parseCookies(req);
    let responseJSON = await requireAuth(data[GUEST_MAGIC_CODE], req);
    if (!responseJSON.success) {
        authenticated = false;
    }
    return {
        props: {
            authenticated, authenticated,
            links: responseJSON.success ? responseJSON.pageLinks : []
        }
    }
}

export default AdobeWiki;