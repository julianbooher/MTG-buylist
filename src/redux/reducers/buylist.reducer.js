const buylistReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_BUYLIST':
        return action.payload;
      case 'UNSET_BUYLIST':
        return [];
      default:
        return state;
    }
  };

  export default buylistReducer;