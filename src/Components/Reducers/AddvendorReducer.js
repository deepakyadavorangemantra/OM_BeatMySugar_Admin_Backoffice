const intialiseState={
    VendorName:'',
    GSTIN:'',
    PAN:'',
    TAN:'',
    LicensesType:'',
    LicenseNo:'',
    AccreditionName:'',
    Email:'',
    Address:'',
    Country:'',
    State:'',
    City:'',
    Pincode:'',
    AccountNumber:'',
    BankName:'',
    Branch:'',
    IFSCCode:'',
    ContactPersonName:'',
    Designation:'',
    Department:'',
    PhoneNumber:'',
    MobileNumber:'',
    EmailAddress:'',
    Landmark:'',
    Website:'',

}
export default (state = intialiseState, action) =>{
    switch(action.type){
    
        case "SET_VENDOR_NAME":
            return{
                ...state,
            VendorName: action.payload
            };
        case "SET_GSTIN":
            return{
                ...state,
                GSTIN:action.payload 
            };
        case "SET_PAN":
            return{
                ...state,
                PAN:action.payload
            };
            case "SET_TAN":
                return{
                    ...state,
                    TAN:action.payload
                };
                case "SET_LICENSE_TYPE":
                    return{
                        ...state,
                        LicensesType:action.payload  
                    };
                case "SET_LICENSE_NO":
                    return{
                        ...state,
                        LicenseNo:action.payload
                    };
                case "SET_ACCREDITON_NAME":
                    return{
                        ...state,
                        AccreditionName:action.payload
                    };
                case "SET_EMAIL":
                    return{
                        ...state,
                        Email:action.payload 
                    };
                case "SET_ADDRESS":
                    return{
                        ...state,
                        Address:action.payload
                    };
                case "SET_COUNTRY":
                    return{
                        ...state,
                        Country:action.payload
                    };
                case "SET_STATE":
                    return{
                        ...state,
                        State:action.payload
                    };
                case "SET_CITY":
                    return{
                        ...state,
                        City:action.payload
                    };
                case "SET_PINCODE":
                    return{
                        ...state,
                        Pincode:action.payload
                    };
                case "SET_ACCOUNT_NUMBER":
                    return{
                        ...state,
                        AccountNumber:action.payload
                    };
                case "SET_BANK_NAME":
                    return{
                        ...state,
                        BankName:action.payload
                    };
                case "SET_BRANCH":
                    return{
                        ...state,
                        Branch:action.payload
                    };
                case "SET_IFSC_CODE":
                    return{
                        ...state,
                        IFSCCode:action.payload
                    };
                case "SET_CONTACT_PERSON_NAME":
                    return{
                        ...state,
                        ContactPersonName:action.payload
                    };
                case "SET_DESIGNATION":
                    return{
                        ...state,
                        Designation:action.payload
                    };
                case "SET_DEPARTMENT":
                    return{
                        ...state,
                        Department:action.payload
                    };
                case "SET_PHONE_NUMBER":
                    return{
                        ...state,
                        PhoneNumber:action.payload
                    };
                case "SET_MOBILE_NUMBER":
                    return{
                        ...state,
                        MobileNumber:action.payload
                    };
                case "SET_EMAIL_ADDRESS":
                    return{
                        ...state,
                        EmailAddress:action.payload
                    };
                case "SET_LANDMARK":
                    return{
                        ...state,
                        Landmark:action.payload
                    };
                case "SET_WEBSITE":
                        return{
                            ...state,
                            Website:action.payload
                        };
                    case "SET_CLEAR_VENDOR":
                        return{
                            ...state,
                            VendorName:'',
                            GSTIN:'',
                            PAN:'',
                            TAN:'',
                            LicensesType:'',
                            LicenseNo:'',
                            AccreditionName:'',
                            Email:'',
                            Address:'',
                            Country:'',
                            State:'',
                            City:'',
                            Pincode:'',
                            AccountNumber:'',
                            BankName:'',
                            Branch:'',
                            IFSCCode:'',
                            ContactPersonName:'',
                            Designation:'',
                            Department:'',
                            PhoneNumber:'',
                            MobileNumber:'',
                            EmailAddress:'', 
                            Landmark:'',
                            Website:'',
                        };


                        default:
                        return state; 

    }

}
            
