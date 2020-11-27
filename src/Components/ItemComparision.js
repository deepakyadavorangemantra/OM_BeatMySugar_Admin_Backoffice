import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ItemComparisionExtraGrids from './ItemComparisionExtraGrids'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Notiflix from "notiflix";
import GetApiCall from '../GetApi';
import moment from 'moment'

 class ItemComparision extends Component {

  state={
    status:"No Status Selected",
    category:"No Category Selected",
    startDate:null,
    startDate2:null,
    productData:[],
    categoryType:"No Category Selected"
  }

  componentDidMount(){
    Notiflix.Loading.Init({
        svgColor : '#507dc0'
       
      });

  
      Notiflix.Loading.Dots('Please wait...');
  
      GetApiCall.getRequest("GetOrderDetailDataReport").then(resultdes =>
        resultdes.json().then(obj => {
            this.setState({    
            productData : obj.data
          })
           Notiflix.Loading.Remove()
            // console.log(obj.data)
        }))
  }
    

getReportHandler=()=>{

}
Dropdown=() =>{
        
    return(
        <div className="btn-group mt-2 mx-3">
       
        <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        &nbsp;Select&nbsp;Batch&nbsp;Report&nbsp;
          <i class="fa fa-chevron-down" aria-hidden="true"></i>
          <span className="sr-only">Toggle Dropdown</span>
        </button>
        <ul className="dropdown-menu  scrollable-menu">
         <li> <a  href="#" onClick={()=>{this.setState({categoryType:"Food"})}} className="dropdown-item bg-white text-dark" >Food</a></li>
         <li> <a  href="#" onClick={()=>{this.setState({categoryType:"Footware"})}} className="dropdown-item bg-white text-dark" >Footware</a></li>
         <li> <a  href="#" onClick={()=>{this.setState({categoryType:"Socks"})}} className="dropdown-item bg-white text-dark" >Socks</a></li>
  
  
          
         </ul>
      </div>
    )
}

    render() {
         let counter=0;
         let salesDone=0;
       let filteredOrder=[];
      let result=[]
     let ProductFlag='xyz'
     let CategoryFlag='acb'


             const key = 'fld_productid';

    const arrayUniqueByProductId = [...new Map(this.state.productData.map(item =>
         [item[key], item])).values()];

 
         console.log(arrayUniqueByProductId)

             const key2 = 'fld_category';

    const arrayUniqueByCategory = [...new Map(this.state.productData.map(item =>
         [item[key2], item])).values()];

 
         console.log(arrayUniqueByCategory)



       const dateRange=(startDate, endDate)=> {
           console.log(startDate,endDate);
            var start      = startDate.split('/');
            var end        = endDate.split('/');
            var startYear  = parseInt(start[2]);
            var endYear    = parseInt(end[2]);
            var dates      = [];
          
            for(var i = startYear; i <= endYear; i++) {
              var endMonth = i != endYear ? 11 : parseInt(end[0]) - 1;
              var startMon = i === startYear ? parseInt(start[0])-1 : 0;
              for(var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j+1) {
                var month = j+1;
                var displayMonth = month < 10 ? '0'+month : month;
                dates.push([displayMonth, '01',i].join('/'));
              }
            }
            return dates;
          }
        // console.log(dateRange(moment(this.state.startDate).format('L'),moment(this.state.startDate2).format('L')))

    //   console.log(moment(this.state.startDate).format('ll'))
     let a=moment(this.state.startDate)
     let b=moment(this.state.startDate2)
     let differenceMonth=b.diff(a,'months')
     var dummeyArray = dateRange(moment(this.state.startDate).format('L'),moment(this.state.startDate2).format('L'))
     dummeyArray=dummeyArray.map((date=>{
         return moment(date).format('ll')
     }))
    //   console.log(dummeyArray,"hhhhhhhhh");
    //   console.log(b.diff(a,'months'));

    let FilteredOrder=[]
        return (
            <div>
                <div class="content-page">
            
            <div class="content">
              <div class="container-fluid">
                
                    <div class="row page-title">
                        <div class="col-md-12">
                            <nav aria-label="breadcrumb" class="float-right mt-2">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Reports</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Item Comparision
                                    </li>
                                </ol>
                            </nav>
                            <div style={{marginTop:'4%',
                        marginLeft:"12%"}} className ='row pt-2 mb-0 '>
                      <div className="col-md-12 offset-10">
                      <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className='btn btn-primary'
                                table="table-to-xls"
                                filename={"ItemWiseSalesReport"}
                                sheet="tablexls"
                                buttonText="Download as XLS"
                                style={{background: '#060a4a !important',
                                    color: 'white'
                                    
                                }}/>
                      </div>
                  </div>

                            <h4 style={{}} class="mb-1 mt-0">Item Comparision of Sales by Month
                            </h4>
                        </div>
                    </div> 
                   

                   








                    <div className="card card-body  " role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast"  >

                    <div className="row">
                        <div className="col col-xl-5 col-sm-12">
                        <div className="btn-toolbar py-1 pr-4 sw-toolbar sw-toolbar-top justify-content-left" style={{ float: 'left' }}>
                                                                                        {this.Dropdown()}

                                                                                        </div>
                                                                                        <input disabled={true} className="form-control-date mt-2" type='text' value={this.state.categoryType} />
                        </div>
                     
                        <div className="col col-xl-6 col-sm-12">
                            
                            <div className="btn-toolbar py-1 pr-1 sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>
                                                                                         
                                        <label style={{marginTop:'9px',marginRight:'2px',
                                    marginLeft:"2px"}} for="cars"><b>From</b></label>
                                      
                              
                           <DatePicker
                            selected={this.state.startDate}
                            onChange={date => this.setState({...this.state,startDate:date})}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                            className="form-date-picker"
                            placeholderText='Month & Year'
                            />
                           
                                        <label style={{marginTop:'9px',marginRight:'3px',
                                    marginLeft:"3px"}} for="cars"><b>To</b></label>
                                     
                          
                           <DatePicker
                            selected={this.state.startDate2}
                            onChange={date => this.setState({...this.state,startDate2:date})}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                            className="form-date-picker"
                            placeholderText='Month & Year'

                            />
                                                                                        </div>
                        </div>
                    </div>
                                                                 
                                                                </div>
                 
                                   



                   
                                                                <div style={{ marginTop:"-8px",
                        marginLeft:"13%"}} className ='row mt-0 mb-1' >
                          <div className="col-md-12 offset-10">
                       <button  style={{border:"0px"}} 
                    //    onClick={()=>this.getReportHandler()}
                        className='btn btn-primary'>Get Reports</button>  
                  </div>  
                        </div>
            

                                                                <div className="row">
          
          <div className="col-xl-12">
          <div className="card reportcard">
              <div className="card-body">
                 
              <table id="table-to-xls"  className="table table-hover table-nowrap mb-0  table-responsive">
                   
                  
           <thead>
             <tr style={{textAlign:'center'}}>
              <th style={{color:"black",
             backgroundColor:"white"}}></th>
              <th  style={{color:"black",
             backgroundColor:"white"}}></th>
              
             
              <th colSpan='3'  style={{color:"black",
             backgroundColor:"white",
             fontWeight:'600',
             fontSize:'1.531rem'}} >Item Comparision Report</th> 
             
              <th style={{color:"black",
             backgroundColor:"white"}} ></th>
              <th style={{color:"black",
             backgroundColor:"white"}} ></th>
              <th  style={{color:"black",
             backgroundColor:"white"}}></th>
             </tr>
             <tr>
                 <th></th>
                 <th></th>
                 <th></th>
                 <th></th>
                
                 <th></th>
                {dummeyArray&& dummeyArray.map((date,i)=>{
                    return   <th key={i} style={{textAlign:"center"}} colSpan='2'>{moment(date).format('MMM YYYY')}</th>

                })}
                 
             </tr>
                      <tr>
                   <th>Item SKU</th>
                   <th>Item Name</th>

                   <th>Vendor</th>
                   <th>MRP</th>
                   {dummeyArray&& dummeyArray.map((date,i)=>{
                           return   <Fragment>
                          <th>No. of Items Ordered</th>
                           <th>Total Sales Done</th>
                           </Fragment>

                })} 
</tr>
</thead>
 <tbody> 
 {dummeyArray&& dummeyArray.map((date,i)=>{
  { arrayUniqueByProductId&&arrayUniqueByProductId.map(orderProduct=>{
       return arrayUniqueByCategory&& arrayUniqueByCategory.map(orderCategory=>{
          return  this.state.productData&&this.state.productData.filter(singleOrder=>{
                if(singleOrder.fld_productid===orderProduct.fld_productid&&singleOrder.fld_category===orderCategory.fld_category&&moment(date).isSame(moment(singleOrder.fld_orderdate).format('MMM YYYY'),'month')){
                   filteredOrder.push(singleOrder)
                   return singleOrder
                }
            })
       })
    })}

 })}
{/* {result=Array.from(new Set(filteredOrder.map(s=>{
    return { productId:`${s.fld_productid}`,
  category: s.fld_category}
   }))).map(single=>{
       return {
           id:single.fld_productid,
           month:moment(filteredOrder.find(s=>s.fld_orderdate)).format('MMM YYYY')
       }
   })
   
   }
   {console.log(result)} */}
   {console.log(filteredOrder)}

   {filteredOrder.map(singleOrder=>{
       if(singleOrder.fld_productid!==ProductFlag&&CategoryFlag!==singleOrder.fld_category){
          ProductFlag=singleOrder.fld_productid
          CategoryFlag=singleOrder.fld_category
          
 counter=1;
           salesDone=singleOrder.fld_price; 
       //     result.push({...singleOrder,
       //     counter,
       // salesDone})
           
        
       }
      else if(singleOrder.fld_productid===ProductFlag&&CategoryFlag===singleOrder.fld_category){
       counter+=1
       salesDone+=singleOrder.fld_price
      
      }
      result.push({...singleOrder,
           counter,
       salesDone})

   })}
   {/* {console.log(result)
   console.log(counter),
   console.log(salesDone)
 
   } */}
  </tbody>
       

                               </table>
           
                  </div>
                  </div>
                  </div>
                  </div>


                   </div>
                    </div>

      </div>
            </div>
        );
      
    }
}
export default ItemComparision
