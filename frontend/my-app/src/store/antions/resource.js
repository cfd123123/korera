import axios from 'axios';
import * as actionTypes from './actionTypes';

export const storeStart = (data) => {
    return {
        type: actionTypes.STORE_START,
        data:data
    };
};

export const storeSearchRes = (data) =>{
    return{
        type: actionTypes.STORE_SEARCH_RES,
        data:data
    }
}


export const storeResourceAction = () => {
    
    return dispatch => {
        let url = 'http://localhost:8080/resource/getAllResourceDetail';
        //alert("action is triggered")
        axios.get(url)
                .then(response => {
                    console.log(response)
                    console.log(response.data); 
                    dispatch(storeStart(response.data));

                })
                .catch(err => {
                    console.log("errmessage----------------------");
                    console.log(err);
                    alert("cannot load data")
                }); 
    }
   
}

export const storeSearchResult =(name) =>{

    return dispatch => {
        let url = 'http://localhost:8080/resource/searchByName'
        //storeSearchResult()

    axios.get(url,{params: {
                    name:name
                 }})
            .then(response => {
                console.log(response);
                dispatch(storeSearchRes(response.data));
            })
            .catch(err => {
                console.log("search error");
                alert("cannot load searched data")
            });
    }
}
