const intialiseState = {
    Name: '',
    StartDateOfPractice: '',
    OverallExperience: '',
    Qualification: '',
    Institute: '',
    CompletionYear: '',
    MobileNumber : '',
    EmailAddress : '',
    Website : '',
    Facebook : '',
    Twitter : '',
    Linkedin : '',
    Youtube : '',
    Instagram : '',
    HomeVisit : '',
    TeleOnlineConsultation : '',
    ShowonWebsite : '',
    Approval : '',
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

            case "STARTDATEOFPRACTICE":
            return {
                ...state,
                StartDateOfPractice: action.payload
            };


            case "OVERALLEXPERIENCE":
            return {
                ...state,
                OverallExperience: action.payload
            };

            case "DIABETESEXPERIENCE":
            return {
                ...state,
                DiabetesExperience: action.payload
            };

            case "QUALIFICATION":
            return {
                ...state,
                Qualification: action.payload
            };

            case "INSTITUTE":
            return {
                ...state,
                Institute: action.payload
            };

            case "COMPLETIONYEAR":
            return {
                ...state,
                CompletionYear: action.payload
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

            case "WEBSITE":
            return {
                ...state,
                Website: action.payload
            };

            case "FACEBOOK":
            return {
                ...state,
                Facebook: action.payload
            };

            case "TWITTER":
            return {
                ...state,
                Twitter: action.payload
            };

            case "LINKEDIN":
            return {
                ...state,
                Linkedin: action.payload
            };

            case "YOUTUBE":
            return {
                ...state,
                Youtube: action.payload
            };

            case "INSTAGRAM":
            return {
                ...state,
                Instagram: action.payload
            };

            case "HOMEVISIT":
            return {
                ...state,
                HomeVisit: action.payload
            };

            case "TELEONLINECONSULTATION":
            return {
                ...state,
                TeleOnlineConsultation: action.payload
            };

            case "SHOWONWEBSITE":
            return {
                ...state,
                ShowonWebsite: action.payload
            };

            case "APPROVAL":
            return {
                ...state,
                Approval: action.payload
            };

        default:
            return state;


    }
}