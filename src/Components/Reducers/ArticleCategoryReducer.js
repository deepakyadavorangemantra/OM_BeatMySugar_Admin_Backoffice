const intialiseState={
    CategoryName:'',
    Order:'',
}

export default (state = intialiseState, action) =>{
    switch(action.type){
        case "CATEGORYNAME":
            return{
                ...state,
                CategoryName: action.payload
            };
        case "ORDER":
            return{
                ...state,
                Order: action.payload
            };
            case "CLEAR_ARTICLECATEGORY":
                return{
                    ...state,
                    CategoryName:'',
                    Order:''
                };
            default:
                return state;  
        }
    }