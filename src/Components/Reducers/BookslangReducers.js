const intialiseState={
    BookLanguage:''
}
export default (state = intialiseState, action) =>{
    switch(action.type){
       
        case "SET_BOOK_LANG":
            return{
                ...state,
                BookLanguage: action.payload
            };
            case "CLEAR_LANG":
                return{
                    ...state,
                    BookLanguage:''
                };
            default:
                return state;  
        }
    }