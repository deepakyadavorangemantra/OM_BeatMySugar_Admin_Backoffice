const intialiseState={
    PackagingType:''
}
export default (state = intialiseState, action) =>{
    switch(action.type){
       
        case "SET_PACKAGE_TYPE":
            return{
                ...state,
                PackagingType: action.payload
            };
            case "CLEAR_PACKAGE_TYPE":
                return{
                    ...state,
                    PackagingType:''
                };
            default:
                return state;  
        }
    }