const intialiseState={
    ItemName:'',
    Brand:0,
    CompanyName:0,
    ManufactureName:0,
    MarketerName:0,
    Category:0,
    Filter:'',
   
    Returnable:'Yes',
    ReturnableDays:1,
    HSNCode:'',
    GstRate:'',
    ItemSkuBms:'',
    VarientName:'',
    PackagingType:0,
    PackagingSizeVolumetric:'',
    PackageWeight:'',
    Weight:'',
    UnitOfMeasurement:'',
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
    Color:'',
    Size : ''
   
 
 }
 
         export default (state = intialiseState, action) =>{
             switch(action.type){
             
                 case "SET_ITEM_NAME":
                     return{
                         ...state,
                     ItemName: action.payload
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
                 case "SET_CATEGORY":
                     return{
                         ...state,
                         Category:action.payload
                     };
                 case "SET_FILTER":
                     return{
                         ...state,
                         Filter:action.payload
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
                     case "SET_PACKAGING_TYPE":
                         return{
                             ...state,
                             PackagingType:action.payload
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
                         case "SET_WEIGHT":
                             return{
                                 ...state,
                                 Weight:action.payload
                             };
                         case "SET_UNIT_MEASURE":
                             return{
                                 ...state,
                                 UnitOfMeasurement:action.payload
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
                              case "SET_COLOR":
                                 return{
                                     ...state,
                                     Color:action.payload
                                 };
                                 case "SET_SIZE":
                                    return{
                                        ...state,
                                        Size:action.payload
                                    };
                          
                             case "CLEAR_COVIDITEM":
                                 return{
                                     ...state,
                                     ItemName:'',
                                     Brand:0,
                                     CompanyName:0,
                                     ManufactureName:0,
                                     MarketerName:0,
                                     Category:0,
                                     Filter:'',
                                    
                                     Returnable:'Yes',
                                     ReturnableDays:1,
                                     HSNCode:'',
                                     GstRate:'',
                                     ItemSkuBms:'',
                                     VarientName:'',
                                     PackagingType:'',
                                     PackagingSizeVolumetric:'',
                                     PackageWeight:'',
                                     Weight:'',
                                     UnitOfMeasurement:'',
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
                                     Color:'',
                                 };
                                 default:
                                     return state;  
 
         
     }
 }