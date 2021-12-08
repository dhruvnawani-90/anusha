
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, usePresence  } from "framer-motion"
import NavSec from "../components/shared/NavSec"
import Slider from "react-slick";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Head from 'next/head'
import Image from 'next/image'
import MobileNav from "../components/shared/MobileNav"
import { GUEST_MAGIC_CODE } from "../utils/constants"
import { parseCookies } from "../utils/helpers"
import { requireAuth } from '../utils/auth'

function Captivate() {
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


    return (
        <>
        <Head>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css"/>
        </Head>
        <main>
            <div className="main-wrapper web-version other-projects">
                <Slider {...settings} ref={(slider) => (sliderefd.current = slider)} className="other-projects">
                    <AnimatePresence exitBeforeEnter={true} >
                        <motion.div key={activeSlide}>
                            <div className="nav-light"><NavSec /></div>
                            <div className="container mt-4">
                                <motion.span initial={{opacity: 0}} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1,  delay:1 }} className="vert-text-main text-white">Furlenco’s Float and Pod</motion.span>
                                <Row>
                                    <Col lg={5}>
                                        <motion.div initial={{opacity: 0, scale:0.9}} animate={{ opacity: 1, scale:1 }} transition={{ ease: "easeOut", duration: 1 }} className="sofa-wrapper-container origin" >
                                        <img src="/images/sofa-moc.png" className="sofa-moc" />
                                            <div className="mt-4">
                                                <h2 className={"f-42 f-bold text-yellow text-right"}>The Float.</h2>
                                                <p className="fPxyz_-text text-right">Marries the comfort of a recliner to the<br/> great looks of an armchair.</p>
                                            </div>
                                        </motion.div>
                                    </Col>
                                    <Col lg={7}>
                                        <motion.div initial={{opacity: 0, scale:0.9}} animate={{ opacity: 1, scale:1 }} transition={{ ease: "easeOut", duration: 1 }} className="bed-wrapper-container pl-4 origin-right">
                                            <div className="bed-wrapper">
                                                <img src="/images/bed.svg" className="bed" />
                                            </div>
                                            <div className="mt-4">
                                                <h2 className="f-48 f-bold orange-text">The Pod.</h2>
                                                <p className="fPxyz_-text">A unit comprising of a bed, a TV, speakers, a reading lamp and a<br/> plug-point; it’s an ideal product for urban living.</p>
                                            </div>
                                        </motion.div>
                                    </Col>
                                    <Col lg={12}>
                                        <motion.p initial={{opacity: 0, y:40}} animate={{ opacity: 1, y:0 }} transition={{ ease: "easeOut", duration: 1 }} className="f-14 mt-4 pl-4 text-white source-sans">
                                            The Pod and the Float were 2 special products designed by Furlenco, fuelled by months of intense user<br/> research, perfectly customised for the urban Indian. I got to design descriptive webpages for these products<br/> while collaborating with marketers, content writers, photographers, and developers. 
                                        </motion.p>
                                    </Col>
                                </Row>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    <AnimatePresence exitBeforeEnter={true} >
                        <motion.div key={activeSlide}>
                            <div className="nav-light"><NavSec /></div>
                            <div className="container">
                                <motion.span initial={{opacity: 0}} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1,  delay:1 }} className="vert-text-main text-white">Primary audiences</motion.span>
                                <Row>
                                    <Col lg={6}>
                                        <motion.div initial={{opacity: 0, scale:0.9}} animate={{ opacity: 1, scale:1 }} transition={{ ease: "easeOut", duration: 1 }} className="dual-grid yellow">
                                            <img src="/images/sofa-vector.svg" className="position-absolute xyr-15" />
                                            <div className="text-right grid-left-top">
                                                <p className="f-24 f-bold text-yellow mb-2">Sarah & Vikas</p>
                                                <p className="f-12 text-white">GRAPHIC DESIGNER, 25-30</p>
                                                <p className="para-normal-text source-sans text-white lh-24">Sarah usually makes decisions.<br/>
                                                Prefers easy-to-maintain furniture<br/>
                                                Usually economical about budgeting.<br/>
                                                Tries to find out about product from friends.<br/>
                                                Does not usually hunt for deals and discounts.</p>
                                            </div>
                                        </motion.div>
                                    </Col>
                                    <Col lg={6}>
                                        <motion.div initial={{opacity: 0, scale:0.9}} animate={{ opacity: 1, scale:1 }} transition={{ ease: "easeOut", duration: 1 }} className="dual-grid orange origin-right">
                                            <img src="/images/bed-vector.svg" className="position-absolute xyl-15" />
                                            <div className="grid-right-top">
                                                <p className="f-24 f-bold orange-text mb-2">Aakash</p>
                                                <p className="f-12 text-white">GRAPHIC DESIGNER, 25-30</p>
                                                <p className="para-normal-text source-sans text-white lh-24">Likes to engage with the page and understand the product.
                                                Likes functional, but “novel” design.<br/>
                                                Usually doesn’t mind spending if the product is cool.<br/>
                                                Shares on social media to hear what others have to say.<br/>
                                                Looks for deals, discounts and competitive products.</p>
                                            </div>
                                        </motion.div>
                                    </Col>
                                </Row>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    <AnimatePresence exitBeforeEnter={true} >
                        <motion.div key={activeSlide}>
                            <div className="nav-light"><NavSec /></div>
                            <div className="container">
                                <motion.span initial={{opacity: 0}} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1,  delay:1 }} className="vert-text-main text-white">Telling the story</motion.span>
                                <Row>
                                    <Col lg={12}>
                                        <motion.p initial={{opacity: 0, y:-40}} animate={{ opacity: 1, y:15 }} transition={{ ease: "easeOut", duration: 0.2 }} className="f-24 f-bold text-center text-white mt-0 mb-0">Storyboarding for the Float vs. the Pod</motion.p>
                                    </Col>
                                    <Col lg={6}>
                                        <motion.div initial={{opacity: 0, y:60}} animate={{ opacity: 1, y:0 }} transition={{ ease: "easeOut", duration: 0.4 }} className="story-wrapper dual-grid yellow justify-content-start">
                                            <img src="/images/ddg.png" />
                                            <img src="/images/versatile.png" />
                                            <img src="/images/special.png" />
                                        </motion.div>  
                                    </Col>
                                    <Col lg={6}>
                                        <motion.div initial={{opacity: 0, y:60}} animate={{ opacity: 1, y:0 }} transition={{ ease: "easeOut", duration: 0.4 }} className="story-wrapper dual-grid orange justify-content-start">
                                            <img src="/images/sleepod.png" />
                                            <img src="/images/press.png" />
                                            <img src="/images/grid-6.png" />
                                        </motion.div>
                                    </Col>
                                </Row>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    <AnimatePresence exitBeforeEnter={true} >
                        <motion.div key={activeSlide}>
                            <div className="nav-light"><NavSec /></div>
                            <div className="container">
                                <motion.span initial={{opacity: 0}} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1,  delay:1 }} className="vert-text-main text-white">Bringing it to life</motion.span>
                                <Row>
                                    <Col lg={12}>
                                        <motion.p initial={{opacity: 0, y:-40}} animate={{ opacity: 1, y:15 }} transition={{ ease: "easeOut", duration: 0.2 }} className="f-24 f-bold text-center text-white mt-0 mb-0">Web pages</motion.p>
                                    </Col>
                                    <Col lg={6}>
                                        <motion.div initial={{opacity: 0, y:60}} animate={{ opacity: 1, y:0 }} transition={{ ease: "easeOut", duration: 0.4 }} className="dual-grid yellow p-4">
                                            <motion.img initial={{opacity: 0, y:60}} animate={{ opacity: 1, y:0 }} transition={{ ease: "easeOut", duration: 0.4 }} src="/images/furlenco.png" className="w-100" />
                                        </motion.div>
                                    </Col>

                                    <Col lg={6}>
                                        <motion.div initial={{opacity: 0, y:60}} animate={{ opacity: 1, y:0 }} transition={{ ease: "easeOut", duration: 0.4 }} className="dual-grid orange p-4">
                                            <motion.img initial={{opacity: 0, y:60}} animate={{ opacity: 1, y:0 }} transition={{ ease: "easeOut", duration: 0.4 }} src="/images/pod.png" className="w-100" />
                                        </motion.div>
                                    </Col>
                                </Row>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    <AnimatePresence exitBeforeEnter={true} >
                        <motion.div key={activeSlide}>
                            <motion.div initial={{opacity: 0, y:-180}} animate={{ opacity: 1, y:0 }} transition={{ ease: "easeOut", duration: 0.6 }} className="position-absolute ellipsis">
                                <Image src="/images/ellipsis.png"   width={708} height={708} />
                            </motion.div>
                            <motion.div initial={{opacity: 0, rotateZ:'37deg'}} animate={{ opacity: 1, rotateZ:0}} transition={{ ease: "easeOut", duration: 0.6 }} className="position-absolute polygon">
                                <Image src="/images/polygon.png"   width={1116} height={820} />
                            </motion.div>
                            <div className="nav-light"><NavSec /></div>
                            <div className="container">
                                <motion.span initial={{opacity: 0}} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1,  delay:1 }} className="vert-text-main lit-blue">iGEM, 2010</motion.span>
                                <Row>
                                    <Col lg={4}>
                                        <div className="wDo-wrapper">
                                            <img src="/images/workshop.png" className="w-100" />
                                            <p className="para-normal-text source-sans text-white mt-3"><span className="light-pink">Conducted workshops at local schools,</span> where we inspired them with the concept of DIY and taught them how to build a microscope using a webcam, amongst other curiosity building activities.</p>
                                        </div>
                                    </Col>
                                    <Col lg={4}>
                                        <div className="wDo-wrapper mt-4">
                                            <img src="/images/DIY.png" className="w-100" />
                                            <p className="para-normal-text source-sans text-white mt-3"><span className="light-pink">Built a  DIY lab,</span> including a Microscope, Incubator, Water Bath, Sterile Hood, and a hand held centrifuge using only locally sourced junk, under $100, and performed the GFP protocol</p>
                                        </div>
                                    </Col>
                                    <Col lg={4}>
                                        <div className="wDo-wrapper mt-5 pt-5">
                                            <img src="/images/outreach.png" className="w-100" />
                                            <p className="para-normal-text source-sans text-white mt-3"><span className="light-pink">Planned a fun outreach</span> where folks could isolate their DNA using alcohol, soap, etc. and see their DNA floating in the solution!</p>
                                        </div>
                                    </Col>
                                    <Col lg={12} className="mt-4">
                                        <p className={"f-24 f-bold light-pink text-center wow fadeInUp"}>iGEM, MIT, Boston</p>
                                        <p className="para-normal-text source-sans text-white text-center">A group of ten of us got to represent an our college at the International Genetically Engineered Machines competition at Boston. As artists and designers in a fairy technical space, our focus was to make science more approachable using the concept of “jugaad”, which is a technique of being resourceful. Apart from the genetic engineering, we performed a series of outreach programs to educate and inculcate awareness in schools and other communities.</p>
                                    </Col>
                                </Row>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    <AnimatePresence exitBeforeEnter={true} >
                        <motion.div key={activeSlide}>
                        <div className="nav-light"><NavSec /></div>
                            <div className="container position-relative">
                                <motion.span initial={{opacity: 0}} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1,  delay:1 }} className="vert-text-main lit-blue">The project</motion.span>
                                <Row>
                                    <Col  lg={3} className="col-xxl-5">
                                        <motion.img initial={{opacity: 0, x:40}} animate={{ opacity: 1, x:0 }} transition={{ ease: "easeOut", duration: 0.6 }}  src="/images/project.png" className="w-100 mt-5" />
                                    </Col>
                                    <Col  lg={9} className="col-xxl-7">
                                        <motion.div initial={{opacity: 0, x:-80}} animate={{ opacity: 1, x:0 }} transition={{ ease: "easeOut", duration: 0.6 }} className="pt-5">
                                            <h4 className="f-24 f-bold light-pink">Interference in C. Elegans<br/> to test IPTG levels in soil</h4>
                                            <p className="f-18 aliceblue mt-5 pl-5 mb-4">We decided to investigate the consequences of a synthetic ecology where organisms created in a techno-scientific environment interact with organisms in the wild.</p>
                                            <p className="f-14 source-sans text-white mt-5 pl-5">We inserted two genes from a worm into a bacterium through a plasmid. In the presence of IPTG, a process called “transcription” takes place and RNA is produced. The plasmid is programmed to produce two strands of RNA, or dsRNA, perceived by larger organisms as a virus. The bacterium is then ingested by the worm, which splits up the dsRNA, assuming it’s a virus. One strand of the dsRNA binds with the worm’s RNA to cease the production of proteins, while the other produces its complement. The worm’s DNA is now corrupted; no protein is produced, rendering the worm sluggish, weak and inactive.</p>
                                            <div className="d-flex moon mt-5 pl-5 justify-content-between">
                                                <div>
                                                    <img src="/images/day-one.png" />
                                                    <p className="f-14 source-sans text-dark mt-3 mb-2">DAY ONE</p>
                                                    <p className="light-pink f-16 f-bold">Active, fast and energetic<br/> Reproducing at adulthood</p>
                                                </div>
                                                <div>
                                                    <img src="/images/day-one.png" />
                                                    <p className="f-14 source-sans text-dark mt-3 mb-2">DAY TEN</p>
                                                    <p className="light-pink f-16 f-bold">Slow, lethargic<br/> Unable to reach adulthood</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Col>
                                </Row>
                                <img src="/images/polygon-group.png" className="poly-2" />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    <AnimatePresence exitBeforeEnter={true} >
                        <motion.div key={activeSlide}>
                            <div className="nav-light"><NavSec /></div>
                            <div className="container position-relative">
                                <motion.span initial={{opacity: 0}} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1,  delay:1 }} className="vert-text-main lit-blue">Hobbies</motion.span>
                                <Row>
                                    <Col lg={12}>
                                        <div className="op-grid">
                                            <div>
                                                <motion.img initial={{scale:1}} animate={{ opacity: 1,scale:0.98 }} transition={{ ease: "easeOut", duration: 0.4 }} src="/images/hobbies.webp" />
                                                <motion.img initial={{scale:1}} animate={{ opacity: 1,scale:0.98 }} transition={{ ease: "easeOut", duration: 0.4 }} src="/images/hobbies3.webp" />
                                            </div>
                                            <div>
                                                <motion.img initial={{scale:1}} animate={{ opacity: 1,scale:0.98 }} transition={{ ease: "easeOut", duration: 0.4 }} src="/images/hobbies1.webp" />
                                                <motion.img initial={{scale:1}} animate={{ opacity: 1,scale:0.98 }} transition={{ ease: "easeOut", duration: 0.4 }} src="/images/hobbies4.webp" />
                                                <p className="f-14 text-white source-sans mb-0 mt-0 pl-2">I like to keep making,</p>
                                                <h1 className="pl-2">‘Cause all work and no play’s no fun.</h1>
                                            </div>
                                            <div>
                                                <motion.img initial={{scale:1}} animate={{ opacity: 1,scale:0.98 }} transition={{ ease: "easeOut", duration: 0.4 }} src="/images/hobbies2.webp" />
                                                <motion.img initial={{scale:1}} animate={{ opacity: 1,scale:0.98 }} transition={{ ease: "easeOut", duration: 0.4 }} src="/images/hobbies5.webp" />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </Slider>
            </div>
            <div className="main-wrapper other-projects-mobile  mobile-version p-0 pb-0" >
                <MobileNav/>
                <Container className="px-m4">
                    <Row>
                        <Col md={12} className="mt-4">
                            <img src="/images/sofa-moc.png" className="sofa-moc" />
                            <div className="mt-m4">
                                <h2 className="f-20 f-bold text-yellow">The Float.</h2>
                                <p className="fPxyz_-text mt-4">Marries the comfort of a recliner to the<br /> great looks of an armchair.</p>
                            </div>
                        </Col>
                        <Col md={12} className="mt-4">
                            <img src="/images/cart-moc.png" className="sofa-moc" />
                            <div className="mt-m4 text-right">
                                <h2 className="f-20 f-bold orange-text">The Pod.</h2>
                                <p className="fPxyz_-text mt-4">Marries the comfort of a recliner to the<br /> great looks of an armchair.A unit comprising of a bed, a TV, speakers, a reading lamp and a plug-point; it’s an ideal product for urban living.</p>
                            </div>
                            <p className="para-normal-text mt-80 mb-5 text-white">The Pod and the Float were <span className="f-bold">2 special products designed by Furlenco, fuelled by months of intense user research, perfectly customised for the urban Indian. </span> I got to design descriptive webpages for these products while collaborating with marketers, content writers, photographers, and developers.   </p>
                        </Col>
                    </Row>
                </Container>
                <div className="audience-1">
                    <Container  className="px-m4">
                        <Row>
                            <Col md={12}>
                                <h1 className="audience-header">Audiences</h1>
                                <div className="d-flex justify-content-center">
                                    <img src="/images/sofa-vector.svg" className="sVector mr-4" />
                                    <span>
                                        <span className="f-16 f-bold text-yellow">Sarah & Vikas</span><br /><span className="f-12 text-white">GRAPHIC DESIGNER, 25-30</span>
                                    </span>
                                </div>
                                <p className="para-normal-text source-sans mt-5 text-center text-white">Sarah usually makes decisions.<br/>Prefers easy-to-maintain furniture<br/>Usually economical about budgeting.<br/>Tries to find out about product from friends.<br/>Does not usually hunt for deals and discounts.</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="audience-2">
                    <Container  className="px-m4">
                        <Row>
                            <Col md={12}>
                                <h1 className="audience-header">Audiences</h1>
                                
                                <div className="d-flex justify-content-center mt-150">
                                    <img src="/images/bed-vector.svg" className="sVector mr-4" />
                                    <span>
                                        <span className="f-16 f-bold orange-text">Aakash</span><br /><span className="f-12 text-white">GRAPHIC DESIGNER, 25-30</span>
                                    </span>
                                </div>
                                <p className="para-normal-text source-sans mt-5 text-center text-white">Likes to engage with the page and understand the product.<br/>Likes functional, but “novel” design.<br/>Usually doesn’t mind spending if the product is cool. Shares on social media to hear what others have to say.<br/>Looks for deals, discounts and competitive products.</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="py-5">
                    <Container className="px-m4">
                        <Row>
                            <Col md={12}>
                            <div className="text-center mt-3 mb-3">
                                    <h1 className="audience-header mb-2">Story boarding</h1>
                                    <img src="/images/sofa-vector.svg" className="sVector mr-4" />
                                </div>
                                <div  className="story-wrapper dual-grid yellow justify-content-start">
                                    <img src="/images/ddg.png" />
                                    <img src="/images/versatile.png" />
                                    <img src="/images/special.png" />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="pb-5 pt-0">
                    <Container className="px-m4">
                        <Row>
                            <Col md={12}>
                                <div className="text-center mt-3 mb-3">
                                    <h1 className="audience-header mb-2">Story boarding</h1>
                                    <img src="/images/bed-vector.svg" className="sVector mr-4" />
                                </div>
                                <div  className="story-wrapper dual-grid orange justify-content-start">
                                    <img src="/images/sleepod.png" />
                                    <img src="/images/press.png" />
                                    <img src="/images/grid-6.png" />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="pb-5 pt-0">
                    <Container className="px-m4">
                        <Row>
                            <Col md={12}>
                                <div className="text-center mt-3 mb-3">
                                    <h1 className="audience-header mb-2">Web pages</h1>
                                    <img src="/images/bed-vector.svg" className="sVector mr-4" />
                                </div>
                                <div  className="story-wrapper dual-grid yellow justify-content-start">
                                    <img src="/images/furlenco.png" />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="pb-5 pt-0">
                    <Container className="px-m4">
                        <Row>
                            <Col md={12}>
                                <div className="text-center mt-3 mb-3">
                                    <h1 className="audience-header mb-2">Web pages</h1>
                                    <img src="/images/bed-vector.svg" className="sVector mr-4" />
                                </div>
                                <div className="story-wrapper dual-grid orange justify-content-start">
                                    <img src="/images/pod.png" />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="light-bg-blue py-5">
                    <Container className="px-m4">
                        <Row className="mt-5">
                            <Col lg={12}>
                                <h1 className="intro-text mt-3">iGEM, MIT, Boston</h1> 
                                <p className="f-16 text-white">A group of ten of us got to represent an our college at the International Genetically Engineered Machines competition at Boston. As artists and designers in a fairy technical space, our focus was to make science more approachable using the concept of “jugaad”, which is a technique of being resourceful. Apart from the genetic engineering, we performed a series of outreach programs to educate and inculcate awareness in schools and other communities.</p>
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col lg={12}>
                                <div className="wDo-wrapper mob">
                                    <img src="/images/workshop.png" className="w-100" />
                                    <p className="f-14 text-white source-sans mt-3">Conducted workshops at local schools, where we inspired them with the concept of DIY and taught them how to build a microscope using a webcam, amongst other curiosity building activities.</p>
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="wDo-wrapper mob mt-4">
                                    <img src="/images/DIY.png" className="w-100" />
                                    <p className="f-14 text-white source-sans mt-3">Built a  DIY lab, including a Microscope, Incubator, Water Bath, Sterile Hood, and a hand held centrifuge using only locally sourced junk, under $100, and performed the GFP protocol</p>
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="wDo-wrapper mob mt-5 pt-5">
                                    <img src="/images/outreach.png" className="w-100" />
                                    <p className="f-14 text-white source-sans mt-3">Planned a fun outreach where folks could isolate their DNA using alcohol, soap, etc. and see their DNA floating in the solution!</p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} className="position-relative">
                                <img   src="/images/project.png" className="w-100 mt-5 position-relative z-9" />
                                <img src="/images/polygon2.png" className="poly-2-mob" />
                                <img src="/images/poly-2-line.png" className="poly-2-mob poly-2-line" />
                            </Col>
                            <Col lg={12}>
                                <div className="pt-5">
                                    <h4 className="f-24 f-bold light-pink">Interference in C. Elegans<br/> to test IPTG levels in soil</h4>
                                    <p className="f-18 aliceblue mt-5 mb-4">We decided to investigate the consequences of a synthetic ecology where organisms created in a techno-scientific environment interact with organisms in the wild.</p>
                                    <p className="f-14 source-sans text-white mt-5">We inserted two genes from a worm into a bacterium through a plasmid. In the presence of IPTG, a process called “transcription” takes place and RNA is produced. The plasmid is programmed to produce two strands of RNA, or dsRNA, perceived by larger organisms as a virus. The bacterium is then ingested by the worm, which splits up the dsRNA, assuming it’s a virus. One strand of the dsRNA binds with the worm’s RNA to cease the production of proteins, while the other produces its complement. The worm’s DNA is now corrupted; no protein is produced, rendering the worm sluggish, weak and inactive.</p>
                                    <div className="d-md-flex moon mt-5 justify-content-between">
                                        <div>
                                            <img src="/images/day-one.png" />
                                            <p className="f-14 source-sans text-dark mt-3 mb-2">DAY ONE</p>
                                            <p className="light-pink f-16 f-bold mb-3">Active, fast and energetic<br/> Reproducing at adulthood</p>
                                        </div>
                                        <div>
                                            <img src="/images/day-one.png" />
                                            <p className="f-14 source-sans text-dark mt-3 mb-2">DAY TEN</p>
                                            <p className="light-pink f-16 f-bold">Active, fast and energetic<br/> Reproducing at adulthood</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </main>
        </>
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
        props: {}
    }
}

export default Captivate;