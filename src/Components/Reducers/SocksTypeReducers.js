const intialiseState={
    SocksType:''
}
export default (state = intialiseState, action) =>{
    switch(action.type){
       
        case "SET_SOCKS_TYPE":
            return{
                ...state,
                SocksType: action.payload
            };
            case "CLEAR_TYPE":
                return{
                    ...state,
                    SocksType:''
                };
            default:
                return state;  
        }
    }