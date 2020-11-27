import React from 'react';
import Notiflix from "notiflix";
import GetApiCall from '../GetApi';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import PostApiCall from '../Api'
import moment from 'moment'

class AssignStaffRights extends React.Component {
    constructor(props){
        super(props)
        this.state={
            UserData:[],
            MenuListData : [],
            MenuRights : [],
            SubMenuRights : []
        }

    }


    componentDidMount(){

      
        Notiflix.Loading.Init({
            svgColor : '#2e4a9a'
           
          });
    
          Notiflix.Loading.Dots('');

        GetApiCall.getRequest("GetMenuList").then(resultdes =>
            resultdes.json().then(obj => {
           
            // console.log(obj.data)
            
              this.setState({
                MenuListData : obj.data
              })


            //   Notiflix.Loading.Remove();
            }))


            var user=localStorage.getItem('AssignUserRightsData');
            var details=JSON.parse(user)

            // console.log(details)
                   this.setState({
                UserData : details
              })

              PostApiCall.postRequest({
  
                staffid : details.fld_staffid,
            
              },"GetUserMenuList").then((results) => 
              
                // const objs = JSON.parse(result._bodyText)
                results.json().then(obj => {  
                if(results.status == 200 || results.status==201){
            
                    // console.log(obj.data)
                    this.setState({
                        MenuRights : obj.data
                    })


                    PostApiCall.postRequest({
  
                        staffid : details.fld_staffid,
                    
                      },"GetUserSubMenuList").then((resultssub) => 
                      
                        // const objs = JSON.parse(result._bodyText)
                        resultssub.json().then(objsub => {  
                        if(resultssub.status == 200 || resultssub.status==201){

                            // console.log(objsub.data)

                            var data = []
                            var arr = new Array(Object.keys(obj.data).length).fill([])

                            for(var i = 0 ; i< Object.keys(obj.data).length;i++){
                                data = []
                                for(var j = 0 ; j< Object.keys(objsub.data).length;j++){
            
                                    if(obj.data[i].fld_menuid == objsub.data[j].fld_parentid){
            
                                        data.push(objsub.data[j])
                                        arr[i] = data
                                        // console.log(arr)
                                        this.setState({
                                            SubMenuRights : arr
                                        })
            
                                        
            
                                    }
            
                                }
                                if(i == Object.keys(obj.data).length - 1){
                                    // localStorage.setItem('SubMenuRights',JSON.stringify(arr))
                                    Notiflix.Loading.Remove()
                                }
            
            
                            }

                        }
                    }))
                }
            }))
  
     
    }
    


    OnUpdateRights(){
        // console.log(this.state.MenuRights)
        // console.log(this.state.SubMenuRights)
        Notiflix.Loading.Dots('');
        var count = 0

        for(var i = 0; i< this.state.MenuRights.length ;i++){

            PostApiCall.postRequest({
  
                menurightid : this.state.MenuRights[i].fld_menurightid,
                access : this.state.MenuRights[i].fld_access,
            
              },"UpdateMenuRights").then((resultssub) => 
                      
              // const objs = JSON.parse(result._bodyText)
              resultssub.json().then(objsub => {  
              if(resultssub.status == 200 || resultssub.status==201){
              }
            }))
        }

        for(var i = 0; i< this.state.SubMenuRights.length ;i++){

            for(var j = 0; j< this.state.SubMenuRights[i].length ;j++){

                // console.log(this.state.SubMenuRights[i][j])
                  PostApiCall.postRequest({
  
                submenurightid : this.state.SubMenuRights[i][j].fld_submenurightid,
                access : this.state.SubMenuRights[i][j].fld_access,
            
              },"UpdateSubMenuRights")
              .then((resultssub) => 
                      
                        // const objs = JSON.parse(result._bodyText)
                        resultssub.json().then(objsub => {  
                        if(resultssub.status == 200 || resultssub.status==201){

              count = count + 1

              if(count == 62){
                Notiflix.Loading.Remove()
                window.location.reload()
               Notiflix.Notify.Success('Access Rights Updated.')
              }

            }
        }))
            }

            
           

             

        }
    }
 
    

