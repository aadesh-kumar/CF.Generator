import { collection, addDoc, getDoc, setDoc, deleteDoc, doc, query, where, getDocs } from "firebase/firestore";

export const AddUserToFirestore = async (db, User) => {
    try {
        const doc = await addDoc(collection(db, "users"), User);
        console.log("Document written with ID: ", doc.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const checkUserByHandle = async (db, User) => {
    try {
        const q = query(collection(db, "users"), where("handle", "==", User.handle));
        const docObj = await getDocs(q);
        return docObj.docs.length > 0;
    } catch (e) {
        console.error('Error getting user');
    }
}