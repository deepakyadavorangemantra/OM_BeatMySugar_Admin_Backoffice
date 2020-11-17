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

        }
    }

    render(){
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
                                                        <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{30}</h4>
                                                        <span class="text-muted">Total Customers Active</span>
                                                    </div>
                                                
                                                </div>

                                                <div class="media dashcard border-bottom">
                                                    <div class="media-body">
                                                        <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{20}</h4>
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
                                                        <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{1000}</h4>
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
                                            
                                                <div class="media dashcard border-bottom" >
                                                    <div class="media-body">
                                                        <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">1001</h4>
                                                        <span class="text-muted">Chapter 1</span>
                                                    </div>
                                                
                                                </div>

                                                <div class="media dashcard border-bottom">
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
                                                
                                            </div>
                                            </div>
                                        </div>
                                    </div>


                            
                                <div class="col-xl-3">
                                    <div class="card zoom-in">
                                        <div class="card-body p-0">
                                            <h5 class="card-title header-title border-bottom p-3 mb-0"><Gift class="align-self-center icon-dual icon-lg" style={{color:'#507dc0'}}/><span className="cardtitle">Gift Hampers</span></h5>
                                        
                                            <div class="media dashcard border-bottom" >
                                                <div class="media-body">
                                                    <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">10</h4>
                                                    <span class="text-muted">Pending</span>
                                                </div>
                                            
                                            </div>

                                            <div class="media dashcard border-bottom">
                                                <div class="media-body">
                                                    <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">20</h4>
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