const intialiseState = {
    Title : 'Mr.',
    Name : '',
    Designation : '',
    Address : '',
    Country : '',
    State : '',
    City : '',
    PinCode : '',
    Phone : '',
    MobileNumber : '',
    EmailAddress: ''
}

export default (state = intialiseState, action) => {
    switch (action.type) {

        case "TITLE":
            return {
                ...state,
                Title: action.payload
            };

            case "NAME":
                return {
                    ...state,
                    Name: action.payload
                };

            case "DESIGNATION":
                return {
                    ...state,
                    Designation: action.payload
                };

            case "ADDRESS":
            return {
                ...state,
                Address: action.payload
            };

            case "COUNTRY":
            return {
                ...state,
                Country: action.payload
            };

            case "STATE":
            return {
                ...state,
                State: action.payload
            };

            case "CITY":
            return {
                ...state,
                City: action.payload
            };

            case "PINCODE":
            return {
                ...state,
                PinCode: action.payload
            };

            case "PHONE":
            return {
                ...state,
                Phone: action.payload
            };

            case "MOBILENUMBER":
            return {
                ...state,
                MobileNumber: action.payload
            };

            case "EMAILADDRESS":
            return {
                ...state,
                EmailAddress: action.payload
            };
            case "SET_CLEAR_CONTRIBUTORS":
                return{
                    ...state,
                    Title : 'Mr.',
                    Name : '',
                    Designation : '',
                    Address : '',
                    Country : '',
                    State : '',
                    City : '',
                    PinCode : '',
                    Phone : '',
                    MobileNumber : '',
                    EmailAddress: ''
                }
            

        default:
            return state;


    }
}