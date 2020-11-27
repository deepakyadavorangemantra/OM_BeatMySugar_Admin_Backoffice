const intialiseState = {
    Category: '',
    SubCategory: 0,
    ArticalTitle: '',
    ShortDescription: '',
    ArticalContent: '',
    Tages: '',
    WrittenByWhome: '',
    ReviewedBy: 0,
    
}

export default (state = intialiseState, action) => {
    switch (action.type) {

        case "CATEGORY":
            return {
                ...state,
                Category: action.payload
            };


        case "SUBCATEGORY":
            return {
                ...state,
                SubCategory: action.payload
            };

            case "ARTICALTITLE":
                return {
                    ...state,
                    ArticalTitle: action.payload
                };

        case "SHORTDESCRIPTION":
            return {
                ...state,
                ShortDescription: action.payload
            };

        case "ARTICALCONTENT":
            return {
                ...state,
                ArticalContent: action.payload
            };

        case "TAGES":
            return {
                ...state,
                Tages: action.payload
            };


        case "WRITTENBYWHOME":
            return {
                ...state,
                WrittenByWhome: action.payload
            };


        case "REVIEWEDBY":
            return {
                ...state,
                ReviewedBy: action.payload
            };

            case "CLEAR":
                return {
                    ...state,
                    Category: '',
                    SubCategory: 0,
                    ArticalTitle: '',
                    ShortDescription: '',
                    ArticalContent: '',
                    Tages: '',
                    WrittenByWhome: '',
                    ReviewedBy: 0,
                };

        default:
            return state;


    }
}