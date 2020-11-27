const intialiseState={
    BookCategoryName:''
}

export default (state = intialiseState, action) =>{
    switch(action.type){
       
        case "SET_BOOK_CATEGORY":
            return{
                ...state,
                BookCategoryName: action.payload
            };
            case "CLEAR_BOOK_CATEGORY":
                return{
                    ...state,
                    BookCategoryName:''
                };
            default:
                return state;  
        }
    }