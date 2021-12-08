import sendMail from "./sendMail";

export default (async (req, res) => {
    let payload = JSON.parse(req.body);
    
    let html = "";
    html += `<strong>Name: </strong>${payload.name}<br/>`;
    html += `<strong>Email: </strong>${payload.emailAddress}<br/>`;
    html += `<strong>Message: </strong>${payload.howCanIHelp}<br/>`;

    let mailDetails = {
        to: process.env.ANUSHA_CONTACT_EMAIL,
        subject: 'Contact email from Anusha',
        html: html
    };

    try {
        let result = await sendMail(mailDetails);
        res.status(200).json(result);
    }
    catch (e) {
        res.status(200).json({
            success: false,
            message: "Something went wrong."
        });
    }
});