    render(){

 
        
        return(
            <div className="App">


            <div className="content-page">
            
                <div className="content">
                  
                    <div className="container-fluid">
                        <div className="row page-title">
                            <div className="col-md-12">
                                <nav aria-label="breadcrumb" className="float-right mt-1">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Staff Management</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Assign Staff Rights</li>
                                    </ol>
                                </nav>
                                <h4 className="mb-1 mt-0">Staff Rights</h4>
                            </div>
                        </div> 
                        

                        
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="text-center mt-3">
                                        <img src={this.state.UserData.fld_photo == '' || this.state.UserData.fld_photo == null ? 'https://rnmu.rw/wp-content/uploads/2019/10/man-300x300.png'  : this.state.UserData.fld_photo} alt=""
                                            className="avatar-lg rounded-circle" />
                                        <h5 className="mt-2 mb-0">{this.state.UserData.fld_name}</h5>
                                        <h6 className="text-muted font-weight-normal mt-2 mb-0">{this.state.UserData.fld_designation}
                                        </h6>
                                        <h6 className="text-muted font-weight-normal mt-2 mb-0">{this.state.UserData.fld_mobile}
                                        </h6>
        <h6 className="text-muted font-weight-normal mt-1 mb-4">{this.state.UserData.fld_email} <br /><span style={{color : this.state.UserData.fld_status == 'Active' ? 'green' : 'red',fontWeight: 'bold'}}>({this.state.UserData.fld_status})</span></h6>

                                    </div>

                                    <div className="mt-3 pt-2 border-top">
                                        <h4 className="mb-3 font-size-15">Contact Information</h4>
                                        <div className="table-responsive">
                                            <table className="table table-borderless mb-0 text-muted">
                                                <tbody>
                                                <tr>
                                                        <th scope="row">Emp No.</th>
                                                          <td style={{paddingLeft: '0px'}}>{this.state.UserData.fld_empid}</td>
                                                    </tr>
                                                  
                                                    <tr>
                                                        <th scope="row">Since</th>
                                                          <td style={{paddingLeft: '0px'}}>{moment(this.state.UserData.fld_dateofjoining).format('ll')}</td>
                                                    </tr>
                                                  
                                                   
                                                  

                                                    <tr>
                                                        <th scope="row">Present Address</th>
        <td>{this.state.UserData.fld_presentaddress}, {this.state.UserData.fld_presentcity}, <br />{this.state.UserData.fld_presentstate}, <br /> {this.state.UserData.fld_presentcountry} ({this.state.UserData.fld_presentpincode})</td>
                                                    </tr>
                                                 
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                       
                        </div>

                     
               
                        
                        <div className="col-lg-9" style={{paddingLeft: '0px'}}>
                            {/* <div className="col-12"> */}
                                <div className="card">
                                    <div className="card-body">


                                        <table id="selection-datatable" className="table table-striped dt-responsive nowrap">
                                        <thead style={{
                                                  background: '#2e4a9a',
                                                  color: '#fff'
                                            }}>
                                                <tr>
                                                    <th style={{borderRight : '1px solid #fff'}}>Menu</th>
                                                    <th style={{borderRight : '1px solid #fff',    width: '80px'}}>View </th>
                                                    <th style={{borderRight : '1px solid #fff', width: '80px'}}>Add </th>
                                                    <th style={{borderRight : '1px solid #fff', width: '80px'}}>Approve </th>
                                                    <th style={{borderRight : '1px solid #fff', width: '80px'}}>Edit </th>
                                                    <th style={{borderRight : '1px solid #fff', width: '80px'}}>Delete </th>
                                                   
                                       
                                                  
                                                   
                                                </tr>
                                            </thead>
                                        
                                     
                                           
                                           
                                    <tbody >
                                 
                                        {/* <tr>
                                                    <td>Michael Bruce</td>
                                                    <td>Javascript Developer</td>
                                                    <td>Singapore</td>
                                                    <td>29</td>
                                                    <td>2011/06/27</td>
                                                    <td>$183,000</td>
                                                    <td>2011/01/25</td>
                                                    <td>$112,000</td>
                                                </tr> 

                                             <tr>
                                                    <td>x</td>
                                                    <td>User Support</td>
                                                    <td>New York</td>
                                                    <td>27</td>
                                                    <td>2011/01/25</td>
                                                    <td>$112,000</td>
                                                    <td>2011/01/25</td>
                                                    <td>$112,000</td>
                                          </tr> */}
                                         {this.state.MenuListData.map((data,index)=>(
                                           
                                           
                                       
                                                <tr key={index}>
                                                      {/* <Helmet>
                                                  
                                            <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                            <script src="/assets/js/pages/datatables.init.js"></script>
                                            <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                                       
                                            </Helmet> */}
                                                <td><span><input 
                                                onChange={()=>{
                                                    var arr =[...this.state.MenuRights]

                                                    arr[index].fld_access = arr[index].fld_access == 'Yes' ? 'No' : 'Yes'
                                                    this.setState({
                                                        MenuRights : arr
                                                    })

                                                    if(arr[index].fld_access == 'No'){
                                                        var ar1 = [...this.state.SubMenuRights]
                                                        var arr =[...this.state.SubMenuRights[index]]
                                                        if(arr[0] != undefined){
                                                            arr[0].fld_access =  0
                                                            arr[1].fld_access = 0
                                                            arr[2].fld_access = 0
                                                            arr[3].fld_access = 0
                                                            arr[4].fld_access = 0
                                                            arr[5].fld_access = 0
                                                            if(arr[6] != undefined){
                                                                arr[6].fld_access = 0
                                                            }
                                                            ar1[index] = arr
                                                            this.setState({
                                                                SubMenuRights : ar1
                                                            })
                                                        }
                                                    }
                                                    
                                                    
                                                }}
                                                type='checkbox' checked={this.state.MenuRights[index] == undefined ? false : this.state.MenuRights[index].fld_access =='Yes' ? true : false}></input></span>  {data.fld_menuname}</td>
                                                
                                                <td style={{textAlign : 'center' }} ><input type='checkbox'
                                                onChange={()=>{
                                                    var ar1 = [...this.state.SubMenuRights]
                                                    var arr =[...this.state.SubMenuRights[index]]

                                                    // console.log(arr)
                                                    for(var k = 0 ; k<arr.length;k++){

                                                      
                                                            // console.log(arr[k])

                                                            if(arr[k] != undefined){
                                                                arr[k].fld_access = arr[k].fld_access == 1 ? 0 : 1
                                                                
                                                                ar1[index] = arr
                                                                // console.log(arr)
                                                                this.setState({
                                                                    SubMenuRights : ar1
                                                                })
                                                            }

                                                            k= k+4
                                                        
                                                       

                                                    }
                                                  
                                                 
                                                }}
                                                checked={this.state.SubMenuRights[index] == undefined ? false : this.state.SubMenuRights[index][0] == undefined ? false :this.state.SubMenuRights[index][0].fld_access == 1 ? true : false}
                                                disabled={this.state.MenuRights[index] == undefined ? false : this.state.MenuRights[index].fld_access =='Yes' ? false : true}
                                                ></input></td>
                                               
                                                <td style={{textAlign : 'center'}}><input type='checkbox'
                                                 onChange={()=>{
                                                    var ar1 = [...this.state.SubMenuRights]
                                                    var arr =[...this.state.SubMenuRights[index]]

                                                    for(var k = 1 ; k<arr.length;k++){

                                                      
                                                        // console.log(arr[k])

                                                        if(arr[k] != undefined){
                                                            arr[k].fld_access = arr[k].fld_access == 1 ? 0 : 1
                                                            
                                                            ar1[index] = arr
                                                            // console.log(arr)
                                                            this.setState({
                                                                SubMenuRights : ar1
                                                            })
                                                        }

                                                        k= k+4
                                                    
                                                   

                                                }
                                                    // if(arr[1] != undefined){
                                                    //     arr[1].fld_access = arr[1].fld_access == 1 ? 0 : 1

                                                    //     if(arr[6] != undefined){
                                                    //         arr[6].fld_access = arr[1].fld_access
                                                    //     }
                                                    //     ar1[index] = arr

                                                    //     this.setState({
                                                    //         SubMenuRights : ar1
                                                    //     })
                                                    // }
                                                 
                                                }}
                                                checked={this.state.SubMenuRights[index] == undefined ? false : this.state.SubMenuRights[index][1] == undefined ? false :this.state.SubMenuRights[index][1].fld_access ==1 ? true : false}
                                                disabled={this.state.MenuRights[index] == undefined ? false : this.state.MenuRights[index].fld_access =='Yes' ? false : true}
                                                ></input></td>
                                            
                                             <td style={{textAlign : 'center'}}><input type='checkbox'
                                              onChange={()=>{
                                                var ar1 = [...this.state.SubMenuRights]
                                                var arr =[...this.state.SubMenuRights[index]]

                                                for(var k = 2 ; k<arr.length;k++){

                                                      
                                                    // console.log(arr[k])

                                                    if(arr[k] != undefined){
                                                        arr[k].fld_access = arr[k].fld_access == 1 ? 0 : 1
                                                        
                                                        ar1[index] = arr
                                                        // console.log(arr)
                                                        this.setState({
                                                            SubMenuRights : ar1
                                                        })
                                                    }

                                                    k= k+4
                                                
                                               

                                            }
                                                // if(arr[2] != undefined){
                                                //     arr[2].fld_access = arr[2].fld_access == 1 ? 0 : 1
                                                //     ar1[index] = arr
                                                //     this.setState({
                                                //         SubMenuRights : ar1
                                                //     })
                                                // }
                                             
                                            }}
                                                checked={this.state.SubMenuRights[index] == undefined ? false : this.state.SubMenuRights[index][2] == undefined ? false :this.state.SubMenuRights[index][2].fld_access ==1 ? true : false}
                                                disabled={this.state.MenuRights[index] == undefined ? false : this.state.MenuRights[index].fld_access =='Yes' ? false : true}
                                                
                                                ></input></td>
                                                <td style={{textAlign : 'center'}}><input type='checkbox'
                                                 onChange={()=>{
                                                    var ar1 = [...this.state.SubMenuRights]
                                                    var arr =[...this.state.SubMenuRights[index]]

                                                    for(var k = 3 ; k<arr.length;k++){

                                                      
                                                        // console.log(arr[k])
    
                                                        if(arr[k] != undefined){
                                                            arr[k].fld_access = arr[k].fld_access == 1 ? 0 : 1
                                                            
                                                            ar1[index] = arr
                                                            // console.log(arr)
                                                            this.setState({
                                                                SubMenuRights : ar1
                                                            })
                                                        }
    
                                                        k= k+4
                                                    
                                                   
    
                                                }
                                                    // if(arr[3] != undefined){
                                                    //     arr[3].fld_access = arr[3].fld_access == 1 ? 0 : 1
                                                    //     ar1[index] = arr
                                                    //     this.setState({
                                                    //         SubMenuRights : ar1
                                                    //     })
                                                    // }
                                                 
                                                }}
                                                checked={this.state.SubMenuRights[index] == undefined ? false : this.state.SubMenuRights[index][3] == undefined ? false :this.state.SubMenuRights[index][3].fld_access ==1 ? true : false}
                                                disabled={this.state.MenuRights[index] == undefined ? false : this.state.MenuRights[index].fld_access =='Yes' ? false : true}
                    
                                                ></input></td>

                                                <td style={{textAlign : 'center'}}><input type='checkbox'
                                                 onChange={()=>{
                                                    var ar1 = [...this.state.SubMenuRights]
                                                    var arr =[...this.state.SubMenuRights[index]]


                                                    for(var k = 4 ; k<arr.length;k++){

                                                      
                                                        // console.log(arr[k])
    
                                                        if(arr[k] != undefined){
                                                            arr[k].fld_access = arr[k].fld_access == 1 ? 0 : 1
                                                            
                                                            ar1[index] = arr
                                                            // console.log(arr)
                                                            this.setState({
                                                                SubMenuRights : ar1
                                                            })
                                                        }
    
                                                        k= k+4
                                                    
                                                   
    
                                                }

                                                    // if(arr[4] != undefined){
                                                    //     arr[4].fld_access = arr[4].fld_access == 1 ? 0 : 1
                                                    //     ar1[index] = arr
                                                    //     this.setState({
                                                    //         SubMenuRights : ar1
                                                    //     })
                                                    // }
                                                 
                                                }}
                                                checked={this.state.SubMenuRights[index] == undefined ? false : this.state.SubMenuRights[index][4] == undefined ? false :this.state.SubMenuRights[index][4].fld_access ==1 ? true : false}
                                                disabled={this.state.MenuRights[index] == undefined ? false : this.state.MenuRights[index].fld_access =='Yes' ? false : true}
                                                
                                                ></input></td>
                                                
                                                
                                                
                                              
                                                </tr>
                                
                                          
                                        ))} 
       
                                            
       
                                              </tbody>   
                                     
                                        </table>
                                        
                                    </div>
                                </div>

                                <div className="card" >
                                    <div className="card-body" style={{padding:'0px',paddingTop: '10px',
    paddingRight: '10px'}}>
                                    <button className="btn btn-primary" style={{float: 'right',marginBottom: '9px'}}
                                    
                                    onClick={this.OnUpdateRights.bind(this)}
                                                                    >Update User Rights</button>
                                        </div>
                                        </div>
                            </div>
                        
                        </div>

                        </div>
                     </div>
                </div>
             {/* </div> */}
           
        </div>

        )


    }

}
export default AssignStaffRights;