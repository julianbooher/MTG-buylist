import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* search(action) {

    const { page, searchParameter } = action.payload;

    try {

        // passes the username and password from the payload to the server
        const searchResults = yield axios.get(`/api/search/${page}/${searchParameter}`);
        console.log(searchResults);
        yield put({type: 'SET_SEARCH_RESULTS', payload: searchResults.data});

    } catch (error) {
        console.log('Error in searchSaga:', error);
    }
}

function* searchSaga() {
  yield takeLatest('SEARCH', search);
}

export default searchSaga;