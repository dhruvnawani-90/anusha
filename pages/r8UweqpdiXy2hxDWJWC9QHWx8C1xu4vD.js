import React, { useState } from "react"
import * as yup from "yup"
import { useCookies } from "react-cookie"
import { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_GENERATE_PASSWORD_ROUTE } from "../utils/constants"
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form"
import { parseCookies } from "../utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup"
import getAbsoluteURL from "../utils/getAbsoluteURL"
import { Row, Col, Container, Form, Button } from 'react-bootstrap'

const schema = yup.object().shape({
    emailAddress: yup.string().email().required().label("* Email address"),
    password: yup.string().required().label("* Password")
});

function AdminLoginPage() {
    const router = useRouter();
    const [cookie, setCookie, removeCookie] = useCookies([ADMIN_EMAIL, ADMIN_PASSWORD]);
    const [submitError, setSubmitError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data) => {
        const endpoint = getAbsoluteURL(
            "/api/admin-login"
        );
        setIsSubmitting(true);
        setSubmitError(false);
        const response = await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify(data),
        });
        const responseJSON = await response.json();
        if (responseJSON.success) {
            removeCookie(ADMIN_EMAIL); removeCookie(ADMIN_PASSWORD);
            setCookie(ADMIN_EMAIL, responseJSON.data.emailAddress, {
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true,
            });
            setCookie(ADMIN_PASSWORD, responseJSON.data.password, {
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true,
            });
            router.push(ADMIN_GENERATE_PASSWORD_ROUTE);
        } else {
            setSubmitError(responseJSON.message);
            setIsSubmitting(false);
        }
    }
    return (
        <main>
            <div className="main-wrapper auth">
                <Container> 
                    <Row>
                        <Col lg={12}>
                            <div className="auth-wrapper">
                                <h2 className="mb-4">All greatness needs <span>some</span> effort.</h2>
                                <Form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Group className="mb-4" controlId="emailAddress">
                                        <Form.Control {...register("emailAddress")} type="text" placeholder="Admin email address" autoFocus/>
                                        <span className="formErrorMessage">{errors.emailAddress?.message}</span>
                                        <span className="formErrorMessage">{submitError}</span>
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="password">
                                        <Form.Control {...register("password")} type="password" placeholder="Password" />
                                        <span className="formErrorMessage">{errors.password?.message}</span>
                                    </Form.Group>
                                    <Button variant="theme" type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Logging in...' : 'Login'}
                                    </Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </main>
    );
}

export async function getServerSideProps({req, res}) {
    const data = parseCookies(req);
    const endpoint = getAbsoluteURL(
        "/api/get-admin-magic-code", req
    );
    let payload = {
        emailAddress: data[ADMIN_EMAIL],
        password: data[ADMIN_PASSWORD]
    }
    const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(payload)
    });
    const responseStatusCode = await response.status;

    if (responseStatusCode == 200) {
        return {
            redirect: {
                permanent: false,
                destination: `${ADMIN_GENERATE_PASSWORD_ROUTE}`
            }
        }
    }

    return {
        props: {}
    }
}

export default AdminLoginPage