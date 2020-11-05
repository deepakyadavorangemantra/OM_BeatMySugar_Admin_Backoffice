const intialiseState = {
    HealthCenterCode: '',
    HealthCenterType: '',
    HealthCenterName: '',
    Address: '',
    Area: '',
    Landmark: '',
    Country : '',
    State : '',
    City : '',
    Pincode : '',
    Phone : '',
    MobileNumber : '',
    EmailAddress : '',
    WebsiteAddress : '',
    Latitude : '',
    Longitude : '',
    Facilities : '',
    Services : '',
    ShowOnWebsite : 'Yes',
    Approval : ''
}

export default (state = intialiseState, action) => {
    switch (action.type) {

        case "HEALTHCENTERCODE":
            return {
                ...state,
                HealthCenterCode: action.payload
            };

            case "HEALTHCENTERTYPE":
            return {
                ...state,
                HealthCenterType: action.payload
            };

            case "HEALTHCENTERNAME":
            return {
                ...state,
                HealthCenterName: action.payload
            };


            case "ADDRESS":
            return {
                ...state,
                Address: action.payload
            };

            case "AREA":
            return {
                ...state,
                Area: action.payload
            };

            case "LANDMARK":
            return {
                ...state,
                Landmark: action.payload
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
                Pincode: action.payload
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

            case "WEBSITEADDRESS":
            return {
                ...state,
                WebsiteAddress: action.payload
            };

            case "LATITUDE":
            return {
                ...state,
                Latitude: action.payload
            };

            case "LONGITUDE":
            return {
                ...state,
                Longitude: action.payload
            };

            case "FACILITIES":
            return {
                ...state,
                Facilities: action.payload
            };

            case "SERVICES":
            return {
                ...state,
                Services: action.payload
            };

            case "SHOWONWEBSITE":
            return {
                ...state,
                ShowOnWebsite: action.payload
            };

            case "APPROVAL":
            return {
                ...state,
                Approval: action.payload
            };

            case "CLEAR":
            return {
                ...state,
                HealthCenterCode: '',
                HealthCenterType: '',
                HealthCenterName: '',
                Address: '',
                Area: '',
                Landmark: '',
                Country : '',
                State : '',
                City : '',
                Pincode : '',
                Phone : '',
                MobileNumber : '',
                EmailAddress : '',
                WebsiteAddress : '',
                Latitude : '',
                Longitude : '',
                Facilities : '',
                Services : '',
                ShowOnWebsite : 'Yes',
                Approval : ''
            };

        default:
            return state;
    }
}