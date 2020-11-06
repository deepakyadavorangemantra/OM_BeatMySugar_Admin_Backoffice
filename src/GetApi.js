
  // var urlString = "https://api.beatmysugar.com/BackofficeApi/";
  // var urlString = "http://localhost:8080/BackofficeApi/";
  var urlString = "http://65.0.39.41:8080/BackofficeApi/";
  
 



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
