const intialiseState={
    SubCategoryName:'',
    Order:'',
}

export default (state = intialiseState, action) =>{
    switch(action.type){
        case "SUBCATEGORYNAME":
            return{
                ...state,
                SubCategoryName: action.payload
            };
        case "ORDER":
            return{
                ...state,
                Order: action.payload
            };
            case "CLEAR_ARTICLESUBCATEGORY":
                return{
                    ...state,
                    SubCategoryName:'',
                    Order:''
                };
            default:
                return state;  
        }
    }