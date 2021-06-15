import { updateObject } from '../utility';
import * as actionTypes from '../antions/actionTypes';

const initialState = {
    ResourceDetails : null,
    AfterSearchData: null
}

const storeStart = (state, action) => {
    return updateObject( state, { 
        ResourceDetails: action.data,
     } );
};

const storeSearchRes = (state, action) =>{
    return updateObject( state, {
        AfterSearchData: action.data
    })
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.STORE_START: return storeStart(state, action);
        case actionTypes.STORE_SEARCH_RES: return storeSearchRes(state, action);
        default:
            return state;
    }
};

export default reducer;