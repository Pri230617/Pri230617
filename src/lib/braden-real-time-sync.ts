import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firestore
const firestore = firebase.firestore();

// Real-time sync function for Braden assessments
export const useBradenRealTimeSync = (limit: number = 10) => {
  const assessmentsRef = firestore.collectionGroup('bradenAssessments');

  const syncAssessments = (callback: (data: any) => void) => {
    const unsubscribe = assessmentsRef
      .orderBy('createdAt', 'desc') // Order by createdAt field
      .limit(limit) // Limit the number of results
      .onSnapshot(snapshot => {
        const assessments = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(assessments);
      });

    return () => unsubscribe();
  };

  return { syncAssessments };
};
