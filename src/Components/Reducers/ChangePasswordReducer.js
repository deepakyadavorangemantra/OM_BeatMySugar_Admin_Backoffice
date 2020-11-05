const initialstate={
    ChangeoldPassword:'',
    ChangenewPassword:'',
    ChangeconfirmPassword:''
 }
 
 export default(state = initialstate,action) =>{
     switch(action.type){
         case 'SET_CHANGEOLDPASSWORD':
             return{
                 ...state,
                 ChangeoldPassword: action.payload
             }
 
             case 'SET_CHANGENEWPASSWORD':
                 return{
                     ...state,
                     ChangenewPassword:action.payload
                 }
 
             case 'SET_CHANGECONFIRMPASSWORD':
                 return{
                     ...state,
                     ChangeconfirmPassword:action.payload
                 }
 
                 case 'CLEAR_CHANGEPASSWORD':
                     return {
                         ...state,
                         changeoldPassword:"",
                         changenewPassword:"",
                         changeconfirmPassword:""
                     };
         
                 default:
                     return state;
     }
            
 }