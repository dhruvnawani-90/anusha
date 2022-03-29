import React, { useState, useEffect } from "react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import getAbsoluteURL from "../utils/getAbsoluteURL"
import absoluteUrl from 'next-absolute-url'
import { useCookies } from "react-cookie"
import { parseCookies } from "../utils/helpers"
import { GUEST_MAGIC_CODE } from "../utils/constants"
import { requireAuth } from '../utils/auth'
import { motion, AnimatePresence, usePresence } from "framer-motion"
import RequestMagicCode from "./request-access"

const schema = yup.object().shape({
    magicCode: yup.string().required().label("* Magic code"),
});

function Authentication(props) {
    const { isAuthenticated, setisAuthenticated, fromIndexPage, toPage } = props;
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(!isAuthenticated);
    }, [isAuthenticated]);
    const router = useRouter();
    const getSlideValue = () => {
        const destination = router.query.destination;
        var url = new URL(`https://xyz.com/${destination}`);
        return url.searchParams.get("slide");
    }
    const [slide] = useState(getSlideValue());

    const [cookie, setCookie, removeCookie] = useCookies([GUEST_MAGIC_CODE]);
    const [submitError, setSubmitError] = useState(false);
    const [magicCodeEmpty, setMagicCodeEmpty] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const changeMagicCode = (e) => {
        setMagicCodeEmpty(e.target.value == null || e.target.value == "");
    }
    const onSubmit = async (data) => {
        try {
            const endpoint = getAbsoluteURL(
                "/api/guest-login"
            );
            setIsSubmitting(true);
            setSubmitError(false);
            const response = await fetch(endpoint, {
                method: "POST",
                body: JSON.stringify(data)
            });
            const responseJSON = await response.json();
            if (!responseJSON.success) {
                setIsSubmitting(false);
                setSubmitError(responseJSON.message);
            }
            else {
                removeCookie(GUEST_MAGIC_CODE);
                setCookie(GUEST_MAGIC_CODE, responseJSON.data, {
                    path: "/",
                    maxAge: 3600, // Expires after 1hr
                    sameSite: true,
                });
                router.push(toPage ? toPage : '/');
            }   
        } catch (error) {
            // handle error
        }
    }
    const [close, setClose] = useState(false)
    const cancelClicked = () => {
        setClose(true);
        router.push("/");
    }
    const [showRequestAccess, setshowRequestAccess] = useState(false);
    return (
        <>
            <main className={`theme-blue-bg auth-main-wrapper contact-modal ${show ? 'show-contact' : ''}`}>
                <motion.div className={`main-wrapper auth ${close ? 'remove' : ''}`} initial={{ opacity: 1, y: '30vh' }} animate={{ opacity: 1, y: 0 }} transition={{ ease: "easeOut", duration: 0.8 }}>
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="auth-wrapper position-relative">
                                    <h2 className="mb-4">All greatness needs <span>some</span> effort.</h2>
                                    <Form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                                        <Form.Group className="mb-4" controlId="magicCode">
                                            <Form.Control {...register("magicCode")} onChange={changeMagicCode} type="text" placeholder="Enter password" autoFocus />
                                            <span className="formErrorMessage">{errors.magicCode?.message}</span>
                                            <span className="formErrorMessage">{submitError}</span>
                                        </Form.Group>
                                        <Button variant="theme" type="submit" disabled={isSubmitting || magicCodeEmpty}>
                                            {isSubmitting ? 'Submitting...' : 'Submit'}
                                        </Button>
                                    </Form>
                                    <div className="mt-4 d-lg-flex align-items-end">
                                        <h3>Don’t know the magic word?</h3>
                                        <a onClick={() => setshowRequestAccess(true)} href="#">
                                            <h6 className="ml-lg-4 cursor-pointer">
                                                <a className="theme-orange">
                                                    REQUEST ACCESS
                                                    <img src="/images/right-arrows.png" alt="right-arrow" className="ml-3" />
                                                </a>
                                            </h6>
                                        </a>
                                    </div>
                                    <a onClick={() => setisAuthenticated(fromIndexPage ? true : false)} className="position-absolute close-btn cursor-pointer"><img src="/images/close.svg" /></a>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </motion.div>
            </main>
            <RequestMagicCode showRequestAccess={showRequestAccess} setshowRequestAccess={setshowRequestAccess} />
        </>
    );
}

export default Authentication;