const intialiseState={
    Composition:'',
    Division:'',
}

export default (state = intialiseState, action) =>{
    switch(action.type){
        case "SET_COMPOSITION":
            return{
                ...state,
                Composition: action.payload
            };
        case "SET_DIVISION":
            return{
                ...state,
                Division: action.payload
            };
            case "CLEAR_SALT":
                return{
                    ...state,
                    Composition:'',
                    Division:''
                };
            default:
                return state;  
        }
    }