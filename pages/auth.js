import React, { useState } from "react"
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
import { motion, AnimatePresence, usePresence  } from "framer-motion"

const schema = yup.object().shape({
    magicCode: yup.string().required().label("* Magic code"),
});

function Authentication({destPath}) {
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
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema),
    });
    const changeMagicCode = (e) => {
        setMagicCodeEmpty(e.target.value == null || e.target.value == "");
    }
    const onSubmit = async (data) => {
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
            router.push(destPath?destPath:'/');
        }
    }
    return (
        <main  className="theme-blue-bg auth-main-wrapper">
            <motion.div className="main-wrapper auth " initial={{opacity: 1, y:'30vh'}} animate={{ opacity: 1, y:0 }} transition={{ ease: "easeOut", duration: 0.8 }}>
                <Container> 
                    <Row>
                        <Col lg={12}>
                            <div className="auth-wrapper position-relative">
                                <h2 className="mb-4">All greatness needs <span>some</span> effort.</h2>
                                <Form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Group className="mb-4" controlId="magicCode">
                                        <Form.Control {...register("magicCode")} onChange={changeMagicCode} type="text" placeholder="Enter password" autoFocus/>
                                        <span className="formErrorMessage">{errors.magicCode?.message}</span>
                                        <span className="formErrorMessage">{submitError}</span>
                                    </Form.Group>
                                    <Button variant="theme" type="submit" disabled={isSubmitting || magicCodeEmpty}>
                                        {isSubmitting ? 'Submitting...' : 'Submit'}
                                    </Button>
                                </Form>
                                <div className="mt-4 d-lg-flex align-items-end">
                                    <h3>Don’t know the magic word?</h3>
                                    <Link href="/request-access">
                                        <h6 className="ml-lg-4 cursor-pointer">
                                            <a className="theme-orange">
                                                REQUEST ACCESS 
                                                <img src="/images/right-arrows.png" alt="right-arrow" className="ml-3" />
                                            </a>
                                        </h6>
                                    </Link>
                                </div>
                                <Link href={router.query.destination ? router.query.destination : '/'}><a className="position-absolute close-btn"><img src="/images/close.svg" /></a></Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
                
            </motion.div>
        </main>
    );
}

export async function getServerSideProps({req, res}) {
    const data = parseCookies(req);
    const isServerSide = typeof window === 'undefined'
    const origin = isServerSide ? absoluteUrl(req).origin : window.location.origin;
    const params = isServerSide ? new URL(req.url, origin).searchParams : new URLSearchParams(window.location.search);
    const destinationParamVal = params.get('destination') ? decodeURIComponent(params.get('destination')) : undefined;
    const responseJSON = await requireAuth(data[GUEST_MAGIC_CODE], req);
    if (responseJSON.success) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        }
    }
    return {
        props: {
            destPath: destinationParamVal?destinationParamVal:null
        }
    }
}

export default Authentication;