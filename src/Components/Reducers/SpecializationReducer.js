const intialiseState={
    Specialization:''
}
export default (state = intialiseState, action) =>{
    switch(action.type){
       
        case "SET_SPECIALIZATION":
            return{
                ...state,
                Specialization: action.payload
            };
            case "CLEAR_SPECIALIZATION":
                return{
                    ...state,
                    Specialization:''
                };
            default:
                return state;  
        }
    }