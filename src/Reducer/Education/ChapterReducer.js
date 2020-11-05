const intialiseState={
    Title:'',
    Duratation:'',
    Description : '',
}
export default (state = intialiseState, action) =>{
    switch(action.type){
       
        case "SET_NAME":
            return{
                ...state,
                Name: action.payload
            };
            case "CLEAR_NAME":
                return{
                    ...state,
                    Name:''
                };
            default:
                return state;  
        }
    }