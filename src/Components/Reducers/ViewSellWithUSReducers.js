const intialiseState = {
    CompanyName: "",
    Address: "",
    Country: "",
    State:"",
    City:"",
    Pincode:"",
    Title: 'Dr.',
    Name:"",
    Designation:"",
    Email:"",
    Mobile:"",
    CurrentlyWorking:"",
    About:"",

};

export default (state = intialiseState, action) => {
    switch (action.type) {
      case "SET_COMPANY_NAME":
        return {
          ...state,
          CompanyName: action.payload
        };
        case "SET_ADDRESS":
        return {
          ...state,
          Address: action.payload
        };
        case "SET_COUNTRY":
            return {
              ...state,
              Country: action.payload
            };
        case "SET_STATE":
                return {
                  ...state,
                  State: action.payload
                };
          case "SET_CITY":
                    return {
                      ...state,
                      City: action.payload
             };
             case "SET_PINCODE":
                return {
                  ...state,
                 Pincode: action.payload
         };
         case "SET_TITLE":
            return {
              ...state,
             Title: action.payload
     };
         case "SET_NAME":
            return {
              ...state,
             Name: action.payload
     };
        case "SET_DESIGNATION":
                return {
                ...state,
                Designation: action.payload
        };
        case "SET_EMAIL":
                return {
                ...state,
                Email: action.payload
        };
        case "SET_MOBILE":
                return {
                ...state,
                Mobile: action.payload
        };
        case "SET_WORKING":
                return {
                ...state,
                CurrentlyWorking: action.payload
        };
        case "SET_ABOUT":
                return {
                ...state,
                About: action.payload
        };
        case "SET_CLEAR_SELL":
            return {
              ...state,
              CompanyName: "",
              Address: "",
              Country: "",
              State:"",
              City:"",
              Pincode:"",
              Title: 'Dr.',
              Name:"",
              Designation:"",
              Email:"",
              Mobile:"",
              CurrentlyWorking:"",
              About:"",
          
            };
          default:
            return state;
        }

    
}
