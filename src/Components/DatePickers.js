import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
const DatePickers=()=> {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
   
  useEffect(() => {
      

  }, [])
  


    return (
        <>
  
     <li className='nav-item text-dark font-weight-bold mt-2 mx-2' style={{display:'flex'}}>  
   <span style={{marginTop:'9px'}}>From </span><DatePicker
        selected={startDate}
        dateFormat="MM/dd/yyyy"
        onChange={date => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
     className="form-date-picker"
      />

      </li>
     <li className='nav-item text-dark font-weight-bold mt-2 mx-2'  style={{display:'flex'}}>
     <span style={{marginTop:'9px'}}>To </span>
    <DatePicker
        selected={endDate}
        dateFormat="MM/dd/yyyy"
        onChange={date =>setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        className="form-date-picker"
      /> 
     
      
     
     </li>
   
     
        
   

        </>
    )
}


export default DatePickers