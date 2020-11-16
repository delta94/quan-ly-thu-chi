import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export type InComing = {
  date: Date;
  total: number;
  categoryId: string;
  description: string;
};

export const saveInComing = (inComing: InComing) => {
  return firestore()
    .collection('inComing')
    .doc()
    .set({
      ...inComing,
      ownerId: auth().currentUser?.uid,
    });
};
