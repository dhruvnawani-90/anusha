
import React, { useState, useEffect } from "react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { ToastContainer, toast } from "react-toastify"
import getAbsoluteURL from "../utils/getAbsoluteURL"
import { useRouter } from "next/router";
import Link from "next/link";
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import { parseCookies } from "../utils/helpers"
import { GUEST_MAGIC_CODE } from "../utils/constants"
import { requireAuth } from '../utils/auth'

const schema = yup.object().shape({
    emailAddress: yup.string().email().required().label("Email address"),
    howCanIHelp: yup.string().required().label("How I can help")
});

function RequestMagicCode(props) {
    const { showRequestAccess, setshowRequestAccess } = props;
    const [show, setShow] = useState(false);
    useEffect(() => {
        console.log({ showRequestAccess });
        setShow(showRequestAccess);
    }, [showRequestAccess]);
    const router = useRouter();
    const [mailSendSuccess, setMailSendSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data) => {
        const endpoint = getAbsoluteURL(
            "/api/request-access"
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
    return (
        <main className={`contact-modal ${show ? 'show-contact' : ''}`}>
            <ToastContainer />
            <div className={`main-wrapper auth`}>
                <Container>
                    <Row>
                        <Col lg={12}>
                            {mailSendSuccess ?
                                <div className="auth-wrapper">
                                    <h2 className="mb-2">Your request has been <span>sent.</span></h2>
                                    <p className="text-muted">Sit tight! You will receive an email when your request has been approved.</p>
                                    <Form.Group className="mt-80" controlId="back">
                                        <Button variant="theme" type="button" onClick={() => router.push('/')}>
                                            Ok
                                        </Button>
                                    </Form.Group>
                                </div>
                                :
                                <div className="auth-wrapper">
                                    <a onClick={() => setshowRequestAccess(false)} className="back-button">{'<<<<<<'}<span> Back</span></a>
                                    <h2 className="mb-4">I'd love to <span>hear</span> from you!</h2>
                                    <Form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                                        <Form.Group className="mb-4" controlId="emailAddress">
                                            <Form.Control {...register("emailAddress")} type="text" placeholder="Your email address" autoFocus />
                                            <span className="formErrorMessage">{errors.emailAddress?.message}</span>
                                        </Form.Group>
                                        <Form.Group className="mb-4" controlId="emailAddress">
                                            <Form.Control as="textarea" {...register("howCanIHelp")} placeholder="Tell me a little bit about how I can help you..." rows={3} />
                                            <span className="formErrorMessage">{errors.howCanIHelp?.message}</span>
                                            <span className="formErrorMessage">{submitError}</span>
                                        </Form.Group>
                                        <Form.Group className="mt-4" controlId="back">
                                            <Button variant="theme" type="submit" disabled={isSubmitting}>
                                                {isSubmitting ? 'Requesting...' : 'Request access'}
                                            </Button>
                                        </Form.Group>
                                    </Form>
                                    <a onClick={() => setshowRequestAccess(false)} className="position-absolute close-btn cursor-pointer"><img src="/images/close.svg" /></a>
                                </div>
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        </main>
    );
}

export async function getServerSideProps({ req, res }) {
    const data = parseCookies(req);
    let responseJSON = await requireAuth(data[GUEST_MAGIC_CODE], req);
    if (responseJSON.success) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        }
    }

    return {
        props: {}
    }
}

export default RequestMagicCode;