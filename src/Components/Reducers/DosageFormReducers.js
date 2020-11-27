const intialiseState={
    DosageForm:''
 }
 export default (state = intialiseState, action) =>{
     switch(action.type){
        
         case "SET_DOSAGE_FORM":
             return{
                 ...state,
                 DosageForm: action.payload
             };
             case "CLEAR_DOSAGE":
                 return{
                     ...state,
                     DosageForm:''
                 };
             default:
                 return state;  
         }
     }