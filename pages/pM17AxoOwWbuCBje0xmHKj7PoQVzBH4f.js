import React, { useEffect, useState } from "react"
import * as yup from "yup"
import validUrl from "valid-url"
import { ToastContainer, toast } from "react-toastify"
import { useCookies } from "react-cookie"
import { parseCookies } from "../utils/helpers"
import { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_LOGIN_ROUTE } from "../utils/constants"
import { useForm } from "react-hook-form"
import getAbsoluteURL from "../utils/getAbsoluteURL"
import { yupResolver } from "@hookform/resolvers/yup"
import { Row, Col, Container, Form, Button } from 'react-bootstrap'

function AdminVideoLinkUpdater({links}) {
    const [submitError, setSubmitError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cookie, setCookie] = useCookies([ADMIN_EMAIL, ADMIN_PASSWORD]);
    const [pages_and_videos] = useState({
        
        adobe_captive: [
            {id: "video_10", text: "AdobeCaptivate Introduction Section"}, {id: "video_11", text: "AdobeCaptivate Introduction Section Popup"}, 
            {id: "video_1", text: "AdobeCaptivate States Section"}, {id: "video_6", text: "AdobeCaptivate States Section Modal"},
            {id: "video_2", text: "Interactions, Conditions and Variables Section"}, {id: "video_7", text: "Interactions, Conditions and Variables Section Popup modal"},
            {id: "video_3", text: "Animations Section"}, {id: "video_8", text: "Animations Section Popup"}, 
            {id: "video_4", text: "State animations Section"}, {id: "video_9", text: "State animations Section Popup"},
            {id: "video_5", text: "Components and widgets Section"}
            
        ],
        adobe_wiki: [
            {id: "video_1", text: "Introduction Section"}, {id: "video_2", text: "The Wijk story Section"}, 
            {id: "video_3", text: "InDesign Section"},{id: "video_9", text: "InDesign Section popup"},
            {id: "video_4", text: "XD Section"}, {id: "video_10", text: "XD Section Popup"},
            {id: "video_5", text: "Campaign orchestration Section"}, {id: "video_6", text: "Creation of assets Section"},
            {id: "video_7", text: "Preview and share"}, {id: "video_8", text: "Collaboration and delivery"}, 
        ],
        adobe_animate: [
            {id: "video_1", text: "Introduction Section"}, {id: "video_2", text: "Header Bar Section"}, 
            {id: "video_3", text: "Full-screen experience Section"}
        ],
        adobe_customer_stories: [
            {id: "video_1", text: "Hyundai EU Section"}, {id: "video_2", text: "Singapore airlines Section"}, 
            {id: "video_3", text: "Mangalore Smart City Section"}
        ]
        
    });
    function isValidUrl(url) {
        return validUrl.isUri(url);
    }
    let schemas = {};
    for (const [page, videos] of Object.entries(pages_and_videos)) {
        for (let i=0; i < videos.length; i++) {
            schemas[`${page}_page_${videos[i]['id']}`] = yup.string("Video link must be a string").required("Video link is required").test('is-valid-url', 'Provide a valid URL', isValidUrl);
        }        
    }
    const { register, handleSubmit, formState: { errors }, setValue} = useForm({
        resolver: yupResolver(yup.object().shape(schemas))
    });
    function capitalizeFirstLetter(value) {
        return value?.charAt(0).toUpperCase() + value?.slice(1);
    }
    function capSplitAndJoin(value) {
        return capitalizeFirstLetter(value).split("_").join(" ");
    }
    useEffect(() => {
        for (const [page, videos] of Object.entries(pages_and_videos)) {
            for (let i=0; i < videos.length; i++) {
                let video_link = (typeof links === "object" && links.hasOwnProperty(page) && links[page].hasOwnProperty(videos[i]['id'])) ? links[page][videos[i]['id']] : '';
                setValue(`${page}_page_${videos[i]['id']}`, video_link);
            }        
        }
    }, []);
    const onSubmit = async (data) => {
        let pagesAreasLinks = {};
        for (const [key, value] of Object.entries(data)) {
            let splitKey = key.split("_page_");
            let page = splitKey[0];
            let area = splitKey[1];
            if (!pagesAreasLinks.hasOwnProperty(page)) pagesAreasLinks[page] = {}
            pagesAreasLinks[page][area] = value;
        }
        const endpoint = getAbsoluteURL(
            "/api/update-video-links"
        );
        setIsSubmitting(true);
        setSubmitError(false);
        let payload = {
            pagesAreasLinks: pagesAreasLinks
        }
        payload.emailAddress = cookie[ADMIN_EMAIL];
        payload.password = cookie[ADMIN_PASSWORD];
        const response = await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify(payload)
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
                                <h2 className="mb-4">Update video links for <span>page</span> without effort.</h2>
                                <Form className="auth-form contact" onSubmit={handleSubmit(onSubmit)}>
                                    {Object.keys(pages_and_videos).map((page, pidx) => (
                                        <div key={pidx}>
                                            <h5 >For {capSplitAndJoin(page)} page</h5>
                                            <Form.Row className="mb-5">
                                            {pages_and_videos[page].map((video, vidx) => (
                                                <Col md={6}>
                                                <Form.Group className="mb-4" key={vidx} controlId={`${page}_page_${video.id}`}>
                                                    <Form.Label>{video.text}</Form.Label>
                                                    <Form.Control defaultValue={(typeof links === "object" && links.hasOwnProperty(page) && links[page].hasOwnProperty(video.id)) ? links[page][video.id] : ''} {...register(`${page}_page_${video.id}`)} type="text"/>
                                                    <span className="formErrorMessage">{errors[`${page}_page_${video.id}`]?.message}</span>
                                                </Form.Group>
                                                </Col>
                                            ))}
                                            </Form.Row>
                                        </div>
                                    ))}
                                    <Form.Group className="mb-4">
                                        <span className="formErrorMessage">{submitError}</span>
                                    </Form.Group>
                                    <Button variant="theme" type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Saving...' : 'Save'}
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
        "/api/get-video-links", req
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
            links: responseJSON.success ? responseJSON.snapshotLinks : {}
        }
    }
}

export default AdminVideoLinkUpdater