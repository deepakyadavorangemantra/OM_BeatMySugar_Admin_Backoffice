import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import Modal from 'react-responsive-modal';
import PostApiCall from '../Api'
import GetApiCall from '../GetApi'
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert'; // Import
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import{
   setmedicinecategory,
   setclearmedicinecategory
}
from './Actions/ActionType';

class ProductCategoryMaster extends Component {

    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });
      
          Notiflix.Loading.Dots('Please wait...');
      
          GetApiCall.getRequest("GetMedicineCategoryList").then(resultdes =>
            resultdes.json().then(obj => {
                this.setState({
                    
                MedicineData : obj.data
              })
               Notiflix.Loading.Remove()
            }))
    }

    onPost = () =>{

        var login=localStorage.getItem('LoginDetail');
      var details=JSON.parse(login)
        PostApiCall.postRequest ({
            category : this.props.medicinecredential.MedicineCategoryName,
            updatedby : details[0].fld_staffid,
            updatedon : moment().format('lll')
        },"AddMedicineCategoryMaster").then((resultMedicineC) =>
        resultMedicineC.json().then(objBookC => {
            if(resultMedicineC.status == 200 || resultMedicineC.status == 201){
            Notiflix.Loading.Remove();
            window.location.reload()
            }
        })
        )
    }

     constructor(props){
         super(props)
         this.state = {
            open:false,
            MedicineData : []
          };
        }
    
         
          onCloseModal = () => {
            this.setState({ open: false });
          };
         
          onChangeCat(category){

            this.props.setmedicinecategory(category.target.value)
        }

          Savemedicinecategory(){
            if(this.props.medicinecredential.MedicineCategoryName!=''){
                this.onPost();
            }
            else{
              Notiflix.Notify.Failure('Medicine Category Name Cannot be empty')
           }
        }
         

     
    render(){
        return(
           <div>
          
                     
            <div class="content-page">
            
            <div class="content">
            <Modal class="modal-content"  
    open={this.state.open}
    
   
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Add New Category</h4>
      </div>
      <div class="modal-body">
            <div class="col-md-12">
            <div class="form-group mb-3">
                <label for="validationCustom01">Category<span class="mandatory">*</span></label>
                <input type="text" class="form-control"
                value={this.props.medicinecredential.MedicineCategoryName}
                onChange={this.onChangeCat.bind(this)}  />
            </div>
        </div>
      </div>
      <div class="modal-footer">
      <button class="btn btn-primary" type="submit" style={{float:'right'}}  onClick={()=>{
        this.setState({
            open : false
        })
    }}>Close</button>
     
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
      onClick={this.Savemedicinecategory.bind(this)}>Save</button>
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
                                    <li class="breadcrumb-item active" aria-current="page">Medicine Category Master</li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Medicine Category</h4>
                        </div>
                    </div> 

                    <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row align-items-center">
                                                                       <div class="col text-right">
                                        <button 
                                        onClick={()=>{
                                            this.setState({
                                                open : true
                                            })
                                        }}
                                        class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                                class="uil-plus mr-1"></i>Add New Category</button>
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
                                        <th>Category</th>
                                        <th>Updated On</th>
                                        <th>Action</th>
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>
                                {this.state.MedicineData.map((data,index)=>(
                                           
                                           <tr key={index}>
                                               { index == 0 ?
                                                 <Helmet>
                                             
                                       <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                       <script src="/assets/js/pages/datatables.init.js"></script>
                                       <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                                  
                                       </Helmet> : ''}
                                           <td>{data.fld_category}</td>
                                           <td>{data.fld_updatedon}</td>
                                           <td className="tableact"
                                           onClick={()=>{
                                            confirmAlert({
                                              title: 'Confirm to Delete',
                                              message: 'Are you sure you want to delete Device Category.',
                                              buttons: [
                                                {
                                                  label: 'Yes',
                                                  onClick: () => {
                                                      Notiflix.Loading.Dots('');
                                  
                                    
                                  
                                          PostApiCall.postRequest({
                                        
                                            medicineid : data.fld_id,
                                        
                                            },"DeleteMedicineCategoryMaster").then((results) => 
                                            
                                              // const objs = JSON.parse(result._bodyText)
                                              results.json().then(obj => {
                                  
                                              if(results.status == 200 || results.status==201){
                                  
                                                  Notiflix.Loading.Remove()
                                                  Notiflix.Notify.Success('Device Category successfully Deleted.')
                                                  window.location.reload()
                                              }else
                                              {
                                                  Notiflix.Loading.Remove()
                                                  Notiflix.Notify.Failure('Something went wrong, try again later.')
                                              }
                                          }))
                                                  }
                                                },
                                                {
                                                  label: 'No',
                                                  // onClick: () => alert('Click No')
                                                }
                                              ]
                                            });
                                           }}
                                           ><Trash2/></td>
                                         
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
function mapStateToProps(state){
    return{
        medicinecredential: state.MedicineCategory
    }
  }
  export default connect(mapStateToProps, {
    setmedicinecategory,
    setclearmedicinecategory
  }) (ProductCategoryMaster);