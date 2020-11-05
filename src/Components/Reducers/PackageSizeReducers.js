const intialiseState={
   PackagesSize:''
}
export default (state = intialiseState, action) =>{
    switch(action.type){
       
        case "SET_PACKAGE_SIZE":
            return{
                ...state,
                PackagesSize: action.payload
            };
            case "CLEAR_PACKAGE_SIZE":
                return{
                    ...state,
                    PackagesSize:''
                };
            default:
                return state;  
        }
    }