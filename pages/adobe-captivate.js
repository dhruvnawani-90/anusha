import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, usePresence } from "framer-motion"
import NavSecDark from "../components/shared/NavSecDark"
import Link from 'next/link'
import Slider from "react-slick";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'next/image'
import { useRouter } from 'next/router'
import MobileNavDark from "../components/shared/MobileNavDark"
import { useInView } from 'react-intersection-observer';
import ReactPlayer from 'react-player';
import Modal from 'react-bootstrap/Modal'
import { GUEST_MAGIC_CODE } from "../utils/constants"
import { parseCookies } from "../utils/helpers"
import { requireAuth } from '../utils/auth'
import Contact from "../components/contact";
import Authentication from "../components/auth";

function AdobeCaptivate({ links, authenticated }) {
    const router = useRouter();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [tempSlide, setTempSlide] = useState(false);
    const getSlideValue = () => {
        const path = router.asPath;
        var url = new URL(`https://xyz.com/${path}`);
		var slide = url.searchParams.get("slide");
		return slide ? slide : 0;
    }
    const [activeSlide, setactiveSlide] = useState(getSlideValue());
    const sliderefd = useRef();
    function removeParam(parameter) {
		var url=document.location.href;
		var urlparts= url.split('?');
		if (urlparts.length>=2) {
			var urlBase=urlparts.shift(); 
			var queryString=urlparts.join("?"); 
			
			var prefix = encodeURIComponent(parameter)+'=';
			var pars = queryString.split(/[&;]/g);
			for (var i= pars.length; i-->0;)               
				if (pars[i].lastIndexOf(prefix, 0)!==-1)   
					pars.splice(i, 1);
			url = urlBase+'?'+pars.join('&');
			window.history.pushState('',document.title,url); 
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
        beforeChange: (current, next) => setactiveSlide(next),
        afterChange: (current) => {
            setCurrentSlide(current)
        }
    };
    useEffect(() => {
        setIsPlaying(currentSlide == 3);
    }, [currentSlide]);
    useEffect(() => {
        console.log({ activeSlide });
    }, [activeSlide]);
    useEffect(() => {
        setIsPlaying(isPlaying);
    }, [isPlaying]);
    const handleContextMenu = useCallback((event) => {
        event.preventDefault();
    }, []);
    const [isPresent, safeToRemove] = usePresence()

    useEffect(() => {
        !isPresent && setTimeout(safeToRemove, 1000)
    }, [isPresent])

    let scrollCount = 0
    const changeSlide = (y) => {
        const div = sliderefd.current;
        if (div) {
            if (y > 0) {
                div.slickPrev();
            } else {
                div.slickNext();
            }
        }
    };
    const [isActive, setActive] = useState(false);
    const addClass = () => {
        setActive(true);
    };
    const removeClass = () => {
        setActive(false);
    };
    useEffect(() => {
        window.addEventListener("wheel", (e) => {

            changeSlide(e.wheelDelta);
        });
    }, []);

    const [show, setShow] = useState(false);
    const [slide4ModalVideoPlaying, setSlide4ModalVideoPlaying] = useState(false);

    const handleClose = (video_id = null) => {
        setShow(false);
        if (video_id == 'slide_4_modal') {
            setSlide4ModalVideoPlaying(false);
            setIsPlaying(true);
        }
    }
    const handleShow = (video_id = null) => {
        setShow(true);
        if (video_id == 'slide_4_modal') {
            setSlide4ModalVideoPlaying(true);
            setIsPlaying(false);
        }
    };

    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [show3, setShow3] = useState(false);

    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);

    const [show4, setShow4] = useState(false);

    const handleClose4 = () => setShow4(false);
    const handleShow4 = () => setShow4(true);


    const [show5, setShow5] = useState(false);

    const handleClose5 = () => setShow5(false);
    const handleShow5 = () => setShow5(true);

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
    useEffect(() => {
        if (show3) {
            setTempSlide(activeSlide);
            setactiveSlide(false);
        } else {
            setactiveSlide(tempSlide);
            setTempSlide(false);
        }
    }, [show3]);
    useEffect(() => {
        if (show4) {
            setTempSlide(activeSlide);
            setactiveSlide(false);
        } else {
            setactiveSlide(tempSlide);
            setTempSlide(false);
        }
    }, [show4]);
    useEffect(() => {
        if (show5) {
            setTempSlide(activeSlide);
            setactiveSlide(false);
        } else {
            setactiveSlide(tempSlide);
            setTempSlide(false);
        }
    }, [show5]);
    const [isContactClicked, setisContactClicked] = useState(false);
    useEffect(() => {
        console.log({ isContactClicked });
    }, [isContactClicked]);
    const [isAuthenticated, setisAuthenticated] = useState(authenticated);
    const [clickedRoute, setclickedRoute] = useState(false);
    return (
        <>
            <main>
                <div className="main-wrapper white web-version captivate" >
                    <Slider {...settings} ref={(slider) => (sliderefd.current = slider)} className="ad-slick captivate-slider adobe-captivate">
                        <AnimatePresence exitBeforeEnter={true} >
                            <motion.div key={activeSlide}>
                                <NavSecDark setclickedRoute={setclickedRoute} setisAuthenticated={setisAuthenticated} setisContactClicked={setisContactClicked} destination={`destination=/adobe-captivate?slide=${activeSlide}`} />
                                <Container>
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 0.4 }} className="vert-text-main mid-black">Introduction</motion.span>
                                    <Row>
                                        <Col md={6} className="col-xxl-12 col-xxl-10 col-xxl-8 col-xxl-6">
                                            <span className={`d-flex w100 ${isActive ? 'w-50' : ''}`} >
                                                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 0.4 }} className="w-100 origin" >
                                                    <ReactPlayer url={links?.adobe_captive?.video_10} id="video_10" className="player" width="1199px" height="681px" allowFullScreen playing={activeSlide === 0} />
                                                </motion.div>
                                                <div className="hammer-icon-container" onClick={handleShow5}>
                                                    <img src="/images/hammer.svg" className="hammer-icon" />
                                                    <span className="watch-impletation">Watch implementation</span>
                                                </div>
                                            </span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={11} md={12}>
                                            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 0.8 }}>
                                                <p className="mt-4 mid-black font-medium">Adobe Captivate is an e-learning content authoring tool used by instructional designers to create compliance course material, software simulations and immersive VR experiences.</p>
                                                <p className="mid-black sub-text-light">The video above was created for and presented at the Adobe e-learning Summit at Las Vegas in 2019, where the Captivate team shared their vision for the new, modern version of Captivate Next, to be launched in 2021</p>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                </Container>
                            </motion.div>
                        </AnimatePresence>
                        <AnimatePresence exitBeforeEnter={true} >
                            <motion.div key={activeSlide}>
                                <NavSecDark setclickedRoute={setclickedRoute} setisAuthenticated={setisAuthenticated} setisContactClicked={setisContactClicked} destination={`destination=/adobe-captivate?slide=${activeSlide}`} />
                                <Container>
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5, delay: 0.3 }} style={{ top: '33vh' }} className="vert-text-main mid-black mid-black">The Captivate story</motion.span>
                                    <Row>
                                        <Col lg={12}>
                                            <motion.div style={{ marginTop: '16vh' }} initial={{ opacity: 0, y: 80 }} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6 }} className="mid-black captivate-wrapper">
                                                <span className="f-18"><span className="font-medium ">ROLE</span> &nbsp; | &nbsp; Project Lead</span>
                                                <span className="ml-5 f-18"><span className="font-medium">YEARS</span> &nbsp; | &nbsp; 2019 - Present</span>
                                                <p className="mt-5 captivate-para">Captivate is a powerful tool that hasn't undergone a design revamp in a long time. As a result, workflows were lengthy and complex, and the UI was terribly outdated. After scoping all our features(phew!), we conceded to:</p>
                                                <span className="mt-5 d-flex">
                                                    <span><span className="font-medium f-20">Modernize core workflows</span><br /><span className="f-12">REDIFINE UX + UI + COMPLETE CODE CHANGE</span></span>
                                                    <span className="font-medium d-flex mx-5">+</span>
                                                    <span><span className="font-medium f-20">Reskin other workflows</span><br /><span className="f-12">PRIMARY UI + MINIMAL UI + CODE CHANGE</span></span>
                                                </span>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                </Container>
                            </motion.div>
                        </AnimatePresence>
                        <AnimatePresence exitBeforeEnter={true} >
                            <motion.div key={activeSlide}>
                                <NavSecDark setclickedRoute={setclickedRoute} setisAuthenticated={setisAuthenticated} setisContactClicked={setisContactClicked} destination={`destination=/adobe-captivate?slide=${activeSlide}`} />
                                <Container>
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5, delay: 0.3 }} className="vert-text-main mid-black" style={{ top: '33vh' }}>The Captivate story</motion.span>
                                    <Row>
                                        <Col lg={12}>
                                            <motion.div initial={{ opacity: 0, y: '60px' }} animate={{ opacity: 1, y: -60 }} transition={{ ease: "easeOut", duration: 0.6, delay: 0 }} className="mid-black captivate-wrapper pt-5">
                                                <motion.div className="mb-5" initial={{ opacity: 0, y: 0 }} animate={{ opacity: 0, y: -60 }} transition={{ ease: "easeOut", duration: 0.6, delay: 0 }}>
                                                    <span className="f-18"><span className="font-medium ">ROLE</span> &nbsp; | &nbsp; Project Lead</span>
                                                    <span className="ml-5 f-18"><span className="font-medium">YEARS</span> &nbsp; | &nbsp; 2019 - Present</span>
                                                </motion.div>
                                                <motion.div initial={{ y: 0 }} animate={{ y: -40 }} transition={{ ease: "easeOut", duration: 0.6, delay: 0 }}>
                                                    <p className="captivate-para">Captivate is a powerful tool that hasn't undergone a design revamp in a long time. As a result, workflows were lengthy and complex, and the UI was terribly outdated. After scoping all our features(phew!), we conceded to:</p>
                                                    <span className="mt-5 d-flex">
                                                        <span><span className="font-medium f-20">Modernize core workflows</span><br /><span className="f-12">REDIFINE UX + UI + COMPLETE CODE CHANGE</span></span>
                                                        <span className="font-medium d-flex mx-5">+</span>
                                                        <span><span className="font-medium f-20">Reskin other workflows</span><br /><span className="f-12">PRIMARY UI + MINIMAL UI + CODE CHANGE</span></span>
                                                    </span>
                                                </motion.div>
                                            </motion.div>
                                            <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -100 }} transition={{ ease: "easeOut", duration: 0.6, delay: 0.4 }} className="grid-2">
                                                <div>
                                                    <motion.img src="/images/mammals1.svg" initial={{ opacity: 0, y: '100' }} animate={{ opacity: 1, y: 0 }} transition={{ ease: "easeOut", duration: 0.6, delay: 0.4 }} className="w-100 mb-3 position-relative z-9" />
                                                    <motion.span initial={{ opacity: 0, y: -30 }} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }} className="mid-black d-block"><span className="font-medium f-20">Old interface</span><br /><span className="f-12">Outdated UI + Complex, lengthy workflows + <br /> Steep learning curve + Discoverability, clutter</span></motion.span>
                                                </div>
                                                <div>
                                                    <motion.img src="/images/mammals2.svg" initial={{ opacity: 0, x: '-30%' }} animate={{ x: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 0.8 }} className="w-100 mb-3 origin position-relative z-1" />
                                                    <motion.span initial={{ opacity: 0, y: -30 }} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }} className="mid-black d-block"><span className="font-medium f-20">New interface</span><br /><span className="f-12">Left to right philosophy (tool from left, draw on slide, edit on right) + Non - undockable panels + Contextual propety inspector</span></motion.span>
                                                </div>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                </Container>
                            </motion.div>
                        </AnimatePresence>
                        <AnimatePresence exitBeforeEnter={true} >
                            <motion.div key={activeSlide}>
                                <NavSecDark setclickedRoute={setclickedRoute} setisAuthenticated={setisAuthenticated} setisContactClicked={setisContactClicked} destination={`destination=/adobe-captivate?slide=${activeSlide}`} />
                                <Container className="video-container">
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }} className="vert-text-main mid-black">States</motion.span>
                                    <Row>
                                        <Col md={6} className="col-xxl-12 col-xxl-10 col-xxl-8 col-xxl-6">
                                            <span className={`w100 ${isActive ? 'video-width' : ''}`}>
                                                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }} className="origin" id="vidPlayer">
                                                    <ReactPlayer url={links?.adobe_captive?.video_1} id="video_1" className="player" width="1199px" height="681px" allowFullScreen playing={activeSlide === 3} onContextMenu={handleContextMenu} playIcon={<div>Icon</div>} />
                                                </motion.div>
                                                <div className="hammer-icon-container" onClick={() => handleShow('slide_4_modal')}>
                                                    <img src="/images/hammer.svg" className="hammer-icon" />
                                                    <span className="watch-impletation">Watch implementation</span>
                                                </div>
                                            </span>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={10} md={12}>
                                            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }}>
                                                <p className="mid-black mt-3 mb-2 f-18">An XD protype created to <span className="font-medium">gauge if authors are able to grasp the concept of "linking and<br />  unlinking" child states to and from the default state,</span> and intuitively predict the right behaviour.</p>
                                                <p className="mid-black f-14 lh-22 mb-1 source-sans description-text" >
                                                    Whether we’re working with XD or other software leveraging components and states, intuitively predicting the behavioural relationship &nbsp;
                                                    <span className={`d-none ${isActive ? 'd-inline' : ''}`}>
                                                        between the default state and other states can be tricky, with any change in properties made to objects in the default state always propagating to the other states, unless overridden. While this behaviour could benefit authors in most cases, they struggle to make changes to the default state independently. Further, the absence of some visual depiction implies that the author has to navigate through the states to view their appearance.
                                                    <br /><br />
                                                    Our solution is to introduce two modes- <span className="font-medium">the “linked” mode, where any property alteration in the default state will propagate to other states (unless the concerned property has been overridden in the child state), and the “unlinked” mode, where modifications are native to the default state, and will not propagate even upon linking. </span>Authors can shift between the two modes using a button on a fly-out panel that contains thumbnails of all the states of the selected object.
                                                    </span>
                                                </p>
                                                <p className={`mid-black mr-lg-5 pr-lg-5 font-medium f-16 source-sans bold text-right pointer ${isActive ? 'd-none' : ''}`} onClick={addClass}>+ Read more</p>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                    <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.2, delay: 1 }} className={`close-circle d-none ${isActive ? 'd-flex' : ''}`} src="/images/close-circle.png" onClick={removeClass} />
                                </Container>
                            </motion.div>
                        </AnimatePresence>
                        <AnimatePresence exitBeforeEnter={true} >
                            <motion.div key={activeSlide}>
                                <NavSecDark setclickedRoute={setclickedRoute} setisAuthenticated={setisAuthenticated} setisContactClicked={setisContactClicked} destination={`destination=/adobe-captivate?slide=${activeSlide}`} />
                                <Container>
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }} className="vert-text-main mid-black">Interactions, Conditions and Variables</motion.span>
                                    <Row>
                                        <Col md={6} className="col-xxl-12 col-xxl-10 col-xxl-8 col-xxl-6">
                                            <span className={`d-flex w100 ${isActive ? 'w-50' : ''}`} >
                                                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 0.4 }} className="w-100 origin" >
                                                    <ReactPlayer url={links?.adobe_captive?.video_2} id="video_2" className="player" width="1199px" height="681px" allowFullScreen playing={activeSlide === 4} />
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
                                            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }}>
                                                <p className="mid-black mt-4 f-18 mb-2">Xd prototype to <span className="font-medium">gather engineering’s buy-in to build two new triggers </span> appearing in an application for the first time- objects clicked and states viewed. </p>
                                                <p className="mid-black f-14 lh-22 mb-1 source-sans description-text" >
                                                    Interactions are the building blocks of most engaging content, and we have carefully curated a set of very specialised triggers (which are also &nbsp;
                                                    <span className={`d-none ${isActive ? 'd-inline' : ''}`}>
                                                        parameters for conditions), apart from the regular ones like hover, click, etc. The first of these is a trigger <span className="font-medium">called “custom states viewed”, which triggers actions as soon as all or a sub-set of the states of an object have been viewed by the learner. </span> This trigger is especially handy while trying to navigate through content in a systematic (maybe persuasive) manner. The second of the triggers is <span className="font-medium">“objects clicked”, which triggers actions as soon as certain objects have been clicked;</span> this comes in handy while trying to enable and disable clickable objects, depending on what has been interacted with on the slide. The 2 triggers together form a significant force, and discourage the authoring of complex conditions to perform basic actions. After scrutinising a plethora of very diverse e-learning content, we identified <span className="font-medium">3 outcomes our authors were inclined to consistently achieve using conditions and variables- record if states are viewed, validate and display what a learner might input, and otherwise adjust variables</span> to create immersive material like games, etc.
                                                    By uncovering parameters like “states visited” and “content of element” and displaying them upfront, we eliminate the need for authoring conditions for many scenarios, and have optimised the click count significantly.
                                                    </span>
                                                </p>
                                                <p className={`mid-black mr-lg-5 pr-lg-5 font-medium f-16 source-sans bold text-right pointer ${isActive ? 'd-none' : ''}`} onClick={addClass}>+ Read more</p>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                    <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.2, delay: 1 }} className={`close-circle d-none ${isActive ? 'd-flex' : ''}`} src="/images/close-circle.png" onClick={removeClass} />
                                </Container>
                            </motion.div>
                        </AnimatePresence>
                        <AnimatePresence exitBeforeEnter={true} >
                            <motion.div key={activeSlide}>
                                <NavSecDark setclickedRoute={setclickedRoute} setisAuthenticated={setisAuthenticated} setisContactClicked={setisContactClicked} destination={`destination=/adobe-captivate?slide=${activeSlide}`} />
                                <Container>
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }} className="vert-text-main mid-black">Animations</motion.span>
                                    <Row>
                                        <Col md={6} className="col-xxl-12 col-xxl-10 col-xxl-8 col-xxl-6">
                                            <span className={`d-flex w100 ${isActive ? 'w-50' : ''}`} >
                                                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 0.4 }} className="w-100 origin" >
                                                    {/* <Image src="/images/mammals.webp" width="1200" height="681" /> */}
                                                    <ReactPlayer url={links?.adobe_captive?.video_3} id="video_3" className="player" width="1199px" height="681px" allowFullScreen playing={activeSlide === 5} />
                                                </motion.div>
                                                <div className="hammer-icon-container" onClick={handleShow3}>
                                                    <img src="/images/hammer.svg" className="hammer-icon" />
                                                    <span className="watch-impletation">Watch implementation</span>
                                                </div>
                                            </span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={10} md={12}>
                                            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }}>
                                                <p className="mid-black mt-4 mb-2 f-18">Xd prototype created to <span className="font-medium"> deliver high fidelity design specs to engineering </span>  early to ensure all<br /> crucial use cases are addressed effectively so complex content can be authored quickly. </p>
                                                <p className="mid-black f-14 lh-22 mb-1 source-sans description-text" >
                                                    While authoring quality e-learning content, animations are primarily used to display and emphasise objects in accordance with the author’s
                                                    <span className={`d-none ${isActive ? 'd-inline' : ''}`}>
                                                        narration of the slide. We gathered together with our engineers, identified Animista as the appropriate library for our authors, and curated a list of animation effects. The purpose of the prototype above was to <span className="font-medium">identify and articulate most possible animation effects that are used to create engaging content and ensure we have provided for all of them appropriately. </span>
                                                        <br /><br />
                                                    (This prototype was circulated amongst Alpha volunteers to gather their feedback and give them a glimpse of the new effects within the new Captivate 2021)
                                                    </span>
                                                </p>
                                                <p className={`mid-black mr-lg-5 pr-lg-5 font-medium f-16 source-sans bold text-right pointer ${isActive ? 'd-none' : ''}`} onClick={addClass}>+ Read more</p>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                    <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.2, delay: 1 }} className={`close-circle d-none ${isActive ? 'd-flex' : ''}`} src="/images/close-circle.png" onClick={removeClass} />
                                </Container>
                            </motion.div>
                        </AnimatePresence>
                        <AnimatePresence exitBeforeEnter={true} >
                            <motion.div key={activeSlide}>
                                <NavSecDark setclickedRoute={setclickedRoute} setisAuthenticated={setisAuthenticated} setisContactClicked={setisContactClicked} destination={`destination=/adobe-captivate?slide=${activeSlide}`} />
                                <Container>
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }} className="vert-text-main mid-black">State animations</motion.span>
                                    <Row>
                                        <Col md={6} className="col-xxl-12 col-xxl-10 col-xxl-8 col-xxl-6">
                                            <span className={`d-flex w100 ${isActive ? 'w-50' : ''}`} >
                                                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 0.4 }} className="w-100 origin" >
                                                    {/* <Image src="/images/mammals.webp" width="1200" height="681" /> */}
                                                    <ReactPlayer url={links?.adobe_captive?.video_4} id="video_4" className="player" width="1199px" height="681px" allowFullScreen playing={activeSlide === 6} />
                                                </motion.div>
                                                <div className="hammer-icon-container" onClick={handleShow4}>
                                                    <img src="/images/hammer.svg" className="hammer-icon" />
                                                    <span className="watch-impletation">Watch implementation</span>
                                                </div>
                                            </span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={10} lg={11} md={12}>
                                            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }}>
                                                <p className="mid-black mt-4 mb-2 f-18">Xd prototype created to<span className="font-medium"> validate the need for a provision to animate disparate objects </span>   that are present across the different states of a single object.</p>
                                                <p className="mid-black f-14 lh-22 mb-1 source-sans description-text" >
                                                    When we’re working with similar content (and hence similar objects) across the states which differ mostly in their CSS properties, Captivate can “auto-animate” or seamlessly transform the object from one state to another. However, if the author has diverse content across <span className={`mid-black  font-medium f-16 source-sans bold text-right pointer ${isActive ? 'd-none' : ''}`} onClick={addClass}>+ Read more</span>
                                                    <span className={`d-none ${isActive ? 'd-inline' : ''}`}>
                                                        the states (like in the example above), we would be left with a messy seamless transform if we animate SVG paths insensibly, and no animation if we don’t provide an option to set other animations, rendering the content dull. <span className="font-medium">This necessitated a state animation panel where authors can quickly apply effects to objects within different states and preview how they would load.</span> These panel workflows are designed especially keeping advanced authors in mind, so we decided to hide it and invoke it only on double click of the multi-state objects presence on the regular timeline. Within the state timeline, there are two modes- <span className="font-medium">the working mode and the summary mode. </span>Authors can also perform some custom operations like aligning objects to animate at the same time, or distribute them across the timeline to animate in request intervals. The maximum time for an object to appear, or disappear is 3 seconds, but emphasis effects can be on an infinite loop.
                                                    </span>
                                                </p>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                    <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.2, delay: 1 }} className={`close-circle d-none ${isActive ? 'd-flex' : ''}`} src="/images/close-circle.png" onClick={removeClass} />
                                </Container>
                            </motion.div>
                        </AnimatePresence>
                        <AnimatePresence exitBeforeEnter={true} >
                            <motion.div key={activeSlide}>
                                <NavSecDark setclickedRoute={setclickedRoute} setisAuthenticated={setisAuthenticated} setisContactClicked={setisContactClicked} destination={`destination=/adobe-captivate?slide=${activeSlide}`} />
                                <Container>
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }} className="vert-text-main mid-black">Components and widgets</motion.span>
                                    <Row>
                                        <Col md={6} className="col-xxl-12 col-xxl-10 col-xxl-8 col-xxl-6">
                                            <span className={`d-flex w100 ${isActive ? 'w-50' : ''}`} >
                                                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 0.4 }} className="w-100 origin" >
                                                    {/* <Image src="/images/mammals.webp" width="1200" height="681" /> */}
                                                    <ReactPlayer url={links?.adobe_captive?.video_5} id="video_5" className="player" width="1199px" height="681px" allowFullScreen playing={activeSlide === 7} />
                                                </motion.div>
                                            </span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={10} md={12}>
                                            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }}>
                                                <p className="mid-black mb-2 mt-4 f-18">Xd prototype created to<span className="font-medium"> envision how simple components </span> like buttons, checkboxes, etc. and complex widgets like tabs, hotspots, flip cards, etc. can be customised to suit the content.</p>
                                                <p className="mid-black f-14 lh-22 mb-1 source-sans description-text" >
                                                    Our vision for functional multi-state objects like buttons, radio buttons, etc. is to make them <span className="font-medium">ready-to-use, but easy-to-</span><span className={`d-none ${isActive ? 'd-inline' : ''}`}>
                                                        <span className="font-medium">customise.</span> Component states and interactions like hover, click, visited, etc. are already configured into the component; authors can enable or disable these states and alter their appearance properties.
                                                <span className="font-medium"> A rich content-oriented preset experience ensures most variations are available upfront </span>for the author to choose from- for example, radio button presets would have options with only text, text and image, or only image. Further, authors can toggle text, image, icon, etc. on and off depending on their requirement. Since canvas controls don’t apply to components, authors can choose from a curated set of transform options like size (S, M, L), spacing (default, compact, comfortable) and magnification. This approach dictates that <span className="font-medium">all the diverse common controls like input fields, dropdowns, etc. displayed on the slide look consistent.</span> The same theory extends itself to even smarter widgets like tabs, which are essentially a collection of components and content areas; authors can shift their focus between the tab buttons and content area. While edits apply to navigation controls at a macro level, content areas can be completely customised to suit the content. Again, a rich preset experience for each widget variation ensures efficiency while choosing the appropriate layout.
                                                </span>
                                                </p>
                                                <p className={`mid-black mr-lg-5 pr-lg-5 font-medium f-16 source-sans bold text-right pointer ${isActive ? 'd-none' : ''}`} onClick={addClass}>+ Read more</p>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                    <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.2, delay: 1 }} className={`close-circle d-none ${isActive ? 'd-flex' : ''}`} src="/images/close-circle.png" onClick={removeClass} />
                                </Container>
                            </motion.div>
                        </AnimatePresence>
                        <AnimatePresence exitBeforeEnter={true} >
                            <motion.div key={activeSlide} className="w-100">
                                <div className="contact-sec-nav"><NavSecDark setclickedRoute={setclickedRoute} setisAuthenticated={setisAuthenticated} setisContactClicked={setisContactClicked} destination={`destination=/adobe-captivate?slide=${activeSlide}`} /></div>
                                <Container>
                                    <Row>
                                        <Col lg={12} className="mt-4">
                                            <motion.div className="position-relative" >
                                                <div className="contact-wrapper opacityOne position-absolute z--0">
                                                    <div>
                                                        <motion.h1 initial={{ x: '40vw' }} animate={{ x: '0' }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }} className=" text-dark contact-heading-2 mt-2 d-flex align-items-center"> Next project <motion.img initial={{ x: -30, opacity: 0 }} animate={{ x: '0', opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1.5 }} src="/images/rightArrowBlue.svg" height="30" className="ml-3" /></motion.h1>
                                                    </div>
                                                    <motion.div className="d-flex  flex-column">
                                                        <motion.p initial={{ x: '-15vw' }} animate={{ x: '0' }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }} className="contact-light-text theme-blue  d-flex align-items-center no-wrap ">Get in touch for a detailed walkthrough of my work. <motion.img initial={{ x: -20, y: -20, opacity: 0 }} animate={{ x: 10, y: -40, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1.8 }} src="/images/logo/right-top-dark.png" className="inherit-display" /></motion.p>
                                                        <motion.p initial={{ x: '15vw' }} animate={{ x: '0' }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }} className="contact-mid-text text-dark text-right pr-4-5">Contact me</motion.p>
                                                    </motion.div>
                                                </div>
                                                <div className="contact-wrapper bg-white border-black opacity-1 position-relative z-9">
                                                    <div>
                                                        <motion.h1 initial={{ x: '40vw' }} animate={{ x: '0' }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }} className="contact-heading-2 theme-blue mt-2 d-flex  align-items-center"><Link href="/adobe-wijk"><a className="theme-blue ">Next project</a></Link> <motion.img initial={{ x: -30, opacity: 0 }} animate={{ x: '0', opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1.5 }} src="/images/rightArrowBlue.svg" height="30" className="ml-3" /></motion.h1>
                                                    </div>
                                                    <motion.div className="d-flex  flex-column hoverText">
                                                        <motion.p initial={{ x: '-15vw' }} animate={{ x: '0' }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }} className="contact-light-text text-dark  d-flex align-items-center no-wrap "><a href={`#`} onClick={() => setisContactClicked(true)}>Get in touch for a detailed walkthrough of my work.
                                                    <motion.img initial={{ x: -20, y: -20, opacity: 0 }} animate={{ x: 10, y: -40, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1.8 }} src="/images/logo/right-top-dark.png" className="inherit-display img-white" />
                                                            <motion.img initial={{ x: -20, y: -20, opacity: 0 }} animate={{ x: 10, y: -40, opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1.8 }} src="/images/right-top-purple.png" className="img-orange inherit-display" /></a></motion.p>
                                                        <motion.p initial={{ x: '15vw' }} animate={{ x: '0' }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }} className="contact-mid-text text-dark text-right pr-4-5 purple"><a href={`#`} onClick={() => setisContactClicked(true)}>Contact me</a></motion.p>
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                </Container>
                            </motion.div>
                        </AnimatePresence>
                    </Slider>
                    <Modal show={show} onHide={() => handleClose('slide_4_modal')}>
                        <Modal.Header closeButton></Modal.Header>
                        <Container >
                            <motion.div className="video-player mt-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }}>
                                <ReactPlayer url={links?.adobe_captive?.video_6} id="video_6" className="player" width="1199px" height="681px" allow="fullscreen; picture-in-picture" allowFullScreen playing={show} onContextMenu={handleContextMenu} playIcon={<div>Icon</div>} />
                            </motion.div>
                        </Container>
                    </Modal>
                    <Modal show={show2} onHide={handleClose2}>
                        <Modal.Header closeButton></Modal.Header>
                        <Container >
                            <motion.div className="video-player mt-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }}>
                                <ReactPlayer url={links?.adobe_captive?.video_7} id="video_7" className="player" width="1199px" height="681px" allowFullScreen playing={show2} />
                            </motion.div>
                        </Container>
                    </Modal>
                    <Modal show={show3} onHide={handleClose3}>
                        <Modal.Header closeButton></Modal.Header>
                        <Container >
                            <motion.div className="video-player mt-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }}>
                                <ReactPlayer url={links?.adobe_captive?.video_8} id="video_8" className="player" width="1199px" height="681px" allowFullScreen playing={show3} />
                            </motion.div>
                        </Container>
                    </Modal>
                    <Modal show={show4} onHide={handleClose4}>
                        <Modal.Header closeButton></Modal.Header>
                        <Container >
                            <motion.div className="video-player mt-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }}>
                                <ReactPlayer url={links?.adobe_captive?.video_9} id="video_9" className="player" width="1199px" height="681px" allowFullScreen playing={show4} />
                            </motion.div>
                        </Container>
                    </Modal>
                    <Modal show={show5} onHide={handleClose5}>
                        <Modal.Header closeButton></Modal.Header>
                        <Container >
                            <motion.div className="video-player mt-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.6, delay: 1 }}>
                                <ReactPlayer url={links?.adobe_captive?.video_9} id="video_9" className="player" width="1199px" height="681px" allowFullScreen playing={show5} />
                            </motion.div>
                        </Container>
                    </Modal>
                </div>
                <div className="main-wrapper white mobile-version p-0" >
                    <MobileNavDark setclickedRoute={setclickedRoute} setisAuthenticated={setisAuthenticated} setisContactClicked={setisContactClicked} destination={`destination=/adobe-captivate?slide=${activeSlide}`}/>
                    <div className=" br-0" >
                        <Image src="/images/captivate-introduction.webp" alt="property-inspector" width={1199} height={681} />
                    </div>
                    <Container className="px-m4 mt-5">
                        <Row>
                            <Col md={12}>
                                <h1 className="intro-text mt-3">Introduction</h1>
                                <p className="para-bold-text mt-3">Adobe Captivate is an e-learning content authoring tool used by instructional designers to create compliance course material, software simulations and immersive VR experiences.</p>
                                <p className="para-normal-text source-sans mt-4">The video above was created for and presented at the Adobe e-learning Summit at Las Vegas in 2019, where the Captivate team shared their vision for the new, modern version of Captivate Next, to be launched in 2021.</p>
                            </Col>
                            <Col md={12}>
                                <h1 className="intro-text mt-5">The Captivate story</h1>
                                <p className="para-normal-text mt-5 mb-0"><span className="f-bold">ROLE</span> |  Project Lead <br /> <span className="f-bold">YEARS</span> | 2019- Present</p>
                                <p className="para-normal-text mt-4 mb-0">Captivate is a powerful tool that hasn’t undergone a design revamp in a long time. As a result, workflows were lengthy and complex, and the UI was terribly outdated. After scoping all our features (phew!), we conceded to:</p>
                            </Col>
                            <Col md={12}>
                                <h3 className="title-bold mt-4 mb-0">Modernize core workflows</h3>
                                <p className="mcwText">REDEFINE UX + UI + COMPLETE CODE CHANGE</p>
                                <h3 className="title-bold mt-3 mb-0">Reskin other workflows</h3>
                                <p className="mcwText mb-0">PRIMARILY UI + MINIMAL UI + CODE CHANGE</p>
                            </Col>
                            <Col md={12} className="mt-5">
                                <img src="/images/mammals1.svg" className="w-100" />
                                <h3 className="title-bold mt-3 mb-0">Old interface</h3>
                                <p className="para-normal-text mt-0 mb-0">Outdated UI    +    Complex, lengthy workflows    +    Steep learning curve    +    Discoverability, clutter</p>
                            </Col>
                            <Col md={12} className="mt-5">
                                <img src="/images/mammals2.svg" className="w-100" />
                                <h3 className="title-bold mt-3 mb-0">New interface</h3>
                                <p className="para-normal-text mt-0 mb-0"> Left to right philosophy (tool from left, draw on slide, edit on right)    +    Non- undockable panels    +    Contextual property inspector</p>
                            </Col>
                        </Row>
                    </Container>
                    <div className=" br-0  mt-80" >
                        <Image src="/images/sicily-mob.png" alt="property-inspector" width={1199} height={681} />
                    </div>
                    <Container className="px-m4">
                        <Row>
                            <Col md={12} className="mt-4">
                                <h1 className="intro-text mt-3">States</h1>
                                <p className="para-normal-text mt-3">An XD prototype created to gauge if authors are able to <span className="f-bold">grasp the concept of “linking and unlinking” child states to and from the default state,</span> and intuitively predict the right behaviour.</p>
                                <p className="para-normal-text source-sans mt-4">
                                    Whether we’re working with XD or other software leveraging components and states, intuitively predicting the behavioural relationship  &nbsp;
                                    <span className={`d-none ${isActive ? 'd-inline' : ''}`}>
                                        between the default state and other states can be tricky, with any change in properties made to objects in the default state always propagating to the other states, unless overridden. While this behaviour could benefit authors in most cases, they struggle to make changes to the default state independently. Further, the absence of some visual depiction implies that the author has to navigate through the states to view their appearance.
                                    <br /><br />
                                        Our solution is to introduce two modes- the “linked” mode, where any property alteration in the default state will propagate to other states (unless the concerned property has been overridden in the child state), and the “unlinked” mode, where modifications are native to the default state, and will not propagate even upon linking. Authors can shift between the two modes using a button on a fly-out panel that contains thumbnails of all the states of the selected object.
                                    </span>
                                </p>
                                <p className={`readMore mt-4 mb-0 pointer ${isActive ? 'd-none' : ''}`} onClick={addClass}>+ Read more</p>
                                <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.2, delay: 1 }} className={`close-circle-mob position-relative d-none ${isActive ? 'd-flex' : ''}`} src="/images/close-circle.png" onClick={removeClass} />
                            </Col>
                        </Row>
                    </Container>
                    <div className=" br-0  mt-80" >
                        <Image src="/images/mammals.webp" alt="property-inspector" width={1199} height={681} />
                    </div>
                    <Container className="px-m4">
                        <Row>
                            <Col md={12} className="mt-4">
                                <h1 className="intro-text mt-3">Interactions</h1>
                                <p className="para-normal-text mt-3">Xd prototype to gather <span className="f-bold">engineering’s buy-in to build two new triggers </span> appearing in an application for the first time- objects clicked and states viewed. </p>
                                <p className="para-normal-text source-sans mt-4">Interactions are the building blocks of most engaging content, and we have carefully curated a set of very specialised triggers (which are also parameters for conditions), apart from the regular ones like hover, click, etc. The first of these is a trigger called “custom states viewed”, which  &nbsp;
                                    <span className={`d-none ${isActive ? 'd-inline' : ''}`}>
                                        parameters for conditions), apart from the regular ones like hover, click, etc. The first of these is a trigger called “custom states viewed”, which triggers actions as soon as all or a sub-set of the states of an object have been viewed by the learner. This trigger is especially handy while trying to navigate through content in a systematic (maybe persuasive) manner. The second of the triggers is “objects clicked”, which triggers actions as soon as certain objects have been clicked; this comes in handy while trying to enable and disable clickable objects, depending on what has been interacted with on the slide. The 2 triggers together form a significant force, and discourage the authoring of complex conditions to perform basic actions. After scrutinising a plethora of very diverse e-learning content, we identified 3 outcomes our authors were inclined to consistently achieve using conditions and variables- record if states are viewed, validate and display what a learner might input, and otherwise adjust variables to create immersive material like games, etc.
                                        By uncovering parameters like “states visited” and “content of element” and displaying them upfront, we eliminate the need for authoring conditions for many scenarios, and have optimised the click count significantly.
                                    </span>
                                </p>
                                <p className={`readMore mt-4 mb-0 pointer ${isActive ? 'd-none' : ''}`} onClick={addClass}>+ Read more</p>
                                <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.2, delay: 1 }} className={`close-circle-mob position-relative d-none ${isActive ? 'd-flex' : ''}`} src="/images/close-circle.png" onClick={removeClass} />
                            </Col>
                        </Row>
                    </Container>
                    <div className=" br-0  mt-80" >
                        <Image src="/images/jungle-jim.webp" alt="property-inspector" width={1199} height={681} />
                    </div>
                    <Container className="px-m4">
                        <Row>
                            <Col md={12} className="mt-4">
                                <h1 className="intro-text mt-3">Animations</h1>
                                <p className="para-normal-text mt-3">Xd prototype created to <span className="f-bold"> deliver high fidelity design specs to engineering </span> early to ensure all crucial use cases are addressed effectively so complex content can be authored quickly.</p>

                                <p className="para-normal-text source-sans mt-4">While authoring quality e-learning content, animations are primarily used to display and emphasise objects in accordance with the author’s  &nbsp;
                                    <span className={`d-none ${isActive ? 'd-inline' : ''}`}>
                                        narration of the slide. We gathered together with our engineers, identified Animista as the appropriate library for our authors, and curated a list of animation effects. The purpose of the prototype above was to identify and articulate most possible animation effects that are used to create engaging content and ensure we have provided for all of them appropriately.
                                        <br /><br />
                                        (This prototype was circulated amongst Alpha volunteers to gather their feedback and give them a glimpse of the new effects within the new Captivate 2021)
                                    </span>
                                </p>
                                <p className={`readMore mt-4 mb-0 pointer ${isActive ? 'd-none' : ''}`} onClick={addClass}>+ Read more</p>
                                <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.2, delay: 1 }} className={`close-circle-mob position-relative d-none ${isActive ? 'd-flex' : ''}`} src="/images/close-circle.png" onClick={removeClass} />
                            </Col>
                        </Row>
                    </Container>
                    <div className=" br-0  mt-80" >
                        <Image src="/images/sicily-mob.png" alt="property-inspector" width={1199} height={681} />
                    </div>
                    <Container className="px-m4">
                        <Row>
                            <Col md={12} className="mt-4">
                                <h1 className="intro-text mt-3">State animations</h1>
                                <p className="para-normal-text mt-3">Xd prototype created to <span className="f-bold">  validate the need for a provision to animate disparate objects</span> that are present across the different states of a single object.</p>

                                <p className="para-normal-text source-sans mt-4">When we’re working with similar content (and hence similar objects) across the states which differ mostly in their CSS properties, Captivate can “auto-animate” or seamlessly transform the object from one state to another. However, if the author has diverse content across &nbsp;
                                    <span className={`d-none ${isActive ? 'd-inline' : ''}`}>
                                        the states (like in the example above), we would be left with a messy seamless transform if we animate SVG paths insensibly, and no animation if we don’t provide an option to set other animations, rendering the content dull. This necessitated a state animation panel where authors can quickly apply effects to objects within different states and preview how they would load. These panel workflows are designed especially keeping advanced authors in mind, so we decided to hide it and invoke it only on double click of the multi-state objects presence on the regular timeline. Within the state timeline, there are two modes- the working mode and the summary mode. Authors can also perform some custom operations like aligning objects to animate at the same time, or distribute them across the timeline to animate in request intervals. The maximum time for an object to appear, or disappear is 3 seconds, but emphasis effects can be on an infinite loop.
                                    </span>
                                </p>
                                <p className={`readMore mt-4 mb-0 pointer ${isActive ? 'd-none' : ''}`} onClick={addClass}>+ Read more</p>
                                <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.2, delay: 1 }} className={`close-circle-mob position-relative d-none ${isActive ? 'd-flex' : ''}`} src="/images/close-circle.png" onClick={removeClass} />
                            </Col>
                        </Row>
                    </Container>
                    <div className=" br-0  mt-80" >
                        <Image src="/images/sicily-mob.png" alt="property-inspector" width={1199} height={681} />
                    </div>
                    <Container className="px-m4">
                        <Row>
                            <Col md={12} className="mt-4">
                                <h1 className="intro-text mt-3">Components and widgets</h1>
                                <p className="para-normal-text mt-3">Xd prototype created to <span className="f-bold">  like buttons, checkboxes, etc. and complex widgets like tabs, hotspots, flip cards, etc. can be customised to suit the content. </span> WORK IN PROGRESS:Our vision for functional multi-state objects like buttons, radio buttons, etc. is to make them ready-to-use, but easy-to-</p>
                                <p className="para-normal-text source-sans mt-4">Our vision for functional multi-state objects like buttons, radio buttons, etc. is to make them ready-to-use, but easy-to- <span className={`d-none ${isActive ? 'd-inline' : ''}`}>
                                    -customise. Component states and interactions like hover, click, visited, etc. are already configured into the component; authors can enable or disable these states and alter their appearance properties. A rich content-oriented preset experience ensures most variations are available upfront for the author to choose from- for example, radio button presets would have options with only text, text and image, or only image. Further, authors can toggle text, image, icon, etc. on and off depending on their requirement. Since canvas controls don’t apply to components, authors can choose from a curated set of transform options like size (S, M, L), spacing (default, compact, comfortable) and magnification. This approach dictates that all the diverse common controls like input fields, dropdowns, etc. displayed on the slide look consistent. The same theory extends itself to even smarter widgets like tabs, which are essentially a collection of components and content areas; authors can shift their focus between the tab buttons and content area. While edits apply to navigation controls at a macro level, content areas can be completely customised to suit the content. Again, a rich preset experience for each widget variation ensures efficiency while choosing the appropriate layout.
                                    </span>
                                </p>
                                <p className={`readMore mt-4 mb-0 pointer ${isActive ? 'd-none' : ''}`} onClick={addClass}>+ Read more</p>
                                <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.2, delay: 1 }} className={`close-circle-mob position-relative d-none ${isActive ? 'd-flex' : ''}`} src="/images/close-circle.png" onClick={removeClass} />
                            </Col>
                        </Row>
                    </Container>
                    <div className="contact-wrapper-mobile py-5">
                        <Container>
                            <Row>
                                <Col md={12}>
                                    <div className="cWb border-black">
                                        <h1><Link href="/adobe-wijk"><a className="theme-blue">Next project</a></Link></h1>
                                        <p className="mt-80 mb-0 text-dark">Get in touch for a detailed walkthrough of my work. </p>
                                        <h2 className="text-dark mb-3 d-flex"><a href={`#`} onClick={() => setisContactClicked(true)}>Contact me <img src="/images/logo/right-top-dark.png" className="mob-contact-arrow" /></a></h2>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
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

export default AdobeCaptivate;