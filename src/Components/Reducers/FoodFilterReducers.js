const intialiseState={
    FoodFilter:''
}
export default (state = intialiseState, action) =>{
    switch(action.type){
       
        case "SET_FOOD_FILTER":
            return{
                ...state,
                FoodFilter: action.payload
            };
            case "CLEAR_Food":
                return{
                    ...state,
                    FoodFilter:''
                };
            default:
                return state;  
        }
    }