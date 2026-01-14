import ShopActionTypes from "./shop.types";
import { collection, getDocs } from "firebase/firestore";
import {
  firestore,
  convertCollectionsSnapShotToMap
} from "../../firebase/firebase.utils.js";


export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});
export const fetchCollectionsFailiure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAIL,
  payload: errorMessage,
});
// export const fetchCollectionsStartAsync = () => {
//   return async (dispatch) => {
//     try {
//       dispatch(fetchCollectionsStart());

//       const collectionRef = collection(firestore, "collections");
//       const snapshot = await getDocs(collectionRef);

//       const collectionsMap =
//         convertCollectionsSnapShotToMap(snapshot);

//       dispatch(fetchCollectionsSuccess(collectionsMap)); 
//     } catch (error) {
//       dispatch(fetchCollectionsFailiure(error.message));
//     }
//   };
// };
