import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import Modal from 'react-responsive-modal';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import PostApiCall from '../Api'
import GetApiCall from '../GetApi'
import moment from 'moment';


class CODMaster extends Component {




    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });


          Notiflix.Loading.Dots('Please wait...');
      
          GetApiCall.getRequest("GetCodMaster").then(resultdes =>
            resultdes.json().then(obj => {
                console.log(obj.data)
                this.setState({
                TCSMasterData : obj.data
              })
               Notiflix.Loading.Remove()
            
            }))
          
        }

      constructor(props){
         super(props)
         this.state = {
            Numregex : /^[0-9]*$/,
            Id : '',
            openedit : false,
            DecimalRegex : /^(\d*\.?\d{0,2}|\.\d{0,9})$/,
            Tcsvalue:'',
            TCSMasterData:[],
          };
        }
    
         
          onCloseModal = () => {
            this.setState({ open: false });
          };
          onchangecod(tcsvalue){
            if((this.state.DecimalRegex.test(tcsvalue.target.value))){
             this.setState({
                Sericevalue:tcsvalue.target.value  
             })
            }
          }

          UpdateCod(){
            if(this.state.Sericevalue!=''){
               
              Notiflix.Loading.Dots('Please wait...');
              var login=localStorage.getItem('LoginDetail');
                  var details=JSON.parse(login)
  
                  PostApiCall.postRequest ({
                      id : this.state.Id,
                      amount : this.state.Sericevalue,
                      updatedon : moment().format('lll'),
                      updatedby : details[0].fld_staffid
                   },"UpdateCODServiceMaster").then((result) =>
                  result.json().then(obj => {
                      if(result.status == 200 || result.status == 201){
                           Notiflix.Loading.Remove();
                          Notiflix.Notify.Success('Service Charge is successfully updated.')
                          window.location.reload()
                      }else
                      {
                        Notiflix.Loading.Remove();
                        Notiflix.Notify.Failure('Service Charge already present.')
                      }
                  })
              )


            }
            else{
              Notiflix.Notify.Failure('Please enter Service Charge.')
          }
          }
 
    render(){
        return(
           <div>
          
                     
            <div class="content-page">
            
            <div class="content">
            <Modal class="modal-content"  
    open={this.state.openedit}
    
    onClose={()=>{
        this.setState({openedit : false})
    
      }}
   
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Add COD Service Charge</h4>
      </div>
      <div class="modal-body">
           <div className="row">
           <div class="col-md-12">
           <div class="form-group mb-3">
               <label for="validationCustom01">Service Amount <span class="mandatory">*</span></label>
               <input type="text" class="form-control"
              value={this.state.Sericevalue}
              onChange={this.onchangecod.bind(this)}
               />
                          
           </div>
       </div>
     
           </div>
      </div>
      <div class="modal-footer">
      <button class="btn btn-primary" type="submit" style={{float:'right'}}  onClick={()=>{
        this.setState({
            openedit : false,
         
        })
  
    }}>Close</button>
     
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
    onClick={this.UpdateCod.bind(this)}
     >Update</button>
        <span>

        </span>
      </div>
 
</div>
    </Modal>
            

                <div class="container-fluid">
                    <div class="row page-title">
                        <div class="col-md-12">
                            <nav aria-label="breadcrumb" class="float-right mt-1">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Master Management</a></li>
                                 </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">COD Service Charge Master Master</h4>
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
                                        <th>Service Amount</th>
                                       <th>Action</th>
                                       
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.TCSMasterData.length == 0 ? 
                                 <tr><td colSpan={2} style={{textAlign:'center'}}>No Service Amount Available</td></tr> : 
                                 ''} 
                                {this.state.TCSMasterData.map((data,index)=>(
                                           
                                           <tr key={index}>
                                               { index == 0 ?
                                                 <Helmet>
                                             
                                       <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                       <script src="/assets/js/pages/datatables.init.js"></script>
                                       <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                                  
                                       </Helmet> : ''}
                                           <td>{data.fld_amount}</td>
                                           <td className="tableact"> 
                                            <span>
                                             <Edit3
                                             onClick={()=>{
                                               this.setState({
                                                  openedit : true,
                                                  Id : data.fld_id,
                                                  Sericevalue:data.fld_amount
                                               })

                                           
                                           }}
                                             
                                             ></Edit3>
                                           </span>
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


  export default CODMaster;