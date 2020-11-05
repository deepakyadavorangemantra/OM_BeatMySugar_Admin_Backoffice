const intialiseState={
    SocksSize:''
}
export default (state = intialiseState, action) =>{
    switch(action.type){
       
        case "SET_SOCKS_SIZE":
            return{
                ...state,
                SocksSize: action.payload
            };
            case "CLEAR_SIZE":
                return{
                    ...state,
                    SocksSize:''
                };
            default:
                return state;  
        }
    }