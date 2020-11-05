const intialiseState={
    CompanyName:'',
}

export default (state = intialiseState, action) =>{
    switch(action.type){
       
        case "SET_COMPANY":
            return{
                ...state,
                CompanyName: action.payload
            };
            case "CLEAR_COMPANY":
                return{
                    ...state,
                    CompanyName:''
                };
            default:
                return state;  
        }
    }