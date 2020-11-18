import React,{Component} from 'react';
import moment from 'moment';
import { Users,Lock, Image, ShoppingBag, Book, ShoppingCart, BookOpen, Monitor, User, Gift} from 'react-feather';
import  ReactApexChart from 'react-apexcharts';
import Notiflix from "notiflix";
import PostApiCall from '../../Api';
import GetApiCall from '../../GetApi';

class EduDashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dashboardData : {}
        }
    }

    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'    
          });

          Notiflix.Loading.Dots('Please wait...');
          GetApiCall.getRequest("EducationDashboard").then(resultdes =>
            resultdes.json().then(obj => {
                debugger
                if(obj){
                    Notiflix.Loading.Dots('Please wait...');
                   
                    this.setState({ dashboardData : obj })
                    
                   
                }else{
                    this.setState({    
                        dashboardData : {} })
                }
               Notiflix.Loading.Remove()
            }))
        }

    render(){
        const dashboardData = this.state.dashboardData;
        return(
            <React.Fragment>
               <div>
                    <div className="content-page dashboard">
                        <div className="content">
                            <div className="container-fluid">
                            

                                <div className="row">
                                    <div className="col-sm-4 col-xl-12">
                                    <div className="page-title align-items-center">
                                    <div class="col-sm-4 col-xl-6">
                                            <h4 class="mb-1 mt-0"> Education Dashboard</h4>
                                        </div>
                                        
                                        </div>
                                    </div>

                                        <div class="col-xl-3">
                                        <span className="bg-box zoom-in"></span>
                                        <div class="card zoom-in">
                                            <div class="card-body p-0 ">
                                                <h5 class="card-title header-title border-bottom p-3 mb-0"><Users class="align-self-center icon-dual icon-lg" style={{color:'#507dc0'}}/><span className="cardtitle">Customers</span></h5>
                                            
                                                <div class="media dashcard border-bottom" >
                                                    <div class="media-body">
                                                        <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{ dashboardData.customer ? dashboardData.customer.active : 0 }</h4>
                                                        <span class="text-muted">Total Active Customers</span>
                                                    </div>
                                                
                                                </div>

                                                <div class="media dashcard border-bottom">
                                                    <div class="media-body">
                                                        <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{ dashboardData.customer ? dashboardData.customer.point : 0 }</h4>
                                                        <span class="text-muted">Total Customers Education Module</span>
                                                    </div>
                                                
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    
                                    <div class="col-xl-3">
                                    <span className="bg-box zoom-in"></span>
                                        <div class="card zoom-in">
                                            <div class="card-body p-0">
                                                <h5 class="card-title header-title border-bottom p-3 mb-0"><Book class="align-self-center icon-dual icon-lg" style={{color:'#507dc0'}}/><span className="cardtitle">Course Completed</span></h5>
                                            
                                                <div class="media dashcard border-bottom" >
                                                    <div class="media-body">
                                                        <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{ dashboardData.customer_completed_test ? dashboardData.customer_completed_test : 0}</h4>
                                                        <span class="text-muted">Total Users</span>
                                                    </div>
                                                
                                                </div>

                                                
                                            </div>
                                        </div>
                                    </div>

                                
                                    <div class="col-xl-3">
                                        <div class="card zoom-in">
                                            <div class="card-body p-0">
                                                <h5 class="card-title header-title border-bottom p-3 mb-0"><BookOpen class="align-self-center icon-dual icon-lg" style={{color:'#507dc0'}}/><span className="cardtitle">Chapter's Users</span></h5>

                                                {dashboardData.chapter_list ?
                                                    dashboardData.chapter_list.map((item, index)=>{
                                                       return <div class="media dashcard border-bottom" >
                                                            <div class="media-body">
                                                                <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{ item.customer_count }</h4>
                                                                <span class="text-muted">{ item.chapter_name }</span>
                                                            </div>
                                                        </div>
                                                    })
                                                : ''}
                                                

                                                {/* <div class="media dashcard border-bottom">
                                                    <div class="media-body">
                                                        <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">101</h4>
                                                        <span class="text-muted">Chapter 2</span>
                                                    </div>
                                                
                                                </div>

                                            
                                                <div class="media dashcard">
                                                    <div class="media-body">
                                                        <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">501</h4>
                                                        <span class="text-muted">Chapter 3</span>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>


                            
                                <div class="col-xl-3">
                                    <div class="card zoom-in">
                                        <div class="card-body p-0">
                                            <h5 class="card-title header-title border-bottom p-3 mb-0"><Gift class="align-self-center icon-dual icon-lg" style={{color:'#507dc0'}}/><span className="cardtitle">Gift Hampers</span></h5>
                                        
                                            <div class="media dashcard border-bottom" >
                                                <div class="media-body">
                                                    <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{ dashboardData.gift_hamper? dashboardData.gift_hamper.pending : 0}</h4>
                                                    <span class="text-muted">Pending</span>
                                                </div>
                                            
                                            </div>

                                            <div class="media dashcard border-bottom">
                                                <div class="media-body">
                                                    <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{ dashboardData.gift_hamper? dashboardData.gift_hamper?.delivered : 0 }</h4>
                                                    <span class="text-muted">Delivered</span>
                                                </div>
                                            
                                            </div>

                                            
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default EduDashboard;