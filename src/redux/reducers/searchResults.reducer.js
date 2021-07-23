const searchResultsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SEARCH_RESULTS':
        return action.payload;
      case 'UNSET_SEARCH_RESULTS':
        return [];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default searchResultsReducer;