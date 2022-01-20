import React, { useEffect, useRef, useState } from "react";
import NavSec from "../components/shared/NavSec"
import NavSecDark from "../components/shared/NavSecDark"
import Slider from "react-slick";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, usePresence  } from "framer-motion"
import MobileNavDark from "../components/shared/MobileNavDark"
import { GUEST_MAGIC_CODE } from "../utils/constants"
import { parseCookies } from "../utils/helpers"
import { requireAuth } from '../utils/auth'
import ReactPlayer from 'react-player';

function AdobeCustomerStories({links}) {
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
        if(div){
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
    return (
        <main>
            <div className="main-wrapper web-version">
                
                <Slider {...settings} ref={(slider) => (sliderefd.current = slider)} className="acs-slick ad-slick customerStories">
                    <AnimatePresence exitBeforeEnter={true} >
                        <motion.div key={activeSlide}>
                            <NavSecDark />
                            <div className="container">
                                <motion.span initial={{opacity: 0}} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1,  delay:1 }} className="vert-text-main dark">Introduction</motion.span>
                                <Row className="position-relative">
                                    <Col lg={12}> 
                                        <div className="mt-half-top">
                                        <motion.div initial={{opacity: 0, y:60}} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration:1}}>
                                            <h1 className="f-72 f-bold text-dark">Adobe Customer Success</h1>
                                            <p className="f-14 source-sans">As an experience designer in the Adobe Customer Success team, my role was to create<br/> brand visions supported by customer journey maps, showcasing how Adobe Experience<br/>  Cloud products can help brands address their specific problems and perform better.</p>
                                        </motion.div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    <AnimatePresence exitBeforeEnter={true} >
                        <motion.div key={activeSlide}>
                            <div className="nav-light"><NavSec /></div>
                            <Container> 
                                <motion.span initial={{opacity: 0}} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1,  delay:1 }} className="vert-text-main acs text-white">Hyundai EU</motion.span>
                                <Row>
                                    <Col md={6} lg={7} className="col-xxl-12 col-xxl-10 col-xxl-8 col-xxl-6">
                                        <div>
                                            <span className={`d-flex w100 ${isActive  ? 'w-50' : ''}`} >
                                            <motion.div initial={{opacity: 0, scale:0.8}} animate={{ opacity: 1, scale:1 }} transition={{ ease: "easeOut", duration: 0.6,  delay:0.4 }} className="w-100" >
                                                <ReactPlayer url={links?.adobe_customer_stories?.video_1} id="video_1" className="player" width="1199px" height="681px" allowFullScreen playing={activeSlide === 1} />
                                            </motion.div>
                                                {/* <motion.img initial={{opacity: 0}} animate={{opacity: 1 }} transition={{ ease: "easeOut", duration:1}} src="/images/ltm.png" alt="property-inspector" className="w-100" />  */}
                                            </span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={10} lg={11} md={12}>
                                        <motion.div initial={{opacity: 0, y:-30}} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration:1, delay:1.5}}>
                                            <p className="text-white mt-4 f-18"><span className="font-medium">Hyundai EU wanted a 5 year vision of their responsive website, pre and post-purchase app, and a narrative on how they can enhance their digital presence in the automobile market.</span></p>
                                            <p className="light-grey f-14 lh-22 mb-0  source-sans">
                                                Using AEM, we created an “everything upfront” website, which was responsive across all devices. Visitors could configure their car by choosing
                                                <span className={`d-none ${isActive  ? 'd-inline' : ''}`}>
                                                the variant, color, etc. and book a test drive for the customised car. Using Audience manager and Target, we can track where our customers left off, and provide them with an undisrupted experience, irrespective of which device they are visiting the website on. 
                                                <br/>
                                                Using the pre-purchase app, customers can configure their car, book test drives and stay updated on Hyundai’s events. Post purchasing the vehicle, the Hyundai app stores its registration, license, insurance and other information so that the customer can always access it, securely with a password. Customers also receive notifications on service, discounted products, etc. via the app and can visit the Hyundai  e-commerce store to make purchases.
                                                </span>
                                            </p>
                                            <p className={`text-white font-medium f-16 source-sans bold text-right mr-5 pointer ${isActive  ? 'd-none' : ''}`} onClick={addClass}>+ Read more</p>
                                        </motion.div>
                                    </Col>
                                </Row>
                                <img className={`close-circle d-none ${isActive  ? 'd-flex' : ''}`} src="/images/close-circle.png" onClick={removeClass} />
                            </Container>
                        </motion.div>
                    </AnimatePresence>
                    <AnimatePresence exitBeforeEnter={true} >
                        <motion.div key={activeSlide}>
                            <div className="nav-light"><NavSec /></div>
                            <Container> 
                                <motion.span initial={{opacity: 0}} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1,  delay:1 }} className="vert-text-main acs">Singapore airlines</motion.span>
                                <Row>
                                    <Col md={8} className="col-xxl-12 col-xxl-10 col-xxl-8">
                                        <motion.div initial={{opacity: 0, y:150}} animate={{y:0, opacity: 1 }} transition={{ ease: "easeOut", duration: 1,  delay:0.3 }} className="mt-5 d-flex position-relative moc-wrpper align-items-center">
                                            <motion.div initial={{opacity: 0, scale:0.8}} animate={{ opacity: 1, scale:1 }} transition={{ ease: "easeOut", duration: 0.6,  delay:0.4 }} className="w-100" >
                                                <ReactPlayer url={links?.adobe_customer_stories?.video_2} id="video_2" className="player" width="1199px" height="681px" allowFullScreen playing={activeSlide === 2} />
                                            </motion.div>
                                            {/* <div><img src="/images/mob-moc.png" className="w-100" /> </div>
                                            <div><motion.img initial={{opacity: 1, x:-30}} animate={{x:0, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.2,  delay:1.5 }} src="/images/pre-mob-moc.png" className="w-100" /> </div> */}
                                            <motion.div initial={{opacity: 0, x:-30}} animate={{x:0, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.2,  delay:2}} className="pl-5">
                                                <p className="f-18 font-bold antique">Singapore Airlines</p>
                                                <p className="f-14 antique">A vision outlining the desired pre-<br/>flight and in-flight experiences<br/> while flying Singapore Airlines.</p>
                                            </motion.div>
                                        </motion.div>
                                    </Col>
                                </Row>
                            </Container>
                        </motion.div>
                    </AnimatePresence>
                    <AnimatePresence exitBeforeEnter={true} >
                        <motion.div key={activeSlide}>
                            <div className="nav-light"><NavSec /></div>
                            <div className="container">
                                <motion.span initial={{opacity: 0}} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1,  delay:1 }} className="vert-text-main light-grey">Mangalore Smart City</motion.span>
                                <Row>
                                    <Col md={6} className="col-xxl-10 col-xxl-8">
                                        <div className={`position-relative w100 ${isActive  ? 'w-50' : ''}`}>
                                            {/* <motion.img  initial={{opacity: 0, scale:0.8}} animate={{ scale:1, opacity: 1 }} transition={{ ease: "easeOut", duration:1}} src="/images/ss-moc.webp" className="w-100" />
                                            <motion.img  initial={{opacity: 0, scale:0.8}} animate={{ scale:1, opacity: 1 }} transition={{ ease: "easeOut", duration:1, delay:0.5}} src="/images/ss-mobile-moc.svg" className={`position-absolute ss-mob ${isActive  ? 'trans-small' : ''}`}  style={{right:-60, bottom: -15}} /> */}
                                            <motion.div initial={{opacity: 0, scale:0.8}} animate={{ opacity: 1, scale:1 }} transition={{ ease: "easeOut", duration: 0.6,  delay:0.4 }} className="w-100" >
                                                <ReactPlayer url={links?.adobe_customer_stories?.video_3} id="video_3" className="player" width="1199px" height="681px" allowFullScreen playing={activeSlide === 3} />
                                            </motion.div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={10} lg={11} md={12}>
                                        <motion.div initial={{opacity: 0, y:-30}} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration:1, delay:1.5}}>
                                            <p className="light-grey mt-4 f-18"><span className="font-medium">As part of an initiative to introduce a citizens’ portal in Mangalore city, the adobe team created a journey to articulate the capabilities and possibilities of this portal. </span></p>
                                            <p className="light-grey  f-14 lh-22 mb-0  source-sans" >
                                            Using the SmartCity portal, denizens can perform common tasks like paying bills, recharging phones, travel cards, etc Apart from municipality 
                                                <span className={`d-none ${isActive  ? 'd-inline' : ''}`}>     announcements, they can even gather local insight and view other user generated content about the education, tourism and other relevant events in and around the city. The SmartCity app can be used to update address details, perform registration protocols, and even raise issues that might require attention from the city’s municipality. 
                                                </span>
                                            </p>
                                            <p className={`text-white font-medium f-16 source-sans bold text-right mr-5 pointer ${isActive  ? 'd-none' : ''}`} onClick={addClass}>+ Read more</p>
                                        </motion.div>
                                    </Col>
                                </Row>
                                <img className={`close-circle d-none ${isActive  ? 'd-flex' : ''}`} src="/images/close-circle.png" onClick={removeClass} />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    <AnimatePresence exitBeforeEnter={true} >
                        <motion.div key={activeSlide}>
                        <div className="nav-light"><NavSec /></div>
                        <div className="container">
                            <Row>
                                <Col lg={12}>
                                    <motion.div className="position-relative mt-5" >
                                        <div className="contact-wrapper bg-transparent opacityOne position-absolute z--0">
                                            <div className="d-flex align-items-end justify-content-between">
                                                <motion.p initial={{x:'-15vw'}} animate={{ x:'0'}} transition={{ ease: "easeOut", duration: 0.6,  delay:1 }} className="pv-proj mb-4 theme-blue"><motion.img initial={{opacity:'0', x:40}} animate={{ opacity:'1', x:0}} transition={{ ease: "easeOut", duration: 1,  delay:1.8 }} src="/images/leftArrowXs.svg" height="26" /> Previous project</motion.p>
                                                <motion.h1 initial={{x:'15vw'}} animate={{ x:'0'}} transition={{ ease: "easeOut", duration: 0.6,  delay:1 }} className=" theme-blue contact-heading-2 mt-2 d-flex align-items-center"> Next project <motion.img initial={{opacity:'0'}} animate={{ opacity:'1'}} transition={{ ease: "easeOut", duration: 1,  delay:1.8 }} src="/images/logo/right-arrow.png" className="ml-3" /></motion.h1>
                                            </div>
                                            <motion.div className="d-flex  flex-column">
                                                <motion.p  initial={{x:'-15vw'}} animate={{ x:'0'}} transition={{ ease: "easeOut", duration: 0.6,  delay:1 }} className="contact-light-text theme-blue d-flex align-items-center no-wrap">Get in touch for a detailed walkthrough of my work. <motion.img initial={{x:-20, y:-20, opacity:0}} animate={{ x:10, y:-40, opacity:1}} transition={{ ease: "easeOut", duration: 0.6,  delay:1.8 }} src="/images/logo/right-top.png" /></motion.p>
                                                <motion.p initial={{x:'10vw'}} animate={{ x:'0'}} transition={{ ease: "easeOut", duration: 0.6,  delay:1 }} className="contact-mid-text theme-blue text-right mr-4-5">Contact me</motion.p>
                                            </motion.div>
                                        </div>
                                        <div className="contact-wrapper bg-transparent border-white opacity-1 position-relative z-9">
                                            <div className="d-flex align-items-end justify-content-between">
                                                <motion.p initial={{x:'-15vw'}} animate={{ x:'0'}} transition={{ ease: "easeOut", duration: 0.6,  delay:1 }} className="pv-proj theme-blue mb-4"><Link href="/adobe-animate"><a className="theme-blue d-flex align-items-center"><motion.img initial={{opacity:'0', x:40}} animate={{ opacity:'1', x:0}} transition={{ ease: "easeOut", duration: 1,  delay:1.8 }} src="/images/leftArrowXs.svg" height="26" /> Previous project</a></Link></motion.p>
                                                <motion.h1 initial={{x:'15vw'}} animate={{ x:'0'}} transition={{ ease: "easeOut", duration: 0.6,  delay:1 }} className="contact-heading-2 mt-2 d-flex align-items-center"><Link href="/other-projects"><a className="theme-blue d-flex align-items-center"> Next project <motion.img initial={{opacity:'0'}} animate={{ opacity:'1'}} transition={{ ease: "easeOut", duration: 1,  delay:1.8 }} src="/images/logo/right-arrow.png" className="ml-3" /></a></Link></motion.h1>
                                            </div>
                                            <motion.div className="d-flex flex-column hoverText">
                                            <motion.p initial={{x:'-15vw'}} animate={{ x:'0'}} transition={{ ease: "easeOut", duration: 0.6,  delay:1 }} className="contact-light-text text-white  d-flex align-items-center no-wrap">
                                                <a href="/contact" target="_blank">Get in touch for a detailed walkthrough of my work. 
                                                    <motion.img initial={{x:-20, y:-20, opacity:0}} animate={{ x:10, y:-40, opacity:1}} transition={{ ease: "easeOut", duration: 0.6,  delay:1.8 }} src="/images/logo/right-top.png" className="img-white inherit-display" />
                                                    <motion.img initial={{x:-20, y:-20, opacity:0}} animate={{ x:10, y:-40, opacity:1}} transition={{ ease: "easeOut", duration: 0.6,  delay:1.8 }} src="/images/right-top-purple.png" className="img-orange inherit-display" />
                                                    </a></motion.p>
                                                <motion.p initial={{x:'10vw'}} animate={{ x:'0'}} transition={{ ease: "easeOut", duration: 0.6,  delay:1 }} className="contact-mid-text text-white text-right mr-4-5 purple"><a href="/contact" target="_blank">Contact me</a></motion.p>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </Col>
                            </Row>
                        </div>
                        </motion.div>
                    </AnimatePresence>
                </Slider>
            </div>
            <div className="main-wrapper acs-nav mobile-version p-0">
                <MobileNavDark />
                <div className="acs-bg">
                    <Container className="px-m4">
                        <Row>
                            <Col md={12} className="mt-4">
                                <h1 className="f-32 f-bold lh-40">Adobe customer success</h1> 
                                <p className="para-normal-text mt-3">As an experience designer in the Adobe Customer Success team, my role was to create brand visions supported by customer journey maps, showcasing how Adobe Experience Cloud products can help brands address their specific problems and perform better.</p>                   
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="acs-blue-pattern">
                    <div className=" br-0" >
                        <img  src="/images/hyndai-mob.png" alt="property-inspector" className="acs-banner  mt-80" />     
                    </div>
                    <Container className="px-m4">
                        <Row>
                            <Col md={12} className="mt-4 text-white">
                                <h1 className="intro-text mt-3 ">Hyundai EU- Vision</h1> 
                                <p className="para-normal-text mt-3">Hyundai EU wanted a 5 year vision of their responsive website, pre and post-purchase app, and a narrative on how they can enhance their digital presence in the automobile market.</p>                   
                                <p className="para-normal-text source-sans mt-4">Using AEM, we created an “everything upfront” website, which was responsive across all devices. Visitors could configure their car by choosing the variant, color, etc. and book a test drive for the</p>
                                <p className="readMore mt-4 mb-5"> +   Read more</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="acs-in-flight">
                    <Container className="px-m4">
                        <Row>
                            <Col md={12} className="mt-5 text-white">
                                <img  src="/images/in-flight-moc.png" alt="property-inspector" className="w-100" /> 
                                <h1 className="intro-text mt-3 ">Singapore Airlines</h1> 
                                <p className="para-normal-text mt-3 mb-5">A vision outlining the desired pre-flight and in-flight experiences while flying Singapore Airlines.</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="acs-smart-city">
                    <div className=" br-0" >
                        <img  src="/images/smart-city-moc.png" alt="property-inspector" className="smart-city-moc mt-80" />    
                    </div>
                    <Container className="px-m4">
                        <Row>
                            <Col md={12} className="mt-3 text-white">
                                <h1 className="intro-text">Mangalore Smart city</h1> 
                                <p className="para-normal-text mt-3">As part of an initiative to introduce a citizens’ portal in Mangalore city, the adobe team created a journey to articulate the capabilities and possibilities of this portal. </p>                   
                                <p className="para-normal-text source-sans mt-4">Using the SmartCity portal, denizens can perform common tasks like paying bills, recharging phones, travel cards, etc Apart from municipality announcements, they can even gather local insight and view other user generated content about the education, tourism and other relevant</p>
                                <p className="readMore mt-4 mb-5"> +   Read more</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="acs-smart-city py-5">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <div className="cWb " style={{background:'#000918'}}>
                                    <h1><Link href="/other-projects"><a  className="theme-blue">Next project</a></Link></h1>
                                    <p className="mt-3 mb-0  f-medium"><Link href="/adobe-customer-stories"><a  className="text-white">Previous project</a></Link></p>
                                    <p className="mt-80 mb-0 text-white">Get in touch for a detailed walkthrough of my work.</p>
                                    <h2 className="text-white mb-3 d-flex"><a href="/contact" target="_blank">Contact me <img  src="/images/logo/right-top.png" className="mob-contact-arrow" /></a></h2>
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

export default AdobeCustomerStories;