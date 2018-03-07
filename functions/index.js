const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.setAdminClaimOnNewUser = functions.auth.user().onCreate(
  (event) => {
    const user = event.data;
    admin.auth().setCustomUserClaims(user.uid, { admin: false });
  });
