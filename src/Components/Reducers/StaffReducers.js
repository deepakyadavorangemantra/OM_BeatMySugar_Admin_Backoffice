const intialiseState={
    EmployeeId:'',
    Name:'',
    Mobile:'',
    Email:'',
    DOB:'',
    Gender:'Male',
    FatherName:'',
    MaritalStatus:'Married',
    AnniversaryDate:'',
    BloodGroup:'AB-',
    ChronicDisease:'',
    Description:'',
    Designation:'',
    Department:'',
    UserType:'Admin',
    JoiningDate:'',
    Address:'',
    Country:'',
    State:'',
    City:'',
    Pincode:'',
    Status:'',
    ParmanentAddress:'',
    ParmenentCountry:'',
    ParmenentState:'',
    ParmenentCity:'',
    ParmenentPincode:'',
    AadharCard:'',
    PANCard:'',
    DrivingLicenses:'',
    VehicleNumber:'',
    Password:'',
    ConfirmPassword:'',


}

export default (state = intialiseState, action) =>{
    switch(action.type){
        case "SET_EMPLOYEE_ID":
            return{
                ...state,
                EmployeeId: action.payload
            };
        case "SET_NAME":
            return{
                ...state,
                Name:action.payload
            };
        case "SET_MOBILE":
            return{
                ...state,
                Mobile:action.payload
            };
        case "SET_EMAIL":
            return{
                ...state,
                Email:action.payload
            };
        case "SET_DOB":
            return{
                ...state,
                DOB:action.payload
            };
        case "SET_GENDER":
            return{
                ...state,
                Gender:action.payload
            };
        case "SET_FATHER_NAME":
            return{
                ...state,
                FatherName:action.payload
            };
        case "SET_MARITAL_STATUS":
            return{
                ...state,
                MaritalStatus:action.payload
            };
        case "SET_ANNIVERSARY_DATE":
            return{
                ...state,
                AnniversaryDate:action.payload
            };
        case "SET_BLOOD_GROUP":
            return{
                ...state,
                BloodGroup:action.payload
            };
        case "SET_CHRONIC_DISEASE":
            return{
                ...state,
                ChronicDisease:action.payload
            };
        case "SET_DESCRIPTION":
            return{
                ...state,
                Description:action.payload
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
        case "SET_USER_TYPE":
            return{
                ...state,
                UserType:action.payload
            };
        case "SET_JOINING_DATE":
            return{
                ...state,
                JoiningDate:action.payload
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


            case "SET_PERMANENT_ADDRESS":
            return{
                ...state,
                ParmanentAddress:action.payload
            };
        case "SET_PERMANENT_COUNTRY":
            return{
                ...state,
                ParmanentCountry:action.payload
            };
        case "SET_PERMANENT_STATE":
            return{
                ...state,
                ParmanentState:action.payload
            };
        case "SET_PERMANENT_CITY":
            return{
                ...state,
                ParmanentCity:action.payload
            };
        case "SET_PERMANENT_PINCODE":
            return{
                ...state,
                ParmanentPincode:action.payload
            };
        case "SET_STATUS":
            return{
                ...state,
                Status:action.payload
            };

            case "SET_AADHAR_CARD":
            return{
                ...state,
                AadharCard:action.payload
            };
            case "SET_PAN_CARD":
                return{
                    ...state,
                    PANCard:action.payload
                };
                case "SET_DRIVING_LICENSES":
                    return{
                        ...state,
                        DrivingLicenses:action.payload
                    };
                    case "SET_VEHICLE_NUMBER":
                        return{
                            ...state,
                            VehicleNumber:action.payload
                        };
                        case "SET_PASSWORD":
                            return{
                                ...state,
                                Password:action.payload
                            };
                            case "SET_CONFIRM_PASSWORD":
                                return{
                                    ...state,
                                    ConfirmPassword:action.payload
                                };
             
         case "CLEAR_STAFF":
             return{
                ...state,
                EmployeeId:'',
                Name:'',
                Mobile:'',
                Email:'',
                DOB:'',
                Gender:'Male',
                FatherName:'',
                MaritalStatus:'Married',
                AnniversaryDate:'',
                BloodGroup:'AB-',
                ChronicDisease:'',
                Description:'',
                Designation:'',
                Department:'',
                UserType:'',
                JoiningDate:'',
                Address:'',
                Country:'',
                State:'',
                City:'',
                Pincode:'',
                Status:'',
                ParmanentAddress:'',
                ParmenentCountry:'',
                ParmenentState:'',
                ParmenentCity:'',
                ParmenentPincode:'',
                AadharCard:'',
                PANCard:'',
                DrivingLicenses:'',
                VehicleNumber:'',
                Password:'',
                ConfirmPassword:''
            
          };

             default:
                return state;  
        }
}
