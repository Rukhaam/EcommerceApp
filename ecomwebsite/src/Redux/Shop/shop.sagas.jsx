import { takeLatest, call, put, all } from "redux-saga/effects";
import ShopActionTypes from "./shop.types";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebase.utils";
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailiure,
} from "./shop.action";
import { convertCollectionsSnapShotToMap } from "../../firebase/firebase.utils";


export function* fetchCollectionsAsync() {
  try {
    console.log("i am fired");

    const collectionRef = collection(firestore, "collections");
    const snapShot = yield call(getDocs, collectionRef);

    const collectionsMap = yield call(
      convertCollectionsSnapShotToMap,
      snapShot
    );

    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailiure(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
