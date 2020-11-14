import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export type OutComing = {
  total: number;
  categoryId: string;
  description: string;
};

export const saveOutComing = (outComing: OutComing) => {
  return firestore()
    .collection('outComing')
    .doc()
    .set({
      ...outComing,
      date: new Date(),
      ownerId: auth().currentUser?.uid,
    });
};
