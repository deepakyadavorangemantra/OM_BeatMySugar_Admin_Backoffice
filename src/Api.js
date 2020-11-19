

  //  var urlString = "https://api.beatmysugar.com/BackofficeApi/"; 
   
  // var urlString = "http://192.168.29.146:7000/BackofficeApi/";
//  var urlString = "http://13.126.17.107:8085/BackofficeApi/";
//  var urlString = "http://localhost:8080/BackofficeApi/";
var urlString = "http://65.0.39.41:8080/BackofficeApi/";

const PostApiCall = {
  postRequest(userData,url) {


   return fetch(urlString+url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers' : '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
     
    })
    .then(response => {
      // console.log(response)
      return(response)
     
    })
    .catch(error => { console.log('request failed', error); 
    return error;
  });
  },
};

export default PostApiCall;