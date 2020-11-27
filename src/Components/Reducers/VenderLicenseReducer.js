const intialiseState={
    Type:''
}
export default (state = intialiseState, action) =>{
    switch(action.type){
       
        case "SET_TYPE":
            return{
                ...state,
                Type: action.payload
            };
            case "CLEAR_TYPE":
                return{
                    ...state,
                    Type:''
                };
            default:
                return state;  
        }
    }