import React from 'react';
import { Bell,LogOut,Menu,X } from 'react-feather';

class Header extends React.Component {
    componentDidMount(){
        const script = document.createElement("script");
        script.src = "assets/js/app.min.js";
        script.async = true;
        document.body.appendChild(script);
    }
  
  
    render(){
        return(
            <div>
               
            
            <div class="navbar navbar-expand flex-column flex-md-row navbar-custom">
                <div class="container-fluid">
                    
                    <a href="index.html" class="navbar-brand mr-0 mr-md-2 logo">
                        <span class="logo-lg">
                            <img src="assets/images/bmslogo1.png" alt="" height="60" />
                        
                        </span>
                        <span class="logo-sm">
                            <img src="assets/images/bmslogo1.png" alt="" height="18" />
                        </span>
                    </a>

                    <ul class="navbar-nav bd-navbar-nav flex-row list-unstyled menu-left mb-0">
                        <li class="">
                            <button class="button-menu-mobile open-left disable-btn">
                            <Menu class="menu-icon"/>
                            <X class="close-icon"/> 
                            </button>
                        </li>
                    </ul>

                    <ul class="navbar-nav flex-row ml-auto d-flex list-unstyled topnav-menu float-right mb-0">
                    
                    <li class="dropdown notification-list"
                    >
                     <h2 className="backoffice">Back Office</h2>
                     
                 </li>

                        {/*<li class="dropdown notification-list" data-toggle="tooltip" data-placement="left"
                        title="notifications">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="false"
                            aria-expanded="false">
                           <Bell/>
                           
                        </a>
                        
                  </li>*/}

                        <li class="dropdown notification-list" data-toggle="tooltip" data-placement="left" title="Logout">
                            <a onClick={()=>{
                                localStorage.removeItem('LoginDetail')
                                window.location.href='/'
                            }} 
                             class="nav-link right-bar-toggle">
                             <LogOut/>
                            </a>
                             
                            
                        </li>

                      
                    </ul>
                </div>

            </div>
             
            </div>
         
        )
    }

}

export default Header;