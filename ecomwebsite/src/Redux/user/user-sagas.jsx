import { takeLatest, put, all, call } from "redux-saga/effects";
import UserActionTypes from "./user.types";
import {
  SignInFail,
  SignInSuccess,
  signOutFail,
  signOutSuccess,
  signUpFail,
  signUpSuccess,
} from "./user.actions";

import {
  auth,
  Googleprovider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";

import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";

import { getDoc } from "firebase/firestore";

/* ================= SNAPSHOT HELPER ================= */

export function* getSnapShotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );

    const userSnapShot = yield call(getDoc, userRef);

    yield put(
      SignInSuccess({
        id: userSnapShot.id,
        ...userSnapShot.data(),
      })
    );
  } catch (error) {
    yield put(SignInFail(error));
  }
}

/* ================= SIGN UP ================= */

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createUserWithEmailAndPassword,
      auth,
      email,
      password
    );

    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield call(firebaseSignOut, auth);
    yield put(signUpFail(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield call(getSnapShotFromUserAuth, user, additionalData);
}

/* ================= SIGN IN ================= */

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithPopup, auth, Googleprovider);
    yield call(getSnapShotFromUserAuth, user);
  } catch (error) {
    yield put(SignInFail(error));
  }
}

export function* signInWithEmail({ payload }) {
  try {
    const { email, password } = payload;
    if (!payload) return;

    const { user } = yield call(
      signInWithEmailAndPassword,
      auth,
      email,
      password
    );

    yield call(getSnapShotFromUserAuth, user);
  } catch (error) {
    yield put(SignInFail(error));
  }
}

/* ================= SESSION CHECK ================= */

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;

    yield call(getSnapShotFromUserAuth, userAuth);
  } catch (error) {
    yield put(SignInFail(error));
  }
}

/* ================= SIGN OUT ================= */

export function* signOut() {
  try {
    yield call(firebaseSignOut, auth);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFail(error));
  }
}

/* ================= WATCHERS ================= */

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

/* ================= ROOT SAGA ================= */

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}
