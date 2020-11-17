import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import Modal from 'react-responsive-modal';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import PostApiCall from '../../Api'
import GetApiCall from '../../GetApi'
import moment from 'moment';
import SetAlertForm from '../../Components/Education_Components/SetAlertForm';
import { confirmAlert } from 'react-confirm-alert'; // 
import{
    setSubCategoryName,
    setSubOrder,
    setClearArticleSubCategory
}
from '../../Components/Actions/ActionType';

class SetAlert extends Component {

    constructor(props){
        super(props)
        this.state = {
           showFeedback:false,
           SetAlertData :'',
           Numregex : /^[0-9]*$/,
           Status : 'Active',
           Id : '',
         };
       }

    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'    
          });

          Notiflix.Loading.Dots('Please wait...');
          GetApiCall.getRequest("ListCustomerEducationNotification").then(resultdes =>
            resultdes.json().then(obj => {
                if(obj.data.length>0){
                    Notiflix.Loading.Dots('Please wait...');
                    this.setState({ SetAlertData : obj.data[0] })
                    
                   
                }else{
                    this.setState({    
                        SetAlertData : obj.data[0] })
                }
               Notiflix.Loading.Remove()
            }))

        //   this.props.setClearArticleSubCategory()
       
      
        }

        saveAlertData=( alertData)=>{
            Notiflix.Loading.Dots('Please wait...');
                var login=localStorage.getItem('LoginDetail');
                var details=JSON.parse(login)
                PostApiCall.postRequest ({
    
                    emailtext : alertData.description,
                    smstext : '',
                    createdon  : moment().format('lll'),
                    status : alertData.status,
                    adminid : details[0].fld_staffid,

                },"AddCustomerEducationNotification").then((resultAlert) =>
                resultAlert.json().then(objArticleSub => {
                    if(resultAlert.status == 200 || resultAlert.status == 201){
                        debugger;
                        Notiflix.Loading.Remove();
                        Notiflix.Notify.Success('Alert successfully added.')
                        this.setState( { SetAlertData : objArticleSub.data[0] } );
                    }else
                    {
                        Notiflix.Loading.Remove();
                        Notiflix.Notify.Failure('Alert already present.')
                    }
                })
            )
        }
         
    render(){
        
        return(
           <div>
                    
            <div className="content-page">
            
            <div className="content">  
                <div className="container-fluid">
                    <div className="row page-title">
                        <div className="col-md-12">
                            <nav aria-label="breadcrumb" className="float-right mt-1">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="#">Education Module</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Alert</li>
                                </ol>
                            </nav>
                            <h4 className="mb-1 mt-0">Customer's e-mail Alert</h4>
                        </div>
                    </div> 

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                    <SetAlertForm  
                                            topicEditData = {this.state.SetAlertData} 
                                            updatealertData={this.updatealertData}
                                            saveAlertData={this.saveAlertData}
                                            
                                            />
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

const mapStateToProps = state => ({
    
  })


  export default connect(mapStateToProps) (SetAlert);
