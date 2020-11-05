import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import Notiflix from "notiflix";
import GetApiCall from '../GetApi';
import PostApiCall from '../Api';



class BooksGrid extends Component {
     constructor(props){
         super(props)

         this.state={
           BookData:[],
           AddAccess : false
        }
         
        }
       
        componentDidMount(){
            Notiflix.Loading.Init({
                svgColor : '#507dc0'
               
              });
           
              Notiflix.Loading.Dots('');
    
              GetApiCall.getRequest("GetBookItemMaster").then(resultdes =>
                  resultdes.json().then(obj => {
                 
                  
                    this.setState({
                      BookData : obj.data
                    })
      
      
                  }))

                  var login=localStorage.getItem('LoginDetail');
                  var details=JSON.parse(login)
          
                  PostApiCall.postRequest({
            
                      staffid : details[0].fld_staffid,
                  
                    },"GetUserSubMenuAccessRights").then((resultssub) => 
                    
                      resultssub.json().then(objsub => {  
                      if(resultssub.status == 200 || resultssub.status==201){
          
                     var filteredRights = objsub.data;
                  
                          var con = 0
                          for(var i = 0 ; i< filteredRights.length ;i++){
             
                              if(filteredRights[i].fld_menuname == 'Add Books'){
                  
                                if(filteredRights[i].fld_access == 1){
                        
                                 this.setState({
                                   AddAccess : true
                                 })
                                }
                              }
                             
                            con = con + 1
                            if(con == filteredRights.length){
                                Notiflix.Loading.Remove();
                            }
                          }
                  
          
                      }
          
                  }))
        
        }
         
         
         
         
     
    render(){
        return(
           <div>
          
                     
            <div class="content-page">
            
            <div class="content">
              <div class="container-fluid">
                    <div class="row page-title">
                        <div class="col-md-12">
                            <nav aria-label="breadcrumb" class="float-right mt-1">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Product Management</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Books List
                                    </li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Books List
                            </h4>
                        </div>
                    </div> 

                    <div class="row" style={{display : this.state.AddAccess ? '' : 'none'}}>
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row align-items-center">
                                                                       <div class="col text-right">
                                       <a href='/addbookitemmaster'>
                                       <button 
                                       
                                       class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                               class="uil-plus mr-1"></i>Add New Book</button>
                                  
                                       </a>
                                                                       </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                
                </div>
                    
                    
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                <div class="table-responsive">
                                <table id="basic-datatable" class="table dt-responsive nowrap">
                                <thead>
                                    <tr>
                                   

                                    <th>Item Code</th>
                                        <th>Book Title</th>
                                        <th>Author Name</th>
                                        <th>Publisher</th>
                                        <th>HSN Code</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                       
                                       
                                       
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.BookData.length == 0 ? 
                                <tr><td colSpan={7} style={{textAlign:'center'}}>No Book Item Master Available</td></tr> : 
                                ''} 

                                {this.state.BookData.map((data,index)=>(
                                           
                                           
                                       
                                    <tr key={index}>
                                                 { index == 0 ?
                                          <Helmet>
                                      
                                <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                <script src="/assets/js/pages/datatables.init.js"></script>
                                <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                           
                                </Helmet> : ''}
                                         <td style={{whiteSpace: 'nowrap'}}>{data.fld_code}</td>
                                     <td>{data.fld_title} 
                                     <br/><a class="variant-list"
                                      onClick={()=>{
                                       
                                        localStorage.setItem('BookParentIdDetails',JSON.stringify(data))
                                        window.location.href = "/bookvariantlist"
                                    }}
                                >{data.VariantCount} Variant{data.VariantCount == 1 ? '' : 's'} Available</a>
                                    </td>
                                    
                                    <td>{data.fld_authorname}</td>
                                    <td>{data.fld_publishedby}</td>
                           
                                    <td>{data.fld_hsncode}</td>
                                    <td style={{color:data.fld_approved == 'Yes' ? 'green' : 'red'}}><b>{data.fld_approved== 'Yes' ? 'Approved' : 'Pending'}</b></td>
                                    <td> <div class="align-self-center tableact" style={{ textAlign: 'center'}}
                                    onClick={()=>{
                                       
                                        localStorage.setItem('BookItemMasterDetails',JSON.stringify(data))
                                        window.location.href = '/viewbookitemmaster'
                                    }}
                                    >
                                <span  >
                                <Edit3/>
                                    </span>
                                    </div> &nbsp;&nbsp;
                                     </td>
                                  
                                  
                                  
                                    </tr>
                    
                              
                            ))} 
                                    
                                   
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

           </div>
        )
    }
}
export default BooksGrid;