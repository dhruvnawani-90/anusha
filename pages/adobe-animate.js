
import React, { useEffect, useRef, useState } from "react";
import NavSec from "../components/shared/NavSec"
import Slider from "react-slick";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, usePresence  } from "framer-motion"
import MobileNav from "../components/shared/MobileNav"
import { GUEST_MAGIC_CODE } from "../utils/constants"
import { parseCookies } from "../utils/helpers"
import { requireAuth } from '../utils/auth'
import ReactPlayer from 'react-player';

function AdobeAnimate({links}) {
    const [activeSlide, setactiveSlide] = useState(1);
    const sliderefd = useRef();
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
        console.log({activeSlide});
    }, [activeSlide]);
    const [isPresent, safeToRemove] = usePresence()

    useEffect(() => {
        console.log(isPresent, "isPresent isPresent isPresent")
        !isPresent && setTimeout(safeToRemove, 1000)
    }, [isPresent])

    const changeSlide = (y) => {
        const div = sliderefd.current;
        y > 0 ? div.slickPrev() : div.slickNext();
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
    return (
        <main>
            <div className="main-wrapper web-version black-slick ad-slick">
                <Slider {...settings} ref={(slider) => (sliderefd.current = slider)} className="bg-single-slick adobeAnimate">
                    <AnimatePresence exitBeforeEnter={true} >
                        <motion.div key={activeSlide}>
                            <img src="/images/Path-76183.svg" className="position-absolute left-position" />
                            <img src="/images/right-position.svg" className="position-absolute right-position" />
                            <div className="nav-light"><NavSec /></div>
                            <Container> 
                                <motion.span initial={{opacity: 0}} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1,  delay:1 }} className="vert-text-main orange-text">Introduction</motion.span>
                                <Row>
                                    <Col md={6} className="col-xxl-11 col-xxl-10 col-xxl-8 col-xxl-6">
                                        <div>
                                            <span >
                                                {/* <motion.img initial={{opacity: 0, scale:0.8}} animate={{ opacity: 1, scale:1 }} transition={{ ease: "easeOut", duration: 0.6,  delay:0.5 }}  src="/images/animate-introduction.webp" alt="property-inspector" className="w-100 origin" /> */}
                                                <motion.div initial={{opacity: 0, scale:0.8}} animate={{ opacity: 1, scale:1 }} transition={{ ease: "easeOut", duration: 0.6,  delay:0.4 }} className="w-100 origin" >
                                                    <ReactPlayer url={links?.adobe_animate?.video_1} id="video_1" className="player" width="1199px" height="681px" allowFullScreen playing={activeSlide === 0} />
                                                </motion.div>
                                            </span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={10} lg={11} md={12}>
                                        <motion.div initial={{opacity: 0, y:-30}} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration:1, delay:1.5}}>
                                            <p className="text-light-orange mt-0 f-18 f-bold ls-m1 ">An XD prototype created to gauge if authors are able to grasp the concept of “linking and unlinking” child states to and from the default state, and intuitively predict the right behaviour.</p>
                                            <p className="text-light-orange mt-3 f-14 mb-1 source-sans">Whether we’re working with XD or other software leveraging components and states, intuitively predicting the behavioural relationship</p>
                                        </motion.div>
                                    </Col>
                                </Row>
                            </Container>
                        </motion.div>
                    </AnimatePresence>
                    <AnimatePresence exitBeforeEnter={true} >
                        <motion.div key={activeSlide}>
                            <img src="/images/animate-layer.webp" className="position-absolute w-100" />
                            <div className="nav-light"><NavSec /></div>
                            <div className="container">
                                <motion.span initial={{opacity: 0}} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1,  delay:1 }} style={{top:'73.6%'}} className="vert-text-main orange-text">The Animate story</motion.span>
                                <Row>
                                    <Col lg={10} className="offset-lg-1">
                                        <motion.div initial={{opacity: 0, y:'80px'}} animate={{opacity:1, y:0}} transition={{ ease: "easeOut", duration:1, delay:0}} className="animate-wrapper pl-0" >
                                            <p className="text-light-orange f-16 f-bold">Our objective for the Animate 2019 release was to completely modernise the interface and optimise<br /> workflows primarily for novice users, while retaining familiarity and power for advanced users.</p>
                                            <div className="button-style-wrapper mt-5">
                                                <div className="pr-aud position-relative">
                                                    <span className="f-24 text-black">
                                                        <span className="f-bold">Beginners</span> <span>(primary audience)</span>
                                                    </span>
                                                    <img src="/images/round-btn.svg" className="round-btn" />
                                                </div>
                                                <div className="ad-auth">
                                                    <span className="f-24 mid-black">
                                                        <span className="f-bold ml-2">Advanced authors</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="button-style-wrapper mt-4">
                                                <div className="flex-1-half position-relative">
                                                <span className="f-11 f-bold orange-text">OUR INTERVENTION</span> 
                                                <p className="f-14 text-light-orange cSrqT" >Clutter free interface &nbsp;&nbsp; + &nbsp;&nbsp; Simplified workflows &nbsp;&nbsp; +<br />    Rich QSPs and tutorials</p>
                                                </div>
                                                <div className="flex-1">
                                                    <span className="f-11 f-bold text-light-orange">OUR INTERVENTION</span> 
                                                <p className="f-14 text-light-orange cSrqT" >Identify and retain crucial workflows &nbsp;&nbsp; +<br />    Optimise lengthy workflows</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Col>
                                </Row>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    <AnimatePresence exitBeforeEnter={true} >
                        <motion.div key={activeSlide}>
                            <img src="/images/animate-layer.webp" className="position-absolute w-100" />
                            <div className="nav-light"><NavSec /></div>
                            <div className="container" >
                                <motion.span initial={{opacity: 0}} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1,  delay:1 }} className="vert-text-main orange-text">The Animate story</motion.span>
                                <div className="o-hidden">
                                    <Row>
                                        <Col lg={12}>
                                            <motion.div initial={{opacity: 0, y:'150px'}} animate={{opacity:1, y:-70}} transition={{ ease: "easeOut", duration:1, delay:0}} className="animate-wrapper" className="animate-wrapper pt-0">
                                                <motion.p initial={{opacity: 0, y:'0px'}} animate={{opacity:1, y:-100}} transition={{ ease: "easeOut", duration:1, delay:0}} className="text-light-orange f-16 f-bold">Our objective for the Animate 2019 release was to completely modernise the interface and optimise<br /> workflows primarily for novice users, while retaining familiarity and power for advanced users.</motion.p>
                                                <div className="button-style-wrapper mt-5">
                                                    <div className="pr-aud position-relative">
                                                        <span className="f-24 dark-text">
                                                            <span className="f-bold">Beginners</span> <span>(primary audience)</span>
                                                        </span>
                                                        <img src="/images/round-btn.svg" className="round-btn" />
                                                    </div>
                                                    <div className="ad-auth">
                                                        <span className="f-24 dark-text">
                                                            <span className="f-bold ml-2">Advanced authors</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="button-style-wrapper mt-4">
                                                    <div className="flex-1-half position-relative">
                                                    <span className="f-11 f-bold orange-text">OUR INTERVENTION</span> 
                                                    <p className="f-14 text-light-orange cSrqT" >Clutter free interface &nbsp;&nbsp; + &nbsp;&nbsp; Simplified workflows &nbsp;&nbsp; +<br />    Rich QSPs and tutorials</p>
                                                    </div>
                                                    <div className="flex-1">
                                                    <span className="f-11 f-bold text-light-orange">OUR INTERVENTION</span> 
                                                    <p className="f-14 text-light-orange cSrqT" >Identify and retain crucial workflows &nbsp;&nbsp; +<br />    Optimise lengthy workflows</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </Col>
                                        <Col md={6} className=" col-xxl-6  col-xxl-8">
                                            <motion.div initial={{opacity: 0, y:'150px'}} animate={{opacity:1, y:-70}} transition={{ ease: "easeOut", duration:1, delay:0.4}} className="animate-wrapper pt-0 mt-2">
                                                <motion.img initial={{opacity: 0, y:'150px'}} animate={{opacity:1, y:0}} transition={{ ease: "easeOut", duration:1, delay:0.4}}  src="/images/animate-introduction.webp" alt="Adobe animate CC" className="w-100" />
                                                <div className="button-style-wrapper align-items-center  mt-m75">
                                                    <div className="flex-1-half position-relative">
                                                        <span className="interface antique">The new interface</span> 
                                                    </div>
                                                    <div className="flex-1">
                                                        <span className="f-11 f-bold orange-text">MY CONTRIBUTION</span> 
                                                        <p className="f-11 f-bold antique contribution-text" >Header bar + App frame <br/>Contextual PI<br/>Full-screen experience</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    <AnimatePresence exitBeforeEnter={true} >
                        <motion.div key={activeSlide}>
                            <img src="/images/animate-layer.webp" className="position-absolute w-100" />
                            <div className="nav-light"><NavSec /></div>
                            <Container className="mt-4"> 
                                <motion.span initial={{opacity: 0}} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1,  delay:0.6 }} className="vert-text-main orange-text">Header Bar</motion.span>
                                <Row>
                                    <Col md={6} className="col-xxl-12 col-xxl-10 col-xxl-8 col-xxl-6">
                                        {/* <motion.img initial={{opacity: 0, scale:0.8}} animate={{ opacity: 1, scale:1 }} transition={{ ease: "easeOut", duration: 1 }}  src="/images/header-bar.webp" alt="header bar" className="w-100 origin" /> */}
                                        <motion.div initial={{opacity: 0, scale:0.8}} animate={{ opacity: 1, scale:1 }} transition={{ ease: "easeOut", duration: 0.6,  delay:0.4 }} className="w-100 origin" >
                                            <ReactPlayer url={links?.adobe_animate?.video_2} id="video_2" className="player" width="1199px" height="681px" allowFullScreen playing={activeSlide === 3} />
                                        </motion.div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={10} lg={11} md={12}>
                                        <motion.div initial={{opacity: 0, y:-30}} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration:1, delay:1}}>
                                        <p className="text-light-orange mt-4 f-18 f-bold ls-m1">XD prototype created to outline the functions of a header bar customised for animators.</p>
                                        </motion.div>
                                    </Col>
                                </Row>
                            </Container>
                        </motion.div>
                    </AnimatePresence>
                    <AnimatePresence exitBeforeEnter={true} >
                        <motion.div key={activeSlide}>
                            <img src="/images/animate-layer.webp" className="position-absolute w-100" />
                            <div className="nav-light"><NavSec /></div>
                            <div className="container mt-4" >
                                <motion.span initial={{opacity: 0}} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1,  delay:1 }} className="vert-text-main orange-text">Property inspector</motion.span>
                                <Row>
                                    <Col md={6} className="col-xxl-11 col-xxl-10 col-xxl-8 col-xxl-6 d-flex">
                                        <div className={`d-flex w100 position-relative ${isActive  ? 'w-50' : ''}`}>
                                            <motion.img className="col-2-5" initial={{opacity: 0, x:-20}} animate={{ opacity: 1, x:0}} transition={{ ease: "easeOut", duration: 1,  delay:0.4 }}  src="/images/property-inspector.svg" alt="property-inspector" className="col-2-5" />
                                            <motion.img className="col-2-5" initial={{opacity: 0, x:-20}} animate={{ opacity: 1, x:0}} transition={{ ease: "easeOut", duration: 1,  delay:0.4 }} src="/images/property-inspector.svg" alt="property-inspector" />
                                            <motion.img className="col-2-5" initial={{opacity:0, x:-40}} animate={{ opacity: 1, x:0}} transition={{ ease: "easeOut", duration: 1,  delay:0.4 }} src="/images/property-inspector.svg" alt="property-inspector"  />
                                            <motion.img className="col-2-5" initial={{opacity: 0, x:0}} animate={{ opacity: 1, x:'10vw'}} transition={{ ease: "easeOut", duration:1,  delay:0.8, stiffness: 400, damping: 40}} src="/images/property-inspector.svg" alt="property-inspector"  />
                                            <motion.img initial={{opacity: 0}} animate={{ opacity: 0.05}} transition={{ ease: "easeOut", duration: 0.6,  delay:1.2 }} src="/images/angle-wave.svg" className="angle-wave" />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={10} md={12}>
                                        <motion.div initial={{opacity: 0, y:-30}} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration:1, delay:1.5}}>
                                            <p className="text-light-orange mt-4 f-18 f-bold">Intervening to build a contextual property inspector with the tool, object, frame and doc tabs to reduce clutter, introduce hierarchy and encourage exploration.</p>
                                            <p className="text-light-orange mt-3 f-14 mb-1 source-sans"></p>
                                            <p className="para-normal-text text-white mt-3 f-14 lh-28 mb-1 source-sans" >
                                                One of the potential risks of deviating from existing workflows within the property inspector was the challenge of “muscle memory”- our&nbsp;
                                                <span className={`d-none ${isActive  ? 'd-inline' : ''}`}>
                                                advanced animators would be habituated to a certain way of working, which should not be impacted singnificantly. At the same time, the tool selection and pre-creation property configuration (like setting fill color before drawing shape) within Animate were really not intuitive, especially for beginners. We had the hard task of making changes in a constrained manner, which primarily involved visually aligning the PI to Spectrum standards, reducing clutter by hiding unimportant workflows, introducing logical hierarchy for beginners, and designing a powerful first mile experience around the PI to define its functionality.
                                                </span>
                                                
                                            </p>
                                            <p className={`text-light-orange font-medium f-16 source-sans text-right  bold pointer ${isActive  ? 'd-none' : ''}`} onClick={addClass}>+ Read more</p>
                                        </motion.div>
                                    </Col>
                                </Row>
                                <img className={`close-circle d-none ${isActive  ? 'd-flex' : ''}`} src="/images/close-circle.png" onClick={removeClass} />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    <AnimatePresence exitBeforeEnter={true} >
                        <motion.div key={activeSlide}>
                            <img src="/images/animate-layer.webp" className="position-absolute w-100" />
                            <div className="nav-light"><NavSec /></div>
                            <Container> 
                                <motion.span initial={{opacity: 0}} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1,  delay:0.4 }} className="vert-text-main orange-text">Full-screen experience</motion.span>
                                <Row>
                                    <Col md={6} className=" col-xxl-10 col-xxl-8 col-xxl-6">
                                        <span className={`d-flex w100 ${isActive  ? 'w-50' : ''}`} >
                                            {/* <motion.img initial={{opacity: 0, scale:0.8}} animate={{ opacity: 1, scale:1 }} transition={{ ease: "easeOut", duration: 0.6,  delay:0.5 }}  src="/images/animate-introduction.webp" alt="animate-introduction" className="w-100 origin" /> */}
                                            <motion.div initial={{opacity: 0, scale:0.8}} animate={{ opacity: 1, scale:1 }} transition={{ ease: "easeOut", duration: 0.6,  delay:0.4 }} className="w-100 origin" >
                                                <ReactPlayer url={links?.adobe_animate?.video_3} id="video_3" className="player" width="1199px" height="681px" allowFullScreen playing={activeSlide === 5} />
                                            </motion.div>
                                        </span>
                                    </Col>
                                    </Row>
                                    <Row>
                                    <Col xl={11} lg={11} md={12}>
                                        <motion.div initial={{opacity: 0, y:-30}} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration:1, delay:1.5}}>
                                            <p className="text-light-orange mt-0 f-18 f-bold">A fully “work-able” full screen that simulates a kind of multi-monitor experience, where authors can turn on and off panels according to which part of their workflow they are in. </p>
                                            <p className="text-light-orange mt-3 f-16 lh-28 mb-1 source-sans" >
                                            An animation scene typically zooms and pans its view, shifting objects in and out of the stage to create depth- in this context, having a large scrap area is especially beneficial. Pro animators tend to  use multiple monitors and draw on their primary device, with panels <span className={`text-light-orange font-medium f-16 source-sans bold pointer ${isActive  ? 'd-none' : ''}`} onClick={addClass}>+ Read more</span>
                                                <span className={`d-none ${isActive  ? 'd-inline' : ''}`}>
                                                    situated on other monitors, but novice authors cannot usually afford multiple monitors. While working on the full screen mode, the absence of any panels renders the view apt for previewing, but not for creating. Shifting in and out of full screen view can be frustrating and lead to performance problems, which irk beginners and pros alike. <span className="f-bold f-14 text-white source-sans mb-2">We decided to introduce a full screen experience, where animators can turn panels on and off, depending on the workflow they are performing. </span> This is especially helpful while building animations, since workflows are mostly demarcated.  For example, authors can turn off all panels except the timeline while working on timings of their movie, versus having on tool and property inspector panels while drawing and manipulating shapes. 
                                                </span>
                                            </p>
                                            
                                        </motion.div>
                                    </Col>
                                </Row>
                                <img className={`close-circle d-none ${isActive  ? 'd-flex' : ''}`} src="/images/close-circle.png" onClick={removeClass} />
                            </Container>
                        </motion.div>
                    </AnimatePresence>
                    <AnimatePresence exitBeforeEnter={true} >
                        <motion.div key={activeSlide}>
                            <img src="/images/anim-contact.svg" className="position-absolute w-100" />
                            <div className="nav-light"><NavSec /></div>
                            <Container> 
                                <Row>
                                    <Col lg={12} className="mt-5">
                                        <motion.div className="position-relative" >
                                            <div className="contact-wrapper opacityOne position-absolute z--0">
                                                <div className="d-flex align-items-end justify-content-between">
                                                    <motion.p initial={{x:'-15vw'}} animate={{ x:'0'}} transition={{ ease: "easeOut", duration: 0.6,  delay:1 }} className="pv-proj mb-4 text-light-orange"><motion.img initial={{opacity:'0', x:40}} animate={{ opacity:'1', x:0}} transition={{ ease: "easeOut", duration: 1,  delay:1.8 }} src="/images/leftArrowXs.svg" height="26" /> Previous project</motion.p>
                                                    <motion.h1 initial={{x:'15vw'}} animate={{ x:'0'}} transition={{ ease: "easeOut", duration: 0.6,  delay:1 }} className=" text-light-orange contact-heading-2 mt-2 d-flex align-items-center"> Next project <motion.img initial={{opacity:'0'}} animate={{ opacity:'1'}} transition={{ ease: "easeOut", duration: 1,  delay:1.8 }} src="/images/logo/right-arrow.png" className="ml-3" /></motion.h1>
                                                </div>
                                                <motion.div className="d-flex  flex-column ">
                                                    <motion.p  initial={{x:'-15vw'}} animate={{ x:'0'}} transition={{ ease: "easeOut", duration: 0.6,  delay:1 }} className="contact-light-text theme-blue">Get in touch for a detailed walkthrough of my work.</motion.p>
                                                    <motion.p initial={{x:'10vw'}} animate={{ x:'0'}} transition={{ ease: "easeOut", duration: 0.6,  delay:1 }} className="contact-mid-text theme-blue text-right pr-4-5"><a href="/contact" target="_blank">Contact me</a></motion.p>
                                                </motion.div>
                                            </div>
                                            <div className="contact-wrapper bg-darken opacity-1 position-relative z-9">
                                                <div className="d-flex align-items-end justify-content-between">
                                                    <motion.p initial={{x:'-15vw'}} animate={{ x:'0'}} transition={{ ease: "easeOut", duration: 0.6,  delay:1 }} className="pv-proj theme-blue mb-4"><motion.img initial={{opacity:'0', x:40}} animate={{ opacity:'1', x:0}} transition={{ ease: "easeOut", duration: 1,  delay:1.8 }} src="/images/leftArrowXs.svg" height="26" /> <Link href="/adobe-wijk"><a className="theme-blue d-flex align-items-center">Previous project</a></Link></motion.p>
                                                    <motion.h1 initial={{x:'15vw'}} animate={{ x:'0'}} transition={{ ease: "easeOut", duration: 0.6,  delay:1 }} className="contact-heading-2 mt-2 d-flex align-items-center"><Link href="/adobe-customer-stories"><a className="theme-blue d-flex align-items-center"> Next project <motion.img initial={{opacity:'0'}} animate={{ opacity:'1'}} transition={{ ease: "easeOut", duration: 1,  delay:1.8 }} src="/images/logo/right-arrow.png" className="ml-3" /></a></Link></motion.h1>
                                                </div>
                                                <motion.div className="d-flex  flex-column hoverText">
                                                    <motion.p initial={{x:'-15vw'}} animate={{ x:'0'}} transition={{ ease: "easeOut", duration: 0.6,  delay:1 }} className="contact-light-text text-light-orange  d-flex align-items-center no-wrap"><a href="/contact" target="_blank">Get in touch for a detailed walkthrough of my work. 
                                                    <motion.img initial={{x:-20, y:-20, opacity:0}} animate={{ x:10, y:-40, opacity:1}} transition={{ ease: "easeOut", duration: 0.6,  delay:1.8 }} src="/images/logo/right-top.png" className="img-white inherit-display" />
                                                    <motion.img initial={{x:-20, y:-20, opacity:0}} animate={{ x:10, y:-40, opacity:1}} transition={{ ease: "easeOut", duration: 0.6,  delay:1.8 }} src="/images/right-top-purple.png" className="img-orange inherit-display" />
                                                    </a></motion.p>
                                                    <motion.p initial={{x:'10vw'}} animate={{ x:'0'}} transition={{ ease: "easeOut", duration: 0.6,  delay:1 }} className="contact-mid-text text-light-orange text-right purple pr-4-5"><a href="/contact" target="_blank">Contact me</a></motion.p>
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
            <div className="main-wrapper animate-wrapper-mobile  mobile-version p-0 pb-5" >
                <MobileNav/>
                <div className=" br-0" >
                    <Image  src="/images/animate-introduction.webp" alt="property-inspector" width={1199} height={681} />
                </div>
                <Container className="px-m4 mt-4">
                    <Row>
                        <Col md={12}>
                            <h1 className="intro-text orange-text">States</h1> 
                            <p className="para-normal-text text-light-orange mt-3">An XD prototype created to gauge if authors are able to grasp the concept of “linking and unlinking” child states to and from the default state, and intuitively predict the right behaviour.</p>                   
                            <p className="para-normal-text text-light-orange source-sans mt-4">Whether we’re working with XD or other software leveraging components and states, intuitively predicting the behavioural relationship between the default state and other states can be tricky, with any change in properties made to objects in the default state always propagating to …</p>
                            <p className="readMore mt-4 mb-0 text-light-orange"> +   Read more</p>
                        </Col>
                        <Col md={12}>
                            <p className="title-bold mt-5 text-light-orange lh-40">Our objective for the Animate 2019 release was to completely modernise the interface and optimise workflows primarily for novice users, while retaining familiarity and power for advanced users.</p>
                            <div className="pr-aud position-relative mt-5">
                                <p className="f-20 f-bold m-0">Beginners (Primary)</p>
                            </div>
                            <div className="position-relative mt-3">
                                <span className="f-11 f-bold orange-text">OUR INTERVENTION</span> 
                                <p className="f-14 text-light-orange cSrqT" >Clutter free interface &nbsp;&nbsp; + &nbsp;&nbsp; Simplified workflows &nbsp;&nbsp; +<br />    Rich QSPs and tutorials</p>
                            </div>
                            <div className="ad-auth position-relative mt-5">
                                <p className="f-20 f-bold m-0">Advanced authors</p>
                            </div>
                            <div className="flex-1 mt-3">
                                <span className="f-11 f-bold text-light-orange">OUR INTERVENTION</span> 
                                <p className="f-14 text-light-orange cSrqT mb-0" >Identify and retain crucial workflows &nbsp;&nbsp; +<br />    Optimise lengthy workflows</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className=" br-0 mt-80" >
                    <Image  src="/images/animate-introduction.webp" alt="property-inspector" width={1199} height={681} />
                </div>
                <Container className="px-m4 mt-4">
                    <Row>
                        <Col md={12}>
                            <h1 className="f-28 lh-40 f-bold text-light-orange">The new interface.</h1> 
                            <div className="flex-1 mt-4">
                                <span className="f-11 f-bold orange-text">OUR INTERVENTION</span> 
                                <p className="f-14 text-light-orange cSrqT mb-0" >Header bar + App frame <br /> Contextual PI   <br /> Full-screen experience</p>
                            </div>
                        </Col>
                        
                    </Row>
                </Container>
                <div className=" br-0 mt-80" >
                    <Image  src="/images/header-bar.webp" alt="property-inspector" width={1199} height={681} />
                </div>
                <Container className="px-m4">
                    <Row>
                        <Col md={12} className="mt-4">
                            <h1 className="intro-text orange-text">Header bar- Search</h1>                    
                            <p className="para-normal-text source-sans mt-4 text-light-orange">Since animators work on different scenes across files, they end up working on multiple files simultaneously. A preview of the document on hover, could help give an idea of the files they’re working on, for quick access.</p>
                        </Col>
                    </Row>
                </Container>
                <div className=" br-0 mt-80" >
                    <img  src="/images/inventing.png" alt="property-inspector"  className="w-100" />
                </div>
                <Container className="px-m4">
                    <Row>
                        <Col md={12} className="mt-4">                
                            <p className="para-normal-text text-light-orange mb-0">Intervening to build a contextual property inspector with the tool, object, frame and doc tabs to reduce clutter, introduce hierarchy and encourage exploration.</p>
                        </Col>
                    </Row>
                </Container>
                <div className=" br-0 mt-80" >
                    <Image  src="/images/animate-introduction.webp" alt="property-inspector"   width={1199} height={681} />
                </div>
                <Container className="px-m4 mt-4">
                    <Row>
                        <Col md={12} className="text-light-orange">
                            <h1 className="intro-text orange-text">Full- screen experience</h1> 
                            <p className="para-normal-text mt-3">A fully “work-able” full screen that simulates a kind of multi-monitor experience, where authors can turn on and off panels according to which part of their workflow they are in. </p>                   
                            <p className="para-normal-text source-sans mt-4">An animation scene typically zooms and pans its view, shifting objects in and out of the stage to create depth- in this context, having a large scrap area is especially beneficial. Pro animators tend to  use multiple monitors and draw on their primary device, with panels situa…</p>
                            <p className="readMore mt-4 mb-0 "> +   Read more</p>
                        </Col>
                    </Row>
                </Container>
                <div className="contact-wrapper-mobile pt-5 pb-2">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <div className="cWb">
                                        <h1><Link href="/adobe-customer-stories"><a  className="theme-blue">Next project</a></Link></h1>
                                        <p className="mt-3 mb-0  f-medium"><Link href="/adobe-wijk"><a  className="text-light-orange">Previous project</a></Link></p>
                                        <p className="mt-80 mb-0 text-light-orange">Get in touch for a detailed walkthrough of my work.</p>
                                        <h2 className="text-light-orange mb-3 d-flex">Contact me <img  src="/images/logo/right-top.png" className="mob-contact-arrow" /></h2>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </main>
    );
}

export async function getServerSideProps({req, res, resolvedUrl}) {
    const data = parseCookies(req);
    let responseJSON = await requireAuth(data[GUEST_MAGIC_CODE], req);
    if (!responseJSON.success) {
        const destPath = typeof window === 'undefined' ? resolvedUrl : window.location.href;
        return {
            redirect: {
                permanent: false,
                destination: '/auth?destination='+encodeURIComponent(destPath)
            }
        }
    }
    return {
        props: {
            links: responseJSON.pageLinks
        }
    }
}

export default AdobeAnimate;