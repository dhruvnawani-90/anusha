import React, { useState, useRef } from "react"
import * as yup from "yup"
import Link from 'next/link'
import { ToastContainer, toast } from "react-toastify"
import { useCookies } from "react-cookie"
import { parseCookies } from "../utils/helpers"
import { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_LOGIN_ROUTE } from "../utils/constants"
import { useForm } from "react-hook-form"
import getAbsoluteURL from "../utils/getAbsoluteURL"
import { yupResolver } from "@hookform/resolvers/yup"
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import randomstring from 'randomstring';

const schema = yup.object().shape({
    magicCode: yup.string().required().label("* Magic code"),
});

function AdminMagicCodeGenerate({magicCodeProp}) {
    const [submitError, setSubmitError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [magicCodeLength, setMagicCodeLength] = useState(6);
    const [cookie, setCookie] = useCookies([ADMIN_EMAIL, ADMIN_PASSWORD]);
    const formRef = useRef(null);
    const { register, handleSubmit, formState: { errors }, setValue} = useForm({
        resolver: yupResolver(schema),
    });
    const regenerateMagicCode = () => {
        let magicCode = randomstring.generate({
            length: magicCodeLength,
            charset: 'alphanumeric'
        });
        setValue("magicCode", magicCode);
        const form = formRef.current;
        if (form) {
          if (typeof form.requestSubmit === "function") {
            form.requestSubmit();
          } else {
            form.dispatchEvent(new Event("submit", { cancelable: true }));
          }
        }
    }
    const onSubmit = async (magicCode) => {
        const endpoint = getAbsoluteURL(
            "/api/regenerate-magic-code"
        );
        setIsSubmitting(true);
        setSubmitError(false);
        let data = {
            magicCode: magicCode
        }
        data.emailAddress = cookie[ADMIN_EMAIL];
        data.password = cookie[ADMIN_PASSWORD];
        const response = await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify(data)
        });
        const responseJSON = await response.json();
        if (!responseJSON.success) {
            setSubmitError(responseJSON.message);
        }
        else {
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
        <main>
            <ToastContainer />
            <div className="main-wrapper auth">
                <Container> 
                    <Row>
                        <Col lg={12}>
                            <div className="auth-wrapper">
                                <h2 className="mb-4">All greatness needs <span>some</span> effort.</h2>
                                <Form className="auth-form" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Group className="mb-4" controlId="magicCode">
                                        <Form.Control style={{backgroundColor: 'white'}} readOnly defaultValue={magicCodeProp} {...register("magicCode")} type="text" placeholder="Magic code" />
                                        <span className="formErrorMessage">{errors.magicCode?.message}</span>
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="magicCodeLength">
                                        <Form.Control as="select" name="magicCodeLength" onChange={(e) => setMagicCodeLength(e.target.value)} defaultValue={magicCodeProp?.length}>
                                            <option value="6">length</option>
                                            <option value="6">6</option>
                                            <option value="8">8</option>
                                            <option value="16">16</option>
                                            <option value="32">32</option>
                                        </Form.Control>
                                        <span className="formErrorMessage">{submitError}</span>
                                    </Form.Group>
                                    <Button variant="theme" type="button" onClick={regenerateMagicCode} disabled={isSubmitting}>
                                        {isSubmitting ? 'Regenerating...' : 'Regenerate'}
                                    </Button>
                                    <Link href="/pM17AxoOwWbuCBje0xmHKj7PoQVzBH4f"><a className="theme-blue">update videos link</a></Link>
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
    const responseJSON = await response.json();
    const responseStatusCode = await response.status;

    if (responseStatusCode == 401) {
        return {
            redirect: {
                permanent: false,
                destination: `${ADMIN_LOGIN_ROUTE}`
            }
        }
    }

    return {
        props: {
            magicCodeProp: responseJSON.success ? responseJSON.magicCode : ''
        }
    }
}

export default AdminMagicCodeGenerate