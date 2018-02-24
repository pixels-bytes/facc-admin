import Firebase from '@firebase/app';
import '@firebase/firestore';
import firebaseConfig from './firebaseConfig';

const firebase = Firebase.initializeApp(firebaseConfig);
export default firebase.firestore();
