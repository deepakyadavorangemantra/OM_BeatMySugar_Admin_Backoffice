const intialiseState={
    Facility:''
}
export default (state = intialiseState, action) =>{
    switch(action.type){
       
        case "SET_FACILITY":
            return{
                ...state,
                Facility: action.payload
            };
            case "CLEAR_FACILITY":
                return{
                    ...state,
                    Facility:''
                };
            default:
                return state;  
        }
    }