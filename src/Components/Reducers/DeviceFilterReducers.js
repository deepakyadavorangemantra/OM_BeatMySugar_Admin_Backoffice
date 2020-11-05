const intialiseState={
    DeviceFilter:''
}
export default (state = intialiseState, action) =>{
    switch(action.type){
       
        case "SET_DEVICE_FILTER":
            return{
                ...state,
                DeviceFilter: action.payload
            };
            case "CLEAR_DEVICE_FILTER":
                return{
                    ...state,
                    DeviceFilter:''
                };
            default:
                return state;  
        }
    }