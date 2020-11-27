const intialiseState={
    FoodCategoryName:''
}

export default (state = intialiseState, action) =>{
    switch(action.type){
       
        case "SET_FOOD_CATEGORY":
            return{
                ...state,
                FoodCategoryName: action.payload
            };
            case "CLEAR_FOOD_CATEGORY":
                return{
                    ...state,
                    FoodCategoryName:''
                };
            default:
                return state;  
        }
    }