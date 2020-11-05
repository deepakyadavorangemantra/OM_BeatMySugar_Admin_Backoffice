const intialiseState={
    DeviceCategoryName:''
}

export default (state = intialiseState, action) =>{
    switch(action.type){
       
        case "SET_DEVICE_CATEGORY":
            return{
                ...state,
                DeviceCategoryName: action.payload
            };
            case "CLEAR_DEVICE_CATEGORY":
                return{
                    ...state,
                    DeviceCategoryName:''
                };
            default:
                return state;  
        }
    }