const intialiseState={
    BrandName:'',
    CompanyName:'',
}

export default (state = intialiseState, action) =>{
    switch(action.type){
        case "SET_BRAND_NAME":
            return{
                ...state,
                BrandName: action.payload
            };
        case "SET_COMPANY_NAME":
            return{
                ...state,
                CompanyName: action.payload
            };
            case "CLEAR_BRAND":
                return{
                    ...state,
                    BrandName:'',
                    CompanyName:''
                };
            default:
                return state;  
        }
    }