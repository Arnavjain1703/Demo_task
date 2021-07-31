import * as actionTypes from './action';
const initialState=
{
    loader:false,
    goveSchools:[],
    govt_location:""
}
const reducer =(state=initialState,action)=>
    {
        switch(action.type)
        {   
            case actionTypes.CHANGE_LOADER:
                return {
                    ...state,
                    loader:!state.loader
                }
            case actionTypes.SCHOOLS:
               
                state.goveSchools=action.array;
                console.log(state)
                return {
                    ...state,
                    goveSchools:state.goveSchools
                     
                }  
            default:
                return state;     
        }   
    }
export default reducer