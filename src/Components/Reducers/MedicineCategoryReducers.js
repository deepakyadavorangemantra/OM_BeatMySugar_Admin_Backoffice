const intialiseState={
    MedicineCategoryName:''
}

export default (state = intialiseState, action) =>{
    switch(action.type){
       
        case "SET_MEDICINE_CATEGORY":
            return{
                ...state,
                MedicineCategoryName: action.payload
            };
            case "CLEAR_MEDICINE_CATEGORY":
                return{
                    ...state,
                    MedicineCategoryName:''
                };
            default:
                return state;  
        }
    }