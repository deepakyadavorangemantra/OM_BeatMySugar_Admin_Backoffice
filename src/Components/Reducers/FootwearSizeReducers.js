const intialiseState={
    FootwearSize:''
}
export default (state = intialiseState, action) =>{
    switch(action.type){
       
        case "SET_FOOTWEAR_SIZE":
            return{
                ...state,
                FootwearSize: action.payload
            };
            case "CLEAR_SIZE":
                return{
                    ...state,
                    FootwearSize:''
                };
            default:
                return state;  
        }
    }