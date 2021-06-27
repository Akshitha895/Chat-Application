import { takeLatest, put, all, call, select } from "redux-saga/effects";
import { apiEndpoints } from "../../../api/variables";
import { actions, addUserPost, getUserPosts, getUsers } from "./slice";

function* fetchUsers(action) {
  const response = yield call(() =>
    fetch(apiEndpoints.getUsers)
      .then((response) => response.json())
      .then((json) => json)
  );
  yield put(actions.setUsers(response));
}

function* fetchPosts(action) {
  const {
    users: { selectedUser },
  } = yield select();
  const response = yield call(() =>
    fetch(apiEndpoints.getPostsByUserId(selectedUser?.id))
      .then((response) => response.json())
      .then((json) => json)
  );
  yield put(actions.setUserPosts(response));
}

function* UploadUserPost({ payload: { data } }) {
  const {
    users: { posts },
  } = yield select();
  const response = yield call(() =>
    fetch(apiEndpoints.addPosts, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => json)
  );
  yield put(actions.setUserPosts([...posts, response]));
}

export default function* usersSaga() {
  yield all([
    yield takeLatest(getUsers, fetchUsers),
    yield takeLatest(getUserPosts, fetchPosts),
    yield takeLatest(addUserPost, UploadUserPost),
  ]);
}
