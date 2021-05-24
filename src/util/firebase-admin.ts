import admin from 'firebase-admin'
import firebaseCert from '../config/firebaseCert'

export const initialiseDB = ():FirebaseFirestore.Firestore => {

    try {
        return admin.firestore()
    } catch {
        admin.initializeApp({
            credential: admin.credential.cert(firebaseCert)
        })
        return admin.firestore()
    }

}

