import sendMail from "./sendMail";

export default (async (req, res) => {
    let payload = JSON.parse(req.body);
    
    let mailDetails = {
        to: process.env.ANUSHA_ADMIN_EMAIL,
        subject: 'Request for PASSWORD',
        html: `<strong>${payload.emailAddress}</strong> is requesting for PASSWORD to access the protected content. <br/><br/>${payload.howCanIHelp}`
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