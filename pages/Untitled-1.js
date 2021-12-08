export default function test() {
    return (
        <></>
    )
}
{/* <AnimatePresence exitBeforeEnter={true} >
                        <motion.div key={activeSlide}>
                        <NavSecDark />
                            <Container> 
                                <motion.span initial={{opacity: 0}} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1,  delay:1 }} className="vert-text-main mid-black">Animations</motion.span>
                                    <Row>
                                        <Col md={6} className="col-xxl-12 col-xxl-10 col-xxl-8 col-xxl-6">
                                            <span className={`d-flex w100 ${isActive  ? 'w-50' : ''}`} >
                                                <motion.div initial={{opacity: 0, scale:0.8}} animate={{ opacity: 1, scale:1 }} transition={{ ease: "easeOut", duration: 0.6,  delay:0.4 }}  className="w-100 origin" >
                                                    <ReactPlayer url='https://youtu.be/0eqhUFRlvgI'  className="player" width="1199px" height="681px" allowFullScreen playing={true} />
                                                </motion.div>
                                                <div className="hammer-icon-container" onClick={handleShow}>
                                                    <img src="/images/hammer.svg" className="hammer-icon" />
                                                    <span className="watch-impletation">Watch implementation</span>
                                                </div>
                                            </span>
                                        </Col>
                                    </Row>
                                    <Row>
                                    <Col lg={10} md={12}>
                                        <motion.div initial={{opacity: 0, y:-30}} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut", duration:1, delay:1}}>
                                            <p className="mid-black mt-4 mb-2 f-18">Xd prototype created to <span className="font-medium"> deliver high fidelity design specs to engineering </span>  early to ensure all<br/> crucial use cases are addressed effectively so complex content can be authored quickly. </p>
                                            <p className="mid-black f-14 lh-22 mb-1 source-sans description-text" >
                                                While authoring quality e-learning content, animations are primarily used to display and emphasise objects in accordance with the author’s 
                                                <span className={`d-none ${isActive  ? 'd-inline' : ''}`}>
                                                narration of the slide. We gathered together with our engineers, identified Animista as the appropriate library for our authors, and curated a list of animation effects. The purpose of the prototype above was to identify and articulate most possible animation effects that are used to create engaging content and ensure we have provided for all of them appropriately. 
                                                <br/><br/>
                                                (This prototype was circulated amongst Alpha volunteers to gather their feedback and give them a glimpse of the new effects within the new Captivate 2021)
                                                </span>
                                            </p>
                                            <p className={`mid-black mr-lg-5 pr-lg-5 font-medium f-16 source-sans bold text-right pointer ${isActive  ? 'd-none' : ''}`} onClick={addClass}>+ Read more</p>
                                        </motion.div>
                                    </Col>
                                </Row>
                                <motion.img initial={{opacity: 0}} animate={{opacity: 1 }} transition={{ ease: "easeOut", duration:0.2, delay:1}} className={`close-circle d-none ${isActive  ? 'd-flex' : ''}`} src="/images/close-circle.png" onClick={removeClass} />
                            </Container>
                        </motion.div>
                    </AnimatePresence> */}