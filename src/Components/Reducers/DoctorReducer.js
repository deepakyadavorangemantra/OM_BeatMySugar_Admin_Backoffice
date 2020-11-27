const intialiseState = {
    Title: 'Dr.',
    DoctorName: '',
    MedicalRegistrationId: '',
    Specialization: '',
    StartDateOfPractice: '',
    StartDateOfDiabetesPractice: '',
    OverallExperience: '',
    DiabetesExperience: '',
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
    HomeVisit : 'Yes',
    TeleOnlineConsultation : 'Yes',
    ShowonWebsite : 'Yes',
    Approval : 'Yes',
}

export default (state = intialiseState, action) => {
    switch (action.type) {

        case "TITLE":
            return {
                ...state,
                Title: action.payload
            };

            case "DOCTORNAME":
            return {
                ...state,
                DoctorName: action.payload
            };

            case "MEDICALREGISTRATIONID":
            return {
                ...state,
                MedicalRegistrationId: action.payload
            };

            case "SPECIALIZATION":
            return {
                ...state,
                Specialization: action.payload
            };

            case "STARTDATEOFPRACTICE":
            return {
                ...state,
                StartDateOfPractice: action.payload
            };

            case "STARTDATEOFDIABETESPRACTICE":
            return {
                ...state,
                StartDateOfDiabetesPractice: action.payload
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

            case "CLEAR":
              return  {
                    ...state,
                    Title: 'Dr.',
                    DoctorName: '',
                    MedicalRegistrationId: '',
                    Specialization: '',
                    StartDateOfPractice: '',
                    StartDateOfDiabetesPractice: '',
                    OverallExperience: '',
                    DiabetesExperience: '',
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
                    HomeVisit : 'Yes',
                    TeleOnlineConsultation : 'Yes',
                    ShowonWebsite : 'Yes',
                    Approval : 'Yes',
                }
        default:
            return state;


    }
}