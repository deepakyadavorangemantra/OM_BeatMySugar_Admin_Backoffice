const intialiseState={
    BookTitle:'',
    AuthorName:'',
    PublishedBy:'',
    Category:0,
    Returnable:'yes',
    ReturnableDays:1,
    HSNCode:'',
    GstRate:'',
    BookSKU:'',
    BookType:'',
    BookLanguage:'',
    BookSize:'',
    BookWeight:'',
    Price:'',
    DiscountPer:0,
    DiscountPrice:'',
    Title:'',
    Keyword:'',
    MetaDescription:'',
    SelectVendor:'',
    VendorItemSKU:'',
    MarginAmount:'',
    BMSMargin:'',
    Packlength:'',
    Packbreadth:'',
    Packheight:'',
    Packunit:'',
    PackWeightUnit:'',
    VolumetricWeight:'',
    Approval:''
}

export default (state = intialiseState, action) =>{
    switch(action.type){
    
        case "SET_BOOK_TITLE":
            return{
                ...state,
                BookTitle: action.payload
            };
            case "SET_AUTHOR_NAME":
                return{
                    ...state,
                    AuthorName: action.payload
                };
            case "SET_PUBLISHED_BY":
                return{
                    ...state,
                    PublishedBy:action.payload
                };
                case "SET_BOOK_CATEGORY":
                    return{
                        ...state,
                        Category:action.payload
                    };
                    case "SET_RETURNABLE":
                        return{
                            ...state,
                            Returnable:action.payload
                        };
                    case "SET_RETURNABLEDAYS":
                        return{
                            ...state,
                            ReturnableDays:action.payload
                        };
                     case "SET_HSN":
                    return{
                        ...state,
                        HSNCode:action.payload
                    };
                case "SET_GST":
                    return{
                        ...state,
                        GstRate:action.payload
                    };
                    case "SET_BOOK_SKU":
                        return{
                            ...state,
                            BookSKU:action.payload
                        };
                        case "SET_BOOK_TYPE":
                            return{
                                ...state,
                               BookType:action.payload
                            };
                        case "SET_LANGUAGE":
                            return{
                                ...state,
                                BookLanguage:action.payload
                            };
                        case "SET_SIZE":
                            return{
                                ...state,
                                BookSize:action.payload
                            };
                        case "SET_WEIGHT":
                            return{
                                ...state,
                                BookWeight:action.payload
                            }
                            case "SET_PRICE":
                                return{
                                    ...state,
                                    Price:action.payload
                                };
                            case "SET_DISCOUNT":
                                return{
                                    ...state,
                                    DiscountPer:action.payload
                                };
                                case "SET_DISCOUNT_PRICE":
                                    return{
                                        ...state,
                                        DiscountPrice:action.payload
                                 };
                                 case "SET_TITLE":
                                     return{
                                         ...state,
                                         Title:action.payload
                                     };
                                case "SET_KEYWORD":
                                    return{
                                        ...state,
                                        Keyword:action.payload
                                    };
                                case "SET_META_DATA":
                                    return{
                                        ...state,
                                        MetaDescription:action.payload
                                    };
                                case "SET_SELECT_VENDOR":
                                    return{
                                        ...state,
                                        SelectVendor:action.payload
                                    };
                                case "SET_VENDOR_ITEM":
                                    return{
                                        ...state,
                                        VendorItemSKU:action.payload
                                    };
                                case "SET_MARGIN_AMOUNT":
                                    return{
                                        ...state,
                                        MarginAmount:action.payload
                                    };
                                case "SET_BMS_MARGIN":
                                    return{
                                        ...state,
                                        BMSMargin:action.payload
                                    };
                                case "SET_APPROVAL":
                                    return{
                                        ...state,
                                        Approval:action.payload
                                    };
                                    case "SET_PACK_LENGTH":
                                        return{
                                            ...state,
                                            Packlength:action.payload
                                        };
                                  case "SET_PACK_BREADTH":
                                        return{
                                            ...state,
                                            Packbreadth:action.payload
                                        };
                                   case "SET_PACK_HEIGHT":
                                            return{
                                                ...state,
                                                Packheight:action.payload
                                            };
                                    case "SET_PACK_UNIT":
                                        return{
                                            ...state,
                                            Packunit:action.payload
                                        };
                                     case "SET_PACK_WEIGHT_UNIT":
                                            return{
                                                ...state,
                                                PackWeightUnit:action.payload
                                            };
                                     case "SET_VOLUMETRIC_WEIGHT":
                                                return{
                                                    ...state,
                                               VolumetricWeight:action.payload
                                             };
                                     
                                

                                case "CLEAR_BOOK":
                                    return{
                                        ...state,
                                        BookTitle:'',
                                        AuthorName:'',
                                        PublishedBy:'',
                                        Category:0,
                                        Returnable:'yes',
                                        ReturnableDays:1,
                                        HSNCode:'',
                                        GstRate:'',
                                        BookSKU:'',
                                        BookType:'',
                                        BookLanguage:'',
                                        BookSize:'',
                                        BookWeight:'',
                                        Price:'',
                                        DiscountPer:0,
                                        DiscountPrice:'',
                                        Title:'',
                                        Keyword:'',
                                        MetaDescription:'',
                                        SelectVendor:'',
                                        VendorItemSKU:'',
                                        MarginAmount:'',
                                        BMSMargin:'',
                                        Packlength:'',
                                        Packbreadth:'',
                                        Packheight:'',
                                        Packunit:'',
                                        PackWeightUnit:'',
                                        VolumetricWeight:'',
                                        Approval:''
                                    };
                                    default:
                                    return state; 
              
                
    }
}
