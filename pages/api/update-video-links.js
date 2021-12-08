const firebaseAdmin = require("./_firebase");
const encryptor = require('simple-encryptor')(process.env.NEXT_SECRET_KEY);

const db = firebaseAdmin.firestore();
const adminUsersColl = db.collection("adminUsers");
const videoLinksColl = db.collection("videoLinks");

export default (async (req, res) => {
    let payload = JSON.parse(req.body);
    
    payload.emailAddress = payload.emailAddress ? payload.emailAddress : '';

    const snapshot = await adminUsersColl.where('emailAddress' , '==', payload.emailAddress).get();

    if (snapshot.empty) {
        return res.status(401).json({ success: false, message: 'Something went wrong! Please login and try again.' });
    }

    let adminUser = snapshot.docs.map(doc => Object.assign(doc.data(), {id: doc.id}))[0];
    let adminPassword = encryptor.decrypt(adminUser.password);
    payload.password = encryptor.decrypt(payload.password);

    if (adminPassword !== payload.password) {
        return res.status(401).json({ success: false, message: 'Something went wrong! Please login and try again.' });
    }

    await videoLinksColl.doc('video_links').update(payload.pagesAreasLinks, {merge: true});

    return res.status(200).json({ success: true, message: "Video links are updated" });
});