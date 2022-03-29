
import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { ToastContainer, toast } from "react-toastify"
import getAbsoluteURL from "../utils/getAbsoluteURL"
import { useRouter } from "next/router";
import { motion } from "framer-motion"
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import Link from 'next/link'

const schema = yup.object().shape({
    name: yup.string().required().label("Your name"),
    emailAddress: yup.string().email().required().label("Email address"),
    howCanIHelp: yup.string().required().label("How I can help")
});

export default function Contact(props) {
    const { isContactClicked, setisContactClicked } = props;
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(isContactClicked);
    }, [isContactClicked]);
    const router = useRouter()
    const sliderefd = useRef();
    const settings = {
        dots: true,
        lazyLoad: 'ondemand',
        fade: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
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
    const [mailSendSuccess, setMailSendSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue} = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data) => {
        const endpoint = getAbsoluteURL(
            "/api/contact"
        );
        setIsSubmitting(true);
        setSubmitError(false);
        const response = await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify(data)
        });
        const responseJSON = await response.json();
        if (!responseJSON.success) {
            setSubmitError(responseJSON.message);
        }
        else {
            setMailSendSuccess(true);
            setValue("emailAddress", "");
            toast(responseJSON.message, {
                autoClose: 4000,
                position: toast.POSITION.TOP_RIGHT,
                type: responseJSON.success,
                toastId: responseJSON.message,
            });
        }
        setIsSubmitting(false);
    }

    const [close , setClose] = useState(false)
   
    const cancelClicked = () => {
        setClose(true);
        router.push(router?.query?.destination != undefined ? router.query.destination : "/"); 
    }
    return (
        <main className={`theme-blue-bg auth-main-wrapper contact-modal ${show ? 'show-contact' : ''}`}>
            <ToastContainer />
            {/* className={`main-wrapper auth ${setClose ? '' : 'remove'}`} */}
            <motion.div className={`main-wrapper auth ${close? 'remove' : ''}`} initial={{opacity: 1, y:'30vh'}} animate={{ opacity: 1, y:0 }} transition={{ ease: "easeOut", duration: 0.8 }}>
                <Container>     
                    <Row>
                        <Col lg={12} className="mt-5">
                            {mailSendSuccess ? 
                                <div className="auth-wrapper">
                                    <h2 className="mb-2">We have received your <span>mail.</span></h2>
                                    <p className="text-muted">Sit tight! You will receive an email when your request has been approved.</p>
                                    <Form.Group className="mt-80" controlId="back">
                                        <Button variant="theme" type="button" onClick={() => setisContactClicked(false)}>
                                            Ok
                                        </Button>
                                    </Form.Group>
                                </div>
                                : 
                                <div className="auth-wrapper">
                                    <h2 className="mb-2">Contact <span>me</span></h2>
                                    <Form className="auth-form contact" onSubmit={handleSubmit(onSubmit)}>
                                        <Form.Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-4" controlId="name">
                                                    <Form.Control {...register("name")} type="text" placeholder="Your name" autoFocus/>
                                                    <span className="formErrorMessage">{errors.name?.message}</span>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-4" controlId="emailAddress">
                                                    <Form.Control {...register("emailAddress")} type="text" placeholder="Your email address"/>
                                                    <span className="formErrorMessage">{errors.emailAddress?.message}</span>
                                                </Form.Group>
                                            </Col>
                                        </Form.Row>
                                        <Form.Group className="mb-4" controlId="emailAddress">
                                            <Form.Control as="textarea" {...register("howCanIHelp")} placeholder="Tell me a little bit about how I can help you..." rows={3} />
                                            <span className="formErrorMessage">{errors.howCanIHelp?.message}</span>
                                            <span className="formErrorMessage">{submitError}</span>
                                        </Form.Group>
                                        <Form.Group className="mt-4" controlId="back">
                                            <Button variant="theme" type="submit" disabled={isSubmitting}>
                                                {isSubmitting ? 'Submitting...' : 'Submit'}
                                            </Button>
                                        </Form.Group>
                                    </Form>
                                    <Link href="#"><a onClick={() => setisContactClicked(false)} className="position-absolute close-btn"><img src="/images/close.svg" /></a></Link>
                                </div>
                            }
                        </Col>
                    </Row>
                </Container>
            </motion.div>
        </main>
    );
}

