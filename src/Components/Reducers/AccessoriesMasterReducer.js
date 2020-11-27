const initalState={
    itemName:"",
    brand:"",
    companyName:"",
    category:'',
    type:'',
    gender:'',
    country:'',
    description:'',
    returnday:'',
    returnable:'',
    hsncode:"",
    gstrate:""

}

export default (state=initalState,action)=>{
    switch (action.type){
        case  "SET_ITEMNAME": return {
                  ...state,
                  itemName:action.payload,
                //   brand:action.payload.brand,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload.gender,
                //   country:action.payload.country,
                        }
        case  "SET_BRANDNAME": return {
                  ...state,
                //   itemName:action.payload,
                  brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload.gender,
                //   country:action.payload.country,
                        }
        case  "SET_COMPANYNAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                  companyName:action.payload,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload.gender,
                //   country:action.payload.country,
                        }
        case  "SET_CATEGORYNAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                  category:action.payload,
                //   type:action.payload.type,
                //   gender:action.payload.gender,
                //   country:action.payload.country,
                        }
        case  "SET_TYPENAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                  type:action.payload,
                //   gender:action.payload.gender,
                //   country:action.payload.country,
                        }
        case  "SET_GENDERNAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                  gender:action.payload,
                //   country:action.payload.country,
                        }
        case  "SET_COUNTRYNAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload,
                  country:action.payload,
                        }
        case  "SET_DESCRIPTIONNAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload,
                description:action.payload,
                        }
        case  "SET_RETURNNAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload,
                returnday:action.payload,
                        }
        case  "SET_RETURNABLENAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload,
                returndable:action.payload,
                        }
        case  "SET_HSNNAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload,
                hsncode:action.payload,
                        }
        case  "SET_GSTNAME": return {
                  ...state,
                //   itemName:action.payload,
                //   brand:action.payload,
                //   companyName:action.payload.companyName,
                //   category:action.payload.category,
                //   type:action.payload.type,
                //   gender:action.payload,
                gstrate:action.payload,
                        }
                        
            default :
            return state

    }
   
}