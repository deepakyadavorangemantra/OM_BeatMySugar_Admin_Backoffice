import React from 'react';

import moment from 'moment';


class Footer extends React.Component {
    render(){
        return(
            <div>
                <footer class="footer mainfooter">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-6">

                               
                           <p style={{textAlign: 'center'}}> Copyright   &copy; {moment().format('YYYY')} 
                           <a href="https://rxhealthmanagement.in/" target="_blank" style={{color:'#fff'}}><b> Rx Health Management India Pvt Ltd.</b></a> All Right Reserved.</p>
                             
                            </div>
                               <div class="col-lg-6">
                                  <span class="showweb"><a href="https://www.beatmysugar.com/" target="_blank" style={{color: 'white'}}>www.beatmysugar.com</a></span> 
                                  <span class="showmob"> <a href="https://www.beatmysugar.com/" target="_blank" style={{color: '#fff'}}>www.beatmysugar.com</a></span> 
                               </div>
                        </div>
                    </div>
                 </footer>
            </div>
        )
    }
}

export default Footer;