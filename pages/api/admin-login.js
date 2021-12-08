const firebaseAdmin = require("./_firebase");
const encryptor = require('simple-encryptor')(process.env.NEXT_SECRET_KEY);

const db = firebaseAdmin.firestore();
const adminUsersColl = db.collection("adminUsers");

export default (async (req, res) => {
    let payload = JSON.parse(req.body);
    
    payload.emailAddress = payload.emailAddress ? payload.emailAddress : "";
    
    const snapshot = await adminUsersColl.where('emailAddress', "==", payload.emailAddress).get();

    if (snapshot.empty) {
        return res.status(401).json({ success: false, message: 'Email or password doesn\'t match' });
    }

    let adminUser = snapshot.docs.map(doc => Object.assign(doc.data(), {id: doc.id}))[0];

    let adminPassword = encryptor.decrypt(adminUser.password);

    if (adminPassword !== payload.password) {
        return res.status(401).json({ success: false, message: 'Email or password doesn\'t match' });
    }

    payload.password = encryptor.encrypt(payload.password);

    return res.status(200).json({ success: true, data: payload });
});