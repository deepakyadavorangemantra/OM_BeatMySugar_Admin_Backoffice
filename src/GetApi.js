
  var urlString = "https://api.beatmysugar.com/BackofficeApi/";
  // var urlString = "https://api.iitpl.com/BackofficeApi/"; 
  //  var urlString = "http://192.168.29.146:7000/BackofficeApi/";
// var urlString = "https://api.beatmysugar.com/BackofficeApi/";


//  var urlString = "http://localhost:7000/BackofficeApi/";

 



const GetApiCall = {
  getRequest(url) {

   return fetch(urlString+url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers' : '*',
        'Content-Type': 'application/json',
      },
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

export default GetApiCall;
