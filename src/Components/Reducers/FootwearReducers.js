const intialiseState={
    ItemName:'',
    Gender:'Male',
    Type:0,
    Brand:0,
    CompanyName:0,
    ManufactureName:0,
    MarketerName:0,
    Returnable:'Yes',
    ReturnableDays:1,
    HSNCode:'',
    GstRate:'',
    ItemSkuBms:'',
    VarientName:'',
    Size:'',
    Color:'',
    PackagingSizeVolumetric:'',
    PackageWeight:'',
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
    Approval:'',
    Packlength:'',
    Packbreadth:'',
    Packheight:'',
    Packunit:'',
    PackWeightUnit:'',
    VolumetricWeight:''

 }

 export default (state = intialiseState, action) =>{
    switch(action.type){
    
        case "SET_ITEM_NAME":
            return{
                ...state,
            ItemName: action.payload
            };
            case "SET_GENDER":
                return{
                    ...state,
                    Gender:action.payload
                };
            case "SET_TYPE":
                return{
                    ...state,
                    Type:action.payload
                };
        case "SET_BRAND":
            return{
                ...state,
                Brand:action.payload
            };

        case "SET_COMPANY_NAME":
        return{
            ...state,
            CompanyName:action.payload
        };
        case "SET_MANUFACTURER":
            return{
                ...state,
                ManufactureName:action.payload
            };
        case "SET_MARKETER_NAME":
            return{
                ...state,
                MarketerName:action.payload
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
            case "SET_ITEM_SKU_BMS":
                return{
                    ...state,
                    ItemSkuBms:action.payload
                };
            case "SET_VARIENT_NAME":
                return{
                    ...state,
                    VarientName:action.payload
                };
            case "SET_SIZE":
                return{
                    ...state,
                    Size:action.payload
                };
                case "SET_COLOR":
                    return{
                        ...state,
                        Color:action.payload
                    };
            case "SET_PACKAGING_SIZE_VOLUMETRIC":
                return{
                    ...state,
                    PackagingSizeVolumetric:action.payload
                };
                case "SET_PACKAGE_WEIGHT":
                    return{
                        ...state,
                        PackageWeight:action.payload
                    };
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
                             
                    case "CLEAR_FOOTWEARITEM":
                        return{
                            ...state,
                            ItemName:'',
                            Gender:'Male',
                            Type:0,
                            Brand:0,
                            CompanyName:0,
                            ManufactureName:0,
                            MarketerName:0,
                            
                            Returnable:'Yes',
                            ReturnableDays:1,
                            HSNCode:'',
                            GstRate:'',
                            
                            ItemSkuBms:'',
                            VarientName:'',
                            Size:'',
                            Color:'',
                            PackagingSizeVolumetric:'',
                            PackageWeight:'',
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
                            Approval:'',
                            Packlength:'',
                            Packbreadth:'',
                            Packheight:'',
                            Packunit:'',
                            PackWeightUnit:'',
                            VolumetricWeight:''
                        };
                        default:
                            return state;  


}
}