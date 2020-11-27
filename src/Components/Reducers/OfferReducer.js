const intialiseState = {
   Name : '',
   Caption : '',
   Price : '',
   MaxPrice : '',
   MinPrice : '',
   Description : '',
   Code : '',
   StartDate : '',
   EndDate : '',
   TermsCondition : '',
   ShowOnWebsite :'Yes',
   ShowOnWebsiteData : [
    { value: "Yes", label: "Yes" },
    { label: "No", value: "No" }
  ],
  };
  
  export default (state = intialiseState, action) => {
    switch (action.type) {
      case "SET_NAME":
        return {
          ...state,
         Name: action.payload
        };
      case "SET_CAPTION":
        return {
          ...state,
         Caption: action.payload
        };
      case "SET_PRICE":
        return {
          ...state,
          Price: action.payload
        };
      case "SET_MAX_PRICE":
        return {
          ...state,
          MaxPrice: action.payload
        };
        case "SET_MIN_PRICE":
          return {
            ...state,
            MinPrice: action.payload
          };
      case "SET_DESCRIPTION":
        return {
          ...state,
          Description: action.payload
        };
        case "SET_CODE":
        return {
          ...state,
          Code: action.payload
        };
      case "SET_START_DATE":
        return {
          ...state,
          StartDate: action.payload
        };
      case "SET_END_DATE":
        return {
          ...state,
          EndDate: action.payload
        };
      case "SET_TERMS_CONDITION":
        return {
          ...state,
          TermsCondition: action.payload
        };
      case "SET_SHOW_ON_WEBSITE":
        return {
          ...state,
          ShowOnWebsite: action.payload
        };
      
      case "CLEAR_DATA":
        return {
          ...state,
  
          Name : '',
          Caption : '',
          Price : '',
          MaxPrice : '',
          MinPrice : '',
          Description : '',
          Code : '',
          StartDate : '',
          EndDate : '',
          TermsCondition : '',
          ShowOnWebsite :'Yes',
        };
  
      default:
        return state;
    }
  };
  