import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* getBuylist(action) {

    const { page, searchParameter } = action.payload;

    try {

        // passes the username and password from the payload to the server
        const searchResults = yield axios.get(`/api/buylist/${page}/${searchParameter}`);
        console.log(searchResults);
        yield put({type: 'SET_BUYLIST', payload: searchResults.data});

    } catch (error) {
        console.log('Error in searchSaga:', error);
    }
}

// worker Saga: will be fired on "REGISTER" actions
function* addToBuylist(action) {

    const { page, searchParameter } = action.payload;

    try {

        // passes the username and password from the payload to the server
        const searchResults = yield axios.get(`/api/search/${page}/${searchParameter}`);
        console.log(searchResults);
        yield put({type: 'SET_BUYLIST', payload: searchResults.data});

    } catch (error) {
        console.log('Error in searchSaga:', error);
    }
}

function* buylistSaga() {
    yield takeLatest('GET_BUYLIST', getBuylist);
    yield takeLatest('ADD_TO_BUYLIST', addToBuylist);
}

export default buylistSaga;