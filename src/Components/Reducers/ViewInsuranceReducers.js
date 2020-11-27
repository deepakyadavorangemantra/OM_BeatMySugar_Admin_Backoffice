const intialiseState = {
    InsuredName:"",
    DOB:"",
    Address:"",
    Email:"",
    Mobile:"",
    TypeOfInsurance:"Health",
    SumAssured:"",
    CurrentDisease:"",
    InsurancePolicy:"",
    SelfDisclosure:"",
    Height:"",
    Weight:""
};

export default (state = intialiseState, action) => {
    switch (action.type) {
      case "SET__NAME":
        return {
          ...state,
          InsuredName: action.payload
        };
        case "SET__DOB":
            return {
              ...state,
              DOB: action.payload
            };
            case "SET__ADDRESS":
                return {
                  ...state,
                  Address: action.payload
                };
                case "SET__EMAIL":
                    return {
                      ...state,
                      Email: action.payload
                    };
                    case "SET__MOBILE":
                        return {
                          ...state,
                          Mobile: action.payload
                        };
                        case "SET__INSURANCE_TYPE":
                            return {
                              ...state,
                              TypeOfInsurance: action.payload
                            };
                            case "SET__SUM":
                                return {
                                  ...state,
                                  SumAssured: action.payload
                                };
                                case "SET__CURRENT_DISEASE":
                                    return {
                                      ...state,
                                      CurrentDisease : action.payload
                                    };
                                    case "SET__POLICY":
                                        return {
                                          ...state,
                                          InsurancePolicy : action.payload
                                        };
                                        case "SET__DISCLOSURE":
                                            return {
                                              ...state,
                                              SelfDisclosure : action.payload
                                            };
                                            case "SET__HEIGHT":
                                                return {
                                                  ...state,
                                                  Height : action.payload
                                                };
                                                case "SET__WEIGHT":
                                                    return {
                                                      ...state,
                                                      Weight : action.payload
                                                    };
                                                    case "SET_CLEAR_INSURANCE":
                                                        return {
                                                          ...state,
                                                          InsuredName:"",
                                                          DOB:"",
                                                          Address:"",
                                                          Email:"",
                                                          Mobile:"",
                                                          TypeOfInsurance:"Health",
                                                          SumAssured:"",
                                                          CurrentDisease:"",
                                                          InsurancePolicy:"",
                                                          SelfDisclosure:"",
                                                          Height:"",
                                                          Weight:""
                                                        };
                                                      default:
                                                        return state;
                                                    }
   
}