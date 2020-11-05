const intialiseState={
    Qualification:''
}
export default (state = intialiseState, action) =>{
    switch(action.type){
       
        case "SET_QUALIFICATION":
            return{
                ...state,
                Qualification: action.payload
            };
            
            case "CLEAR_QUALIFICATION":
                return{
                    ...state,
                    Qualification:''
                };
            default:
                return state;  
        }
    }