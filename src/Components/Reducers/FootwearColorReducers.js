const intialiseState={
    FootwearColor:''
}
export default (state = intialiseState, action) =>{
    switch(action.type){
       
        case "SET_FOOTWEAR_COLOR":
            return{
                ...state,
                FootwearColor: action.payload
            };
            case "CLEAR_COLOR":
                return{
                    ...state,
                    FootwearColor:''
                };
            default:
                return state;  
        }
    }