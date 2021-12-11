import axios from 'axios';

export const START_FETCH = "START_FETCH";

export const FETCH_SUCCESS = "FETCH_SUCCESS";

export const FETCH_FAIL = "FETCH_FAIL";

export const ADD_SMURF = "ADD_SMURF";

export const ERR_GEN = "ERR_GEN";

export const startFetch = () => {
    return({type:START_FETCH})
}

export const fetchSuccess = (smurfData) => {
    return ({type: FETCH_SUCCESS, payload: smurfData})
}

export const fetchFail = (err) => {
    return({type:FETCH_FAIL, payload: err})
}

export const errorGen = (errMessage) => {
    return({type:ERR_GEN, payload: errMessage})
}


export const fetchSmurfs = () => {

    return (dispatch) => {

        dispatch(startFetch());

        axios.get('http://localhost:3333/smurfs')
          .then(resp=> {
            dispatch(fetchSuccess(resp.data));
        })
        .catch(err => {
            dispatch(fetchFail(err));
        });
    }
}

export const addSmurf = (smurf) => {

    return(dispatch) =>{
    axios.post('http://localhost:3333/smurfs', smurf)
    .then(res =>{
        dispatch({type:ADD_SMURF, payload: res.data})
    })
    .catch(err=>{
        dispatch(errorGen)
    })
}
}


//Task List:
//1. Add a thunk action called fetchSmurfs that triggers a loading status display in our application, performs an axios call to retreive smurfs from our server, saves the result of that call to our state and shows an error if one is made.
//2. Add a standard action that allows us to add new smurf (including the name, nickname, position, summary)
//3. Add a standard action that allows us to set the value of the error message slice of state.


