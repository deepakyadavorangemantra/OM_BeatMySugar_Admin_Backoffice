const intialiseState={
    ArticalTag:''
}
export default (state = intialiseState, action) =>{
    switch(action.type){
       
        case "SETARTICALTAG":
            return{
                ...state,
                ArticalTag: action.payload
            };
            case "CLEAR_TAG":
                return{
                    ...state,
                    ArticalTag:''
                };
            default:
                return state;  
        }
    }