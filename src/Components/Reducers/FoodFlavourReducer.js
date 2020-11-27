const intialiseState={
    FoodFlavour:''
}
export default (state = intialiseState, action) =>{
    switch(action.type){
       
        case "SET_FOODFLAVOUR":
            return{
                ...state,
                FoodFlavour: action.payload
            };
            case "CLEAR_Food":
                return{
                    ...state,
                    FoodFlavour:''
                };
            default:
                return state; 
        }
    }