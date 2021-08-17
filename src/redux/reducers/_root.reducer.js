import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import searchResults from './searchResults.reducer';
import buylist from './buylist.reducer';


const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  searchResults,
  buylist,
});

export default rootReducer;
