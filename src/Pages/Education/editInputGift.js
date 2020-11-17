import React, { useEffect, useState } from 'react';
import {Edit3} from 'react-feather';
import Notiflix from "notiflix";
import GetApiCall from '../../GetApi';
import PostApiCall from '../../Api';

const EditGiftInput =(props)=>{
    const [ giftdeliverytext, setGiftdeliverytext ] = useState(props.giftdeliverytext);
    const [ giftdeliveryData, setGiftdeliveryData ] = useState(props.giftdeliveryData);
    
    const [ showgiftInput, setShowgiftInput ] = useState(props.giftdeliverytext ? false : true);
    

    useEffect( ()=>{
        setGiftdeliverytext(props.giftdeliverytext)
     },[props.giftdeliverytext])

    


      function isValidate(){
        let flag= true;
   
        // if(Question == ''){
        //     flag = false;
        //     Notiflix.Notify.Failure('Please enter chapter Question.')
        // }
        return flag;
      }

      function saveGiftdeliverytext(){
            if(giftdeliverytext &&  giftdeliverytext !=""){
                giftdeliveryData.fld_giftdeliverytext = giftdeliverytext;
                props.saveGiftdeliverytext(giftdeliveryData);
                setShowgiftInput(false)
            }else{
                giftdeliveryData.fld_giftdeliverytext = giftdeliverytext;
                props.saveGiftdeliverytext(giftdeliveryData);
            }
            
      }

        return(
            <React.Fragment>
                 <div >      
                    {showgiftInput ?         
                    <input type="text"  value={giftdeliverytext}  onChange={(e)=>{ setGiftdeliverytext(e.target.value)}} onBlur={()=> saveGiftdeliverytext() } /> 
                    :
                    <>
                    <span>{giftdeliverytext}</span> 
                    <span style={{ float: "right"}}><Edit3 onClick={()=>{ setShowgiftInput(true) }}> </Edit3> </span></>
                    }
                </div>
            </React.Fragment>
        )
    
}
export default EditGiftInput;