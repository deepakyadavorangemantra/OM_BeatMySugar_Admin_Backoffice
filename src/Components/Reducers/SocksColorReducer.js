const intialiseState={
    SocksColor:''
}
export default (state = intialiseState, action) =>{
    switch(action.type){
       
        case "SET_SOCKS_COLOR":
            return{
                ...state,
                SocksColor: action.payload
            };
            case "CLEAR_COLOR":
                return{
                    ...state,
                    SocksColor:''
                };
            default:
                return state;  
        }
    }