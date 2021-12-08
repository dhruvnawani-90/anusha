const firebaseAdmin = require("./_firebase");
const encryptor = require('simple-encryptor')(process.env.NEXT_SECRET_KEY);

const db = firebaseAdmin.firestore();
const magicCodeColl = db.collection("magicCode");
const videoLinksColl = db.collection("videoLinks");

export default (async (req, res) => {
    const {
        query: { from }
    } = req;

    let payload = JSON.parse(req.body);
    
    let snapshot = await magicCodeColl.doc('magic_code').get();
    if (snapshot.empty) {
        return res.status(401).json({ success: false, message: "Incorrect password" });
    }
    snapshot = Object.assign(snapshot.data(), {id: snapshot.id});
    
    let magicCode = encryptor.decrypt(snapshot.magicCode).magicCode;
    
    if (from && from == "requireAuth") {
        payload.magicCode = encryptor.decrypt(payload.magicCode);
    }

    if (payload.magicCode != magicCode) {
        return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    let pageLinks = {};
    let snapshotLinks = await videoLinksColl.doc('video_links').get();
    if (!snapshotLinks.empty) {
        pageLinks = Object.assign(snapshotLinks.data(), {id: snapshotLinks.id});
    }

    return res.status(200).json({ success: true, data: encryptor.encrypt(payload.magicCode), pageLinks: pageLinks });
});