import React, { useEffect, useState } from 'react'


const Dropdown=(props) =>{

    
   
    const onclickHandler=(type)=>{
    
    }
    
    return(
        <div className="btn-group mt-2 mx-3">
        <div  type="button" className="btn btn-primary" 
        >&nbsp;Filter&nbsp;by&nbsp;Order&nbsp;Status</div>
        <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         
          <i class="fa fa-chevron-down" aria-hidden="true"></i>
          <span className="sr-only">Toggle Dropdown</span>
        </button>
        <div className="dropdown-menu">
          <button onClick={()=>{}} className="dropdown-item bg-white text-dark" >All Orders</button>
          <button onClick={()=>{}} className="dropdown-item bg-white text-dark" >Orders placed</button>
          <button onClick={()=>{}} className="dropdown-item bg-white text-dark" >Orders Assigned</button>
          <button onClick={()=>{}} className="dropdown-item bg-white text-dark" >Orders Failed</button>
          <button onClick={()=>{}} className="dropdown-item bg-white text-dark" >Orders Successfull</button>
          
         </div>
      </div>
    )
}

export default Dropdown