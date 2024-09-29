import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export const addNewAddressToUser = async (userUid: string, newAddress: string) => {
    try {
        const addressRef = doc(db, 'user', userUid);
        await updateDoc(addressRef, {
            addresses: arrayUnion(newAddress),
        });
        return true;
    } catch (error) {
        console.error("주소 추가에 실패했습니다:", error);
        return false;
    }
};

export const fetchUserAddresses = async (userUid: string) => {
    try {
        const docRef = doc(db, 'user', userUid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data().addresses || [];
        }
    } catch (error) {
        console.error("주소 목록을 불러오는 중 오류 발생:", error);
    }
    return [];
};
