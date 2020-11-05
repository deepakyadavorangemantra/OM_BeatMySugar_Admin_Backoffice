const intialiseState={
    FootwearType:''
}
export default (state = intialiseState, action) =>{
    switch(action.type){
       
        case "SET_FOOTWEAR_TYPE":
            return{
                ...state,
                FootwearType: action.payload
            };
            case "CLEAR_TYPE":
                return{
                    ...state,
                    FootwearType:''
                };
            default:
                return state;  
        }
    }