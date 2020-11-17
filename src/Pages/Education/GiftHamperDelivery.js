import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3} from 'react-feather';
import Modal from 'react-responsive-modal';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import PostApiCall from '../../Api'
import GetApiCall from '../../GetApi'
import moment from 'moment';
import EditGiftInput from './editInputGift';
import { confirmAlert } from 'react-confirm-alert'; // 
import{
    setSubCategoryName,
    setSubOrder,
    setClearArticleSubCategory
}
from '../../Components/Actions/ActionType';

class GiftHamperDelivery extends Component {

    constructor(props){
        super(props)
        this.state = {
           showFeedback:false,
           FeedbacksEditData :'',
           GiftHamperDeliveryData :[],
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
          GetApiCall.getRequest("ListCustomersGiftDelivery").then(resultdes =>
            resultdes.json().then(obj => {
                if(obj.data.length>0){
                    Notiflix.Loading.Dots('Please wait...');
                    let default_chapter = obj.data[0];
                    this.setState({ GiftHamperDeliveryData : obj.data })
                    
                   
                }else{
                    this.setState({    
                        GiftHamperDeliveryData : obj.data })
                }
               Notiflix.Loading.Remove()
            }))

        //   this.props.setClearArticleSubCategory()
       
      
        }


        onChangeDeliveryStatus=( data)=>{
            Notiflix.Loading.Dots('Please wait...');
            var login=localStorage.getItem('LoginDetail');
                var details=JSON.parse(login)
                PostApiCall.postRequest ({
                    id : data.fld_id,
                    customerid : data.fld_customerid,
                    currentchapter : data.fld_currentchapter,
                    currenttopic : data.fld_currenttopic,
                    iscompleted : data.fld_iscompleted,
                    alertmailsent : data.fld_alertmailsent,
                    giftdeliverytext : data.fld_giftdeliverytext,
                    giftdeliverystatus : data.fld_giftdeliverystatus === 0? 1 : 0,
                    updatedon : moment().format('lll'),
                    status : data.fld_status
                },"UpdateCustomersGiftDelivery").then((resultfeedback) =>
                resultfeedback.json().then(objArticleSub => {
                    if(resultfeedback.status == 200 || resultfeedback.status == 201){
                        let GiftHamperDeliveryData = this.state.GiftHamperDeliveryData;
                        let findIndex = this.state.GiftHamperDeliveryData.findIndex(item => item.fld_id == objArticleSub.data[0].fld_id);
                        data.updatedon = moment().format('lll');
                        data.fld_giftdeliverytext = data.fld_giftdeliverytext;
                        data.fld_giftdeliverystatus = data.fld_giftdeliverystatus === 0 ? 1 : 0;
                        GiftHamperDeliveryData[findIndex] = data;
                        this.setState( { GiftHamperDeliveryData : GiftHamperDeliveryData } );
                        Notiflix.Loading.Remove();
                        Notiflix.Notify.Success('Delivery status successfully updated.')
                    }else
                    {
                        Notiflix.Loading.Remove();
                        Notiflix.Notify.Failure('Delivery status already present.')
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
                                    <li className="breadcrumb-item active" aria-current="page">Gift Hamper Delivery</li>
                                </ol>
                            </nav>
                            <h4 className="mb-1 mt-0">Customer's gift Hamper Delivery</h4>
                        </div>
                    </div> 

                    
                    
                    
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                <div className="table-responsive">
                                <table id="basic-datatable" className="table dt-responsive nowrap">
                                <thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th>Comment</th>
                                        <th>Updated On</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                            
                            
                                <tbody>
                                {this.state.GiftHamperDeliveryData.length == 0 ? 
                                 <tr><td colSpan={5} style={{textAlign:'center'}}>No feedbacks Available this chapter</td></tr> : 
                                 ''} 
                                {this.state.GiftHamperDeliveryData.map((data,index)=>(
                                           
                                           <tr key={index}>
                                               { index == 0 ?
                                                 <Helmet>
                                             
                                       <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                       <script src="/assets/js/pages/datatables.init.js"></script>
                                       <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                                  
                                       </Helmet> : ''}
                                            <td>{index+1}</td>
                                           <td>{data.fld_name}</td>
                                           <td>{data.fld_email}</td>
                                           <td>{data.fld_mobile}</td>
                                           <td>
                                                <EditGiftInput giftdeliverytext={data.fld_giftdeliverytext} giftdeliveryData={data}  saveGiftdeliverytext={ this.onChangeDeliveryStatus }/>
                                            </td>
                                           <td>{moment(data.fld_updatedon).format('ll')}</td>
                                           <td className="tableact">
                                           <span>
                                           <select type="text" className="form-control" 
                                                value={ data.fld_giftdeliverystatus }
                                                 onChange={this.onChangeDeliveryStatus.bind(this, data)} 
                                                >
                                                <option key={0} value={0}> Panding </option>
                                                <option key={1} value={1}> Delivered </option>
                                            </select>
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

const mapStateToProps = state => ({
    
  })


  export default connect(mapStateToProps) (GiftHamperDelivery);
