import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* search(action) {

    const { page, searchParameter } = action.payload;

    try {

        // passes the username and password from the payload to the server
        const searchResults = yield axios.post(`/api/search/${page}/${searchParameter}`);
        yield put({type: 'SET_SEARCH_RESULTS', payload: searchResults});

    } catch (error) {
        console.log('Error in searchSaga:', error);
    }
}

function* searchSaga() {
  yield takeLatest('SEARCH', search);
}

export default searchSaga;