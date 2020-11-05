const intialiseState={
    Service:''
}
export default (state = intialiseState, action) =>{
    switch(action.type){
       
        case "SET_SERVICE_TYPE":
            return{
                ...state,
                Service: action.payload
            };
            case "CLEAR_SERVICE":
                return{
                    ...state,
                    Service:''
                };
            default:
                return state;  
        }
    }