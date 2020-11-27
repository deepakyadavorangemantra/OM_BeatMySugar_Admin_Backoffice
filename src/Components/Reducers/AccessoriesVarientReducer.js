const initalState={
  variantName:"",
    size:"",
   color:"",
   length:'',
   breadth:"",
   height:'',
   unitofMeasurementlegth:'',
   weight:'',
   unitofMeasurementweight:'',
   priceMrp:'',
   SelectVendor:'',
   vendorItemSku:'',
   selectBmsMarginOn:'',
   vendorSellingPrice:'',
   discountPercent:'',
   BmsMarginPercent:'',
   MarginAmount:'',
  TitleBar:"",
    Keyword:'',
   Status:'',
   avaibility:''

}

export default (state=initalState,action)=>{
    switch (action.type){
        case  "SET_VARIANTNAME": return {
                  ...state,
                  variantName:action.payload,
                //   brand:action.payload.brand,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload.gender,
                //   country:action.payload.country,
                        }
        case  "SET_SIZENAME": return {
                  ...state,
                //   itemName:action.payload,
                  size:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload.gender,
                //   country:action.payload.country,
                        }
        case  "SET_COLORNAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                  color:action.payload,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload.gender,
                //   country:action.payload.country,
                        }
        case  "SET_LENGTHNAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                length:action.payload,
                //   type:action.payload.type,
                //   gender:action.payload.gender,
                //   country:action.payload.country,
                        }
        case  "SET_BREATHNAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                breadth:action.payload,
                //   gender:action.payload.gender,
                //   country:action.payload.country,
                        }
        case  "SET_HEIGHTNAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                height:action.payload,
                //   country:action.payload.country,
                        }
        case  "SET_LENGTHMEASUREMENTNAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload,
                unitofMeasurementlegth:action.payload,
                        }
        case  "SET_WEIGTHNAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload,
                weight:action.payload,
                        }
        case  "SET_WEIGHTMEASUREMENTNAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload,
                unitofMeasurementweight:action.payload,
                        }
        case  "SET_PRICEMRP": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload,
                priceMrp:action.payload,
                        }
        case  "SET_VENDORNAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload,
                SelectVendor:action.payload,
                        }
        case  "SET_VENDORITEMSKUNAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload,
                vendorItemSku:action.payload,
                        }
        case  "SET_BMSMARGINONNAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                selectBmsMarginOn:action.payload,
                //   country:action.payload.country,
                        }
        case  "SET_VENDORSELLINGPRICENAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload,
                vendorSellingPrice:action.payload,
                        }
        case  "SET_DISCOUNT_PRICE_PERCENT": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload,
                discountPercent:action.payload,
                        }
        case  "SET_BMSMARGINNAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload,
                BmsMarginPercent:action.payload,
                        }
        case  "SET_BMSMARGINAMOUNTNAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload,
                MarginAmount:action.payload,
                        }
        case  "SET_TITLEBARNAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload,
                TitleBar:action.payload,
                        }
        case  "SET_KEYWORDNAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload,
                Keyword:action.payload,
                        }
        case  "SET_STATUSNAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload,
                Status:action.payload,
                        }
        case  "SET_AVAIBILITYNAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload,
                avaibility:action.payload,
                        }
                        
            default :
            return state

    }
   
}