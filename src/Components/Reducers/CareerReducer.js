const intialiseState={
    JobTitle:'',
    Country:'',
    State:'',
    City:'',
    EmploymentType:'',
    Time:'',

}

export default (state = intialiseState, action) =>{
    switch(action.type){
        case "SET_JOB_TITLE":
            return{
                ...state,
                JobTitle: action.payload
            };
        case "SET_COUNTRY":
            return{
                ...state,
                Country: action.payload
            };
            case "SET_STATE":
            return{
                ...state,
                State: action.payload
            };
            case "SET_CITY":
            return{
                ...state,
                City: action.payload
            };
            case "SET_EMPLOYMENT_TYPE":
            return{
                ...state,
                EmploymentType: action.payload
            };
            case "SET_TIME":
            return{
                ...state,
                Time: action.payload
            };
            case "CLEAR_JOB":
                return{
                    ...state,
                    JobTitle:'',
                    Country:'',
                    State:'',
                    City:'',
                    EmploymentType:'',
                    Time:'',
                
                };
            default:
                return state;  
        }
    }