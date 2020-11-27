

const express = require('express');
// const cors = require('cors');
const app = express();
const port = process.env.PORT || 3006;
const path = require('path');
const fs = require('fs');
const axios = require('axios')
const Parser = require('html-react-parser')


const urlString = "https://api.beatmysugar.com/BackofficeApi/";

// const urlString = "http://localhost:8080/BackofficeApi/";

const ImgUrl = 'https://beatmysugar.com/assets/images/BMS-OG.png'

app.get('/', function(request, response) {
//   console.log('Home page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'BeatMySugar | Buy Diabetic Products and Health Services Online');
    data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com');
    // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
    data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
    data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
    var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
    response.send(result);
  });
});


app.get('/healthknowledge', function(request, response) {
    //   console.log('Home page visited!');
      const filePath = path.resolve(__dirname, './build', 'index.html');
      fs.readFile(filePath, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        data = data.replace(/\$OG_TITLE/g, 'Health Knowledge - BeatMySugar | Buy Diabetic Products and Health Services Online');
        data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/healthknowledge');
        // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
        data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
        data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
        var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
        response.send(result);
      });
    });


    app.get('/healthknowledge/:category', function(request, response) {
        //   console.log('Home page visited!');
          const filePath = path.resolve(__dirname, './build', 'index.html');
          fs.readFile(filePath, 'utf8', function (err,data) {
            if (err) {
              return console.log(err);
            }
            data = data.replace(/\$OG_TITLE/g, request.params.category+' - BeatMySugar | Buy Diabetic Products and Health Services Online');
            data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/healthknowledge/'+request.params.category);
            // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
            data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
            data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
            var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
            response.send(result);
          });
        });


        app.get('/healthknowledge/:category/:sub', function(request, response) {
            //   console.log('Home page visited!');
              const filePath = path.resolve(__dirname, './build', 'index.html');
              fs.readFile(filePath, 'utf8', function (err,data) {
                if (err) {
                  return console.log(err);
                }
                data = data.replace(/\$OG_TITLE/g, request.params.sub+' - BeatMySugar | Buy Diabetic Products and Health Services Online');
                data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/healthknowledge/'+request.params.category+'/'+request.params.sub);
                // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                response.send(result);
              });
            });


app.get('/healthknowledge/:category/:sub/:blogid', function(request, response) {
//   console.log('About page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err,data2) {
    //   console.log(request.params.blogid)
    if (err) {
      return console.log(err);
    }

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    axios({
        method: 'post',
        url: urlString+'GetBlogDetails',
        headers : {
            'Accept': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers' : '*',
        'Content-Type': 'application/json',
        },
        data: {
            blog_id: request.params.blogid.split("-")[0]
        }
      }).then((resp) => {
        // console.log(response.data.data[0]);
          data2 = data2.replace(/\$OG_TITLE/g, resp.data.data[0].fld_title);
          data2 = data2.replace(/\$OG_URL/g, 'https://www/beatmysugar.com/healthknowledge/'+request.params.category+'/'+request.params.sub+'/'+request.params.blogid);
          // data2 = data2.replace(/\$OG_TYPE/g, 'BeatMySugar');
    data2 = data2.replace(/\$OG_DESCRIPTION/g, resp.data.data[0].fld_shortdescription.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/,'').replace(/(\r\n|\n|\r)/gm,""));
   var result = data2.replace(/\$OG_IMAGE/g, resp.data.data[0].fld_coverimage);
    response.send(result);
      }, (error) => {
        console.log(error);
      });
 
         
  });
});


app.get('/doctor', function(request, response) {
    //   console.log('Home page visited!');
      const filePath = path.resolve(__dirname, './build', 'index.html');
      fs.readFile(filePath, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        data = data.replace(/\$OG_TITLE/g, 'Doctor Listing - BeatMySugar | Buy Diabetic Products and Healthcare Services');
        data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/doctor');
        // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
        data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
        data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
        var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
        response.send(result);
      });
    });



        app.get('/doctor/:doctorid', function(request, response) {
            //   console.log('About page visited!');
              const filePath = path.resolve(__dirname, './build', 'index.html')
              fs.readFile(filePath, 'utf8', function (err,data2) {
                //   console.log(request.params.blogid)
                if (err) {
                  return console.log(err);
                }
            
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            
                axios({
                    method: 'post',
                    url: urlString+'GetDoctorDetailsWeb',
                    headers : {
                        'Accept': 'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Headers' : '*',
                    'Content-Type': 'application/json',
                    },
                    data: {
                    doctor_id: request.params.doctorid.split("-")[0]
                    }
                  }).then((resp) => {
                    // console.log(response.data.data[0]);
                      data2 = data2.replace(/\$OG_TITLE/g, 'Dr. '+resp.data.data[0].fld_name+' - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                      data2 = data2.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/doctor/'+request.params.doctorid);
                      // data2 = data2.replace(/\$OG_TYPE/g, 'BeatMySugar');
                      data2 = data2.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                      data2 = data2.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
          
               var result = data2.replace(/\$OG_IMAGE/g, resp.data.data[0].fld_photo);
                response.send(result);
                  }, (error) => {
                    console.log(error);
                  });
             
                     
              });
            });

            app.get('/contributors/:contributorid', function(request, response) {
                //   console.log('About page visited!');
                  const filePath = path.resolve(__dirname, './build', 'index.html')
                  fs.readFile(filePath, 'utf8', function (err,data2) {
                    //   console.log(request.params.blogid)
                    if (err) {
                      return console.log(err);
                    }
                
                    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
                
                    axios({
                        method: 'post',
                        url: urlString+'GetContributorDetailsWebsite',
                        headers : {
                            'Accept': 'application/json',
                        'Access-Control-Allow-Origin':'*',
                        'Access-Control-Allow-Headers' : '*',
                        'Content-Type': 'application/json',
                        },
                        data: {
                        id: request.params.contributorid.split("-")[0]
                        }
                      }).then((resp) => {
                        // console.log(response.data.data[0]);
                          data2 = data2.replace(/\$OG_TITLE/g, resp.data.data[0].fld_title+' '+resp.data.data[0].fld_name+' - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                          data2 = data2.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/contributors/'+request.params.contributorid);
                          // data2 = data2.replace(/\$OG_TYPE/g, 'BeatMySugar');
                          data2 = data2.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                          data2 = data2.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
              
                   var result = data2.replace(/\$OG_IMAGE/g, resp.data.data[0].fld_photo);
                    response.send(result);
                      }, (error) => {
                        console.log(error);
                      });
                 
                         
                  });
                });



            app.get('/dietitian', function(request, response) {
                //   console.log('Home page visited!');
                  const filePath = path.resolve(__dirname, './build', 'index.html');
                  fs.readFile(filePath, 'utf8', function (err,data) {
                    if (err) {
                      return console.log(err);
                    }
                    data = data.replace(/\$OG_TITLE/g, 'Dietitian Listing - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                    data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/dietitian');
                    // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                    data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                    data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                    var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                    response.send(result);
                  });
                });
            
            
            
                    app.get('/dietitian/:nutritionistid', function(request, response) {
                        //   console.log('About page visited!');
                          const filePath = path.resolve(__dirname, './build', 'index.html')
                          fs.readFile(filePath, 'utf8', function (err,data2) {
                            //   console.log(request.params.blogid)
                            if (err) {
                              return console.log(err);
                            }
                        
                            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
                        
                            axios({
                                method: 'post',
                                url: urlString+'GetNutritionistDetailsWeb',
                                headers : {
                                    'Accept': 'application/json',
                                'Access-Control-Allow-Origin':'*',
                                'Access-Control-Allow-Headers' : '*',
                                'Content-Type': 'application/json',
                                },
                                data: {
                                id: request.params.nutritionistid.split("-")[0]
                                }
                              }).then((resp) => {
                                // console.log(response.data.data[0]);
                                  data2 = data2.replace(/\$OG_TITLE/g, resp.data.data[0].fld_name+' - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                  data2 = data2.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/dietitian/'+request.params.nutritionistid);
                                  // data2 = data2.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                  data2 = data2.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                  data2 = data2.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                      
                           var result = data2.replace(/\$OG_IMAGE/g, resp.data.data[0].fld_photo);
                            response.send(result);
                              }, (error) => {
                                console.log(error);
                              });
                         
                                 
                          });
                        });
            

app.get('/socks', function(request, response) {
    //   console.log('Home page visited!');
      const filePath = path.resolve(__dirname, './build', 'index.html');
      fs.readFile(filePath, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        data = data.replace(/\$OG_TITLE/g, 'Diabetic Socks - BeatMySugar | Buy Diabetic Products and Healthcare Services');
        data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/socks');
        // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
        data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
        data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
        var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
        response.send(result);
      });
    });


app.get('/socks/:socksid/:varid/:socksname', function(request, response) {
    //   console.log('About page visited!');
      const filePath = path.resolve(__dirname, './build', 'index.html')
      fs.readFile(filePath, 'utf8', function (err,data2) {
        //   console.log(request.params.blogid)
        if (err) {
          return console.log(err);
        }
    
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    
        axios({
            method: 'post',
            url: urlString+'GetSocksMetaData',
            headers : {
                'Accept': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Headers' : '*',
            'Content-Type': 'application/json',
            },
            data: {
              id: request.params.varid
            }
          }).then((resp) => {
            // console.log(response.data.data[0]);
              data2 = data2.replace(/\$OG_TITLE/g, resp.data.data[0].fld_titlebar);
              data2 = data2.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/socks/'+request.params.socksid+'/'+request.params.varid+'/'+request.params.socksname);
              // data2 = data2.replace(/\$OG_TYPE/g, 'Socks');
        data2 = data2.replace(/\$OG_DESCRIPTION/g, resp.data.data[0].fld_metadescription);
        data2 = data2.replace(/\$KEYWORDS/g, resp.data.data[0].fld_keywords);
       var result = data2.replace(/\$OG_IMAGE/g, resp.data.data[0].ImageUrl);
        response.send(result);
          }, (error) => {
            console.log(error);
          });
     
             
      });
    });


    app.get('/footwear', function(request, response) {
        //   console.log('Home page visited!');
          const filePath = path.resolve(__dirname, './build', 'index.html');
          fs.readFile(filePath, 'utf8', function (err,data) {
            if (err) {
              return console.log(err);
            }
            data = data.replace(/\$OG_TITLE/g, 'Diabetic Footwear - BeatMySugar | Buy Diabetic Products and Healthcare Services');
            data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/footwear');
            // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
            data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
            data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
            var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
            response.send(result);
          });
        });

    app.get('/footwear/:footid/:varid/:footname', function(request, response) {
        //   console.log('About page visited!');
          const filePath = path.resolve(__dirname, './build', 'index.html')
          fs.readFile(filePath, 'utf8', function (err,data2) {
            //   console.log(request.params.blogid)
            if (err) {
              return console.log(err);
            }
        
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        
            axios({
                method: 'post',
                url: urlString+'GetFootwearMetaData',
                headers : {
                    'Accept': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Headers' : '*',
                'Content-Type': 'application/json',
                },
                data: {
                  id: request.params.varid
                }
              }).then((resp) => {
                // console.log(response.data.data[0]);
                  data2 = data2.replace(/\$OG_TITLE/g, resp.data.data[0].fld_titlebar);
                  data2 = data2.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/footwear/'+request.params.footid+'/'+request.params.varid+'/'+request.params.footname);
                  // data2 = data2.replace(/\$OG_TYPE/g, 'Footwear');
            data2 = data2.replace(/\$OG_DESCRIPTION/g, resp.data.data[0].fld_metadescription);
            data2 = data2.replace(/\$KEYWORDS/g, resp.data.data[0].fld_keywords);
           var result = data2.replace(/\$OG_IMAGE/g, resp.data.data[0].ImageUrl);
            response.send(result);
              }, (error) => {
                console.log(error);
              });
         
                 
          });
        });


        app.get('/food/:category/:foodid/:varid/:foodname', function(request, response) {
            // console.log('About page visited!'); 
            const filePath = path.resolve(__dirname, './build', 'index.html')
            fs.readFile(filePath, 'utf8', function (err,data2) {
              if (err) {
                return console.log(err);
              }
          
              process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

      
              // console.log(request.params.category)
          
              axios({
                  method: 'post',
                  url: urlString+'GetFoodMetaData',
                  headers : {
                      'Accept': 'application/json',
                  'Access-Control-Allow-Origin':'*',
                  'Access-Control-Allow-Headers' : '*',
                  'Content-Type': 'application/json',
                  },
                  data: {
                    id: request.params.varid
                  }
                }).then((resp) => {
                  console.log(resp.data.data[0]);
                    data2 = data2.replace(/\$OG_TITLE/g, resp.data.data[0].fld_titlebar);
                    data2 = data2.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/food/'+request.params.foodid+'/'+request.params.varid+'/'+request.params.foodname);
                    // data2 = data2.replace(/\$OG_TYPE/g, 'Food');
              data2 = data2.replace(/\$OG_DESCRIPTION/g, resp.data.data[0].fld_metadescription);
              data2 = data2.replace(/\$KEYWORDS/g, resp.data.data[0].fld_keywords);
             var result = data2.replace(/\$OG_IMAGE/g, resp.data.data[0].ImageUrl);
              response.send(result);
                }, (error) => {
                  console.log(error);
                });
           
                   
            });
          });


        app.get('/food/:id/:category', function(request, response) {
              // console.log('Home page visited!');
              const filePath = path.resolve(__dirname, './build', 'index.html');
              fs.readFile(filePath, 'utf8', function (err,data) {
                if (err) {
                  return console.log(err);
                  
                }
                data = data.replace(/\$OG_TITLE/g, 'Diabetic Food & Supplements - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/food/'+request.params.id+'/'+request.params.category);
                // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                response.send(result);
              });
            });



     



    
            app.get('/selectaddress', function(request, response) {
                //   console.log('Home page visited!');
                  const filePath = path.resolve(__dirname, './build', 'index.html');
                  fs.readFile(filePath, 'utf8', function (err,data) {
                    if (err) {
                      return console.log(err);
                    }
                    data = data.replace(/\$OG_TITLE/g, 'Select Address - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                    data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/selectaddress');
                    // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                    data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                    data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                    var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                    response.send(result);
                  });
                });



            app.get('/placeorder', function(request, response) {
                //   console.log('Home page visited!');
                  const filePath = path.resolve(__dirname, './build', 'index.html');
                  fs.readFile(filePath, 'utf8', function (err,data) {
                    if (err) {
                      return console.log(err);
                    }
                    data = data.replace(/\$OG_TITLE/g, 'Place Order - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                    data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/placeorder');
                    // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                    data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                    data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                    var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                    response.send(result);
                  });
                });



                app.get('/Orders', function(request, response) {
                    //   console.log('Home page visited!');
                      const filePath = path.resolve(__dirname, './build', 'index.html');
                      fs.readFile(filePath, 'utf8', function (err,data) {
                        if (err) {
                          return console.log(err);
                        }
                        data = data.replace(/\$OG_TITLE/g, 'Orders - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                        data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/Orders');
                        // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                        data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                        data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                        var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                        response.send(result);
                      });
                    });


                    app.get('/Login', function(request, response) {
                        //   console.log('Home page visited!');
                          const filePath = path.resolve(__dirname, './build', 'index.html');
                          fs.readFile(filePath, 'utf8', function (err,data) {
                            if (err) {
                              return console.log(err);
                            }
                            data = data.replace(/\$OG_TITLE/g, 'Login - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                            data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/Login');
                            // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                            data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                            data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                            var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                            response.send(result);
                          });
                        });


                        app.get('/Register', function(request, response) {
                            //   console.log('Home page visited!');
                              const filePath = path.resolve(__dirname, './build', 'index.html');
                              fs.readFile(filePath, 'utf8', function (err,data) {
                                if (err) {
                                  return console.log(err);
                                }
                                data = data.replace(/\$OG_TITLE/g, 'Register - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/Register');
                                // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                response.send(result);
                              });
                            });


                            app.get('/profile', function(request, response) {
                                //   console.log('Home page visited!');
                                  const filePath = path.resolve(__dirname, './build', 'index.html');
                                  fs.readFile(filePath, 'utf8', function (err,data) {
                                    if (err) {
                                      return console.log(err);
                                    }
                                    data = data.replace(/\$OG_TITLE/g, 'Profile - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                    data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/profile');
                                    // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                    data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                    data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                    var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                    response.send(result);
                                  });
                                });


                                app.get('/newaddress', function(request, response) {
                                    //   console.log('Home page visited!');
                                      const filePath = path.resolve(__dirname, './build', 'index.html');
                                      fs.readFile(filePath, 'utf8', function (err,data) {
                                        if (err) {
                                          return console.log(err);
                                        }
                                        data = data.replace(/\$OG_TITLE/g, 'New Address - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                        data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/newaddress');
                                        // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                        data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                        data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                        var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                        response.send(result);
                                      });
                                    });


                                    app.get('/recoverpassword', function(request, response) {
                                        //   console.log('Home page visited!');
                                          const filePath = path.resolve(__dirname, './build', 'index.html');
                                          fs.readFile(filePath, 'utf8', function (err,data) {
                                            if (err) {
                                              return console.log(err);
                                            }
                                            data = data.replace(/\$OG_TITLE/g, 'Recover Password - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                            data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/recoverpassword');
                                            // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                            data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                            data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                            var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                            response.send(result);
                                          });
                                        });


                                        app.get('/results/:title', function(request, response) {
                                            //   console.log('Home page visited!');
                                              const filePath = path.resolve(__dirname, './build', 'index.html');
                                              fs.readFile(filePath, 'utf8', function (err,data) {
                                                if (err) {
                                                  return console.log(err);
                                                }
                                                data = data.replace(/\$OG_TITLE/g, request.params.title+' - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/results/'+request.params.title);
                                                // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                response.send(result);
                                              });
                                            });


                                            app.get('/verifymobile', function(request, response) {
                                                //   console.log('Home page visited!');
                                                  const filePath = path.resolve(__dirname, './build', 'index.html');
                                                  fs.readFile(filePath, 'utf8', function (err,data) {
                                                    if (err) {
                                                      return console.log(err);
                                                    }
                                                    data = data.replace(/\$OG_TITLE/g, 'Verify Mobile - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                    data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/verifymobile');
                                                    // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                    data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                    data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                    var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                    response.send(result);
                                                  });
                                                });

                                                app.get('/contactus', function(request, response) {
                                                    //   console.log('Home page visited!');
                                                      const filePath = path.resolve(__dirname, './build', 'index.html');
                                                      fs.readFile(filePath, 'utf8', function (err,data) {
                                                        if (err) {
                                                          return console.log(err);
                                                        }
                                                        data = data.replace(/\$OG_TITLE/g, 'Contact Us - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                        data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/contactus');
                                                        // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                        data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                        data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                        var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                        response.send(result);
                                                      });
                                                    });

                                                    app.get('/aboutus', function(request, response) {
                                                        //   console.log('Home page visited!');
                                                          const filePath = path.resolve(__dirname, './build', 'index.html');
                                                          fs.readFile(filePath, 'utf8', function (err,data) {
                                                            if (err) {
                                                              return console.log(err);
                                                            }
                                                            data = data.replace(/\$OG_TITLE/g, 'About Us - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                            data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/aboutus');
                                                            // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                            data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                            data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                            var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                            response.send(result);
                                                          });
                                                        });

                                                        app.get('/privacypolicy', function(request, response) {
                                                            //   console.log('Home page visited!');
                                                              const filePath = path.resolve(__dirname, './build', 'index.html');
                                                              fs.readFile(filePath, 'utf8', function (err,data) {
                                                                if (err) {
                                                                  return console.log(err);
                                                                }
                                                                data = data.replace(/\$OG_TITLE/g, 'Privacy Policy - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/privacypolicy');
                                                                // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                response.send(result);
                                                              });
                                                            });


                                                            app.get('/disclaimer', function(request, response) {
                                                                //   console.log('Home page visited!');
                                                                  const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                  fs.readFile(filePath, 'utf8', function (err,data) {
                                                                    if (err) {
                                                                      return console.log(err);
                                                                    }
                                                                    data = data.replace(/\$OG_TITLE/g, 'Disclaimer - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                    data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/disclaimer');
                                                                    // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                    data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                    data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                    var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                    response.send(result);
                                                                  });
                                                                });


                                                                app.get('/termsandcondition', function(request, response) {
                                                                    //   console.log('Home page visited!');
                                                                      const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                      fs.readFile(filePath, 'utf8', function (err,data) {
                                                                        if (err) {
                                                                          return console.log(err);
                                                                        }
                                                                        data = data.replace(/\$OG_TITLE/g, 'Terms and Condition - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                        data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/termsandcondition');
                                                                        // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                        data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                        data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                        var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                        response.send(result);
                                                                      });
                                                                    });


                                                                    app.get('/careers', function(request, response) {
                                                                        //   console.log('Home page visited!');
                                                                          const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                          fs.readFile(filePath, 'utf8', function (err,data) {
                                                                            if (err) {
                                                                              return console.log(err);
                                                                            }
                                                                            data = data.replace(/\$OG_TITLE/g, 'Careers - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                            data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/careers');
                                                                            // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                            data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                            data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                            var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                            response.send(result);
                                                                          });
                                                                        });

                                                                        app.get('/careers/:id/:title', function(request, response) {
                                                                            //   console.log('Home page visited!');
                                                                              const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                              fs.readFile(filePath, 'utf8', function (err,data) {
                                                                                if (err) {
                                                                                  return console.log(err);
                                                                                }
                                                                                data = data.replace(/\$OG_TITLE/g, 'Careers - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                                data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/careers/'+request.params.id+'/'+request.params.title);
                                                                                // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                                data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                                data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                                var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                                response.send(result);
                                                                              });
                                                                            });

                                                                            app.get('/sellwithus', function(request, response) {
                                                                                //   console.log('Home page visited!');
                                                                                  const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                                  fs.readFile(filePath, 'utf8', function (err,data) {
                                                                                    if (err) {
                                                                                      return console.log(err);
                                                                                    }
                                                                                    data = data.replace(/\$OG_TITLE/g, 'Sell With Us - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                                    data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/sellwithus');
                                                                                    // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                                    data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                                    data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                                    var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                                    response.send(result);
                                                                                  });
                                                                                });


                                                                                app.get('/insurance', function(request, response) {
                                                                                    //   console.log('Home page visited!');
                                                                                      const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                                      fs.readFile(filePath, 'utf8', function (err,data) {
                                                                                        if (err) {
                                                                                          return console.log(err);
                                                                                        }
                                                                                        data = data.replace(/\$OG_TITLE/g, 'Insurance - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                                        data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/insurance');
                                                                                        // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                                        data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                                        data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                                        var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                                        response.send(result);
                                                                                      });
                                                                                    });

                                                                                    app.get('/cart', function(request, response) {
                                                                                        //   console.log('Home page visited!');
                                                                                          const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                                          fs.readFile(filePath, 'utf8', function (err,data) {
                                                                                            if (err) {
                                                                                              return console.log(err);
                                                                                            }
                                                                                            data = data.replace(/\$OG_TITLE/g, 'Cart - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                                            data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/cart');
                                                                                            // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                                            data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                                            data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                                            var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                                            response.send(result);
                                                                                          });
                                                                                        });

                                                                                        app.get('/account', function(request, response) {
                                                                                            //   console.log('Home page visited!');
                                                                                              const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                                              fs.readFile(filePath, 'utf8', function (err,data) {
                                                                                                if (err) {
                                                                                                  return console.log(err);
                                                                                                }
                                                                                                data = data.replace(/\$OG_TITLE/g, 'Account - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                                                data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/account');
                                                                                                // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                                                data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                                                data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                                                var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                                                response.send(result);
                                                                                              });
                                                                                            });


                                                                                            app.get('/editprofile', function(request, response) {
                                                                                                //   console.log('Home page visited!');
                                                                                                  const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                                                  fs.readFile(filePath, 'utf8', function (err,data) {
                                                                                                    if (err) {
                                                                                                      return console.log(err);
                                                                                                    }
                                                                                                    data = data.replace(/\$OG_TITLE/g, 'Edit Profile - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                                                    data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/editprofile');
                                                                                                    // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                                                    data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                                                    data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                                                    var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                                                    response.send(result);
                                                                                                  });
                                                                                                });


                                                                                                app.get('/addressbook', function(request, response) {
                                                                                                    //   console.log('Home page visited!');
                                                                                                      const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                                                      fs.readFile(filePath, 'utf8', function (err,data) {
                                                                                                        if (err) {
                                                                                                          return console.log(err);
                                                                                                        }
                                                                                                        data = data.replace(/\$OG_TITLE/g, 'Address Book - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                                                        data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/addressbook');
                                                                                                        // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                                                        data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                                                        data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                                                        var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                                                        response.send(result);
                                                                                                      });
                                                                                                    });


                                                                                                    app.get('/addressbook', function(request, response) {
                                                                                                        //   console.log('Home page visited!');
                                                                                                          const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                                                          fs.readFile(filePath, 'utf8', function (err,data) {
                                                                                                            if (err) {
                                                                                                              return console.log(err);
                                                                                                            }
                                                                                                            data = data.replace(/\$OG_TITLE/g, 'Address Book - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                                                            data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/addressbook');
                                                                                                            // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                                                            data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                                                            data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                                                            var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                                                            response.send(result);
                                                                                                          });
                                                                                                        });
            

                                                                                                        app.get('/addnewaddress', function(request, response) {
                                                                                                            //   console.log('Home page visited!');
                                                                                                              const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                                                              fs.readFile(filePath, 'utf8', function (err,data) {
                                                                                                                if (err) {
                                                                                                                  return console.log(err);
                                                                                                                }
                                                                                                                data = data.replace(/\$OG_TITLE/g, 'New Address - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                                                                data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/addnewaddress');
                                                                                                                // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                                                                data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                                                                data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                                                                var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                                                                response.send(result);
                                                                                                              });
                                                                                                            });


                                                                                                            app.get('/editaddress', function(request, response) {
                                                                                                                //   console.log('Home page visited!');
                                                                                                                  const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                                                                  fs.readFile(filePath, 'utf8', function (err,data) {
                                                                                                                    if (err) {
                                                                                                                      return console.log(err);
                                                                                                                    }
                                                                                                                    data = data.replace(/\$OG_TITLE/g, 'Edit Address - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                                                                    data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/editaddress');
                                                                                                                    // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                                                                    data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                                                                    data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                                                                    var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                                                                    response.send(result);
                                                                                                                  });
                                                                                                                });



                                                                                                            app.get('/orderhistory', function(request, response) {
                                                                                                                //   console.log('Home page visited!');
                                                                                                                  const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                                                                  fs.readFile(filePath, 'utf8', function (err,data) {
                                                                                                                    if (err) {
                                                                                                                      return console.log(err);
                                                                                                                    }
                                                                                                                    data = data.replace(/\$OG_TITLE/g, 'Order History - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                                                                    data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/orderhistory');
                                                                                                                    // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                                                                    data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                                                                    data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                                                                    var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                                                                    response.send(result);
                                                                                                                  });
                                                                                                                });

                                                                                                                app.get('/wishlist', function(request, response) {
                                                                                                                    //   console.log('Home page visited!');
                                                                                                                      const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                                                                      fs.readFile(filePath, 'utf8', function (err,data) {
                                                                                                                        if (err) {
                                                                                                                          return console.log(err);
                                                                                                                        }
                                                                                                                        data = data.replace(/\$OG_TITLE/g, 'Wishlist - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                                                                        data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/wishlist');
                                                                                                                        // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                                                                        data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                                                                        data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                                                                        var result = data.replace(/\$OG_IMAGE/g,ImgUrl );
                                                                                                                        response.send(result);
                                                                                                                      });
                                                                                                                    });


                                                                                                                    app.get('/returnorder', function(request, response) {
                                                                                                                        //   console.log('Home page visited!');
                                                                                                                          const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                                                                          fs.readFile(filePath, 'utf8', function (err,data) {
                                                                                                                            if (err) {
                                                                                                                              return console.log(err);
                                                                                                                            }
                                                                                                                            data = data.replace(/\$OG_TITLE/g, 'Return Order - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                                                                            data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/returnorder');
                                                                                                                            // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                                                                            data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                                                                            data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                                                                            var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                                                                            response.send(result);
                                                                                                                          });
                                                                                                                        });



                                                                                                                        app.get('/diabeticprofile', function(request, response) {
                                                                                                                            //   console.log('Home page visited!');
                                                                                                                              const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                                                                              fs.readFile(filePath, 'utf8', function (err,data) {
                                                                                                                                if (err) {
                                                                                                                                  return console.log(err);
                                                                                                                                }
                                                                                                                                data = data.replace(/\$OG_TITLE/g, 'Diabetic Profile - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                                                                                data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/diabeticprofile');
                                                                                                                                // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                                                                                data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                                                                                data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                                                                                var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                                                                                response.send(result);
                                                                                                                              });
                                                                                                                            });



                                                                                                                            app.get('/intellectual', function(request, response) {
                                                                                                                                //   console.log('Home page visited!');
                                                                                                                                  const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                                                                                  fs.readFile(filePath, 'utf8', function (err,data) {
                                                                                                                                    if (err) {
                                                                                                                                      return console.log(err);
                                                                                                                                    }
                                                                                                                                    data = data.replace(/\$OG_TITLE/g, 'Intellectual Property - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                                                                                    data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/intellectual');
                                                                                                                                    // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                                                                                    data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                                                                                    data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                                                                                    var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                                                                                    response.send(result);
                                                                                                                                  });
                                                                                                                                });
    
                                                                                                                                app.get('/Returnpolicy', function(request, response) {
                                                                                                                                    //   console.log('Home page visited!');
                                                                                                                                      const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                                                                                      fs.readFile(filePath, 'utf8', function (err,data) {
                                                                                                                                        if (err) {
                                                                                                                                          return console.log(err);
                                                                                                                                        }
                                                                                                                                        data = data.replace(/\$OG_TITLE/g, 'Return Policy - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                                                                                        data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/Returnpolicy');
                                                                                                                                        // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                                                                                        data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                                                                                        data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                                                                                        var result = data.replace(/\$OG_IMAGE/g,ImgUrl );
                                                                                                                                        response.send(result);
                                                                                                                                      });
                                                                                                                                    });
    
                                                                                                                                    app.get('/Shippingpolicy', function(request, response) {
                                                                                                                                        //   console.log('Home page visited!');
                                                                                                                                          const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                                                                                          fs.readFile(filePath, 'utf8', function (err,data) {
                                                                                                                                            if (err) {
                                                                                                                                              return console.log(err);
                                                                                                                                            }
                                                                                                                                            data = data.replace(/\$OG_TITLE/g, 'Shipping Policy - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                                                                                            data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/Shippingpolicy');
                                                                                                                                            // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                                                                                            data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                                                                                            data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                                                                                            var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                                                                                            response.send(result);
                                                                                                                                          });
                                                                                                                                        });


                                                                                                                                        app.get('/paymentsuccess/:txnid', function(request, response) {
                                                                                                                                            //   console.log('Home page visited!');
                                                                                                                                              const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                                                                                              fs.readFile(filePath, 'utf8', function (err,data) {
                                                                                                                                                if (err) {
                                                                                                                                                  return console.log(err);
                                                                                                                                                }
                                                                                                                                                data = data.replace(/\$OG_TITLE/g, 'Payment Success  - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                                                                                                data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/paymentsuccess/'+request.params.txnid);
                                                                                                                                                // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                                                                                                data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                                                                                                data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                                                                                                var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                                                                                                response.send(result);
                                                                                                                                              });
                                                                                                                                            });


                                                                                                                                            app.get('/ordersuccess/:txnid', function(request, response) {
                                                                                                                                              //   console.log('Home page visited!');
                                                                                                                                                const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                                                                                                fs.readFile(filePath, 'utf8', function (err,data) {
                                                                                                                                                  if (err) {
                                                                                                                                                    return console.log(err);
                                                                                                                                                  }
                                                                                                                                                  data = data.replace(/\$OG_TITLE/g, 'Order Success  - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                                                                                                  data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/paymentsuccess/'+request.params.txnid);
                                                                                                                                                  // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                                                                                                  data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                                                                                                  data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                                                                                                  var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                                                                                                  response.send(result);
                                                                                                                                                });
                                                                                                                                              });

                                                                                                                                            app.get('/paymentprocess/:txnid', function(request, response) {
                                                                                                                                                //   console.log('Home page visited!');
                                                                                                                                                  const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                                                                                                  fs.readFile(filePath, 'utf8', function (err,data) {
                                                                                                                                                    if (err) {
                                                                                                                                                      return console.log(err);
                                                                                                                                                    }
                                                                                                                                                    data = data.replace(/\$OG_TITLE/g, 'Payment Processing  - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                                                                                                    data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/paymentprocess/'+request.params.txnid);
                                                                                                                                                    // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                                                                                                    data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                                                                                                    data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                                                                                                    var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                                                                                                    response.send(result);
                                                                                                                                                  });
                                                                                                                                                });



                                                                                                                                                app.get('/paymentfail/:txnid', function(request, response) {
                                                                                                                                                    //   console.log('Home page visited!');
                                                                                                                                                      const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                                                                                                      fs.readFile(filePath, 'utf8', function (err,data) {
                                                                                                                                                        if (err) {
                                                                                                                                                          return console.log(err);
                                                                                                                                                        }
                                                                                                                                                        data = data.replace(/\$OG_TITLE/g, 'Payment Failed  - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                                                                                                        data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/paymentfail/'+request.params.txnid);
                                                                                                                                                        // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                                                                                                        data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                                                                                                        data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                                                                                                        var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                                                                                                        response.send(result);
                                                                                                                                                      });
                                                                                                                                                    });

                                                                                                                                                    app.get('/search/:key', function(request, response) {
                                                                                                                                                        //   console.log('Home page visited!');
                                                                                                                                                          const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                                                                                                          fs.readFile(filePath, 'utf8', function (err,data) {
                                                                                                                                                            if (err) {
                                                                                                                                                              return console.log(err);
                                                                                                                                                            }
                                                                                                                                                            data = data.replace(/\$OG_TITLE/g, request.params.key+' - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                                                                                                            data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/search/'+request.params.key);
                                                                                                                                                            // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                                                                                                            data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                                                                                                            data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                                                                                                            var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                                                                                                            response.send(result);
                                                                                                                                                          });
                                                                                                                                                        });


                                                                                                                                                        app.get('/verifyemail/:email', function(request, response) {
                                                                                                                                                            //   console.log('Home page visited!');
                                                                                                                                                              const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                                                                                                              fs.readFile(filePath, 'utf8', function (err,data) {
                                                                                                                                                                if (err) {
                                                                                                                                                                  return console.log(err);
                                                                                                                                                                }
                                                                                                                                                                data = data.replace(/\$OG_TITLE/g, 'Verify Email - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                                                                                                                data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/verifyemail/'+request.params.email);
                                                                                                                                                                // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                                                                                                                data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                                                                                                                data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                                                                                                                var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                                                                                                                response.send(result);
                                                                                                                                                              });
                                                                                                                                                            });

                                                                                                                                                            app.get('/Termsmarketplace', function(request, response) {
                                                                                                                                                              //   console.log('Home page visited!');
                                                                                                                                                                const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                                                                                                                fs.readFile(filePath, 'utf8', function (err,data) {
                                                                                                                                                                  if (err) {
                                                                                                                                                                    return console.log(err);
                                                                                                                                                                  }
                                                                                                                                                                  data = data.replace(/\$OG_TITLE/g, 'Terms of Market Place - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                                                                                                                  data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/Termsmarketplace');
                                                                                                                                                                  // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                                                                                                                  data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                                                                                                                  data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                                                                                                                  var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                                                                                                                  response.send(result);
                                                                                                                                                                });
                                                                                                                                                              });


                                                                                                                                                              app.get('/festive-offers', function(request, response) {
                                                                                                                                                                //   console.log('Home page visited!');
                                                                                                                                                                  const filePath = path.resolve(__dirname, './build', 'index.html');
                                                                                                                                                                  fs.readFile(filePath, 'utf8', function (err,data) {
                                                                                                                                                                    if (err) {
                                                                                                                                                                      return console.log(err);
                                                                                                                                                                    }
                                                                                                                                                                    data = data.replace(/\$OG_TITLE/g, 'Festive Offers - BeatMySugar | Buy Diabetic Products and Healthcare Services');
                                                                                                                                                                    data = data.replace(/\$OG_URL/g, 'https://www.beatmysugar.com/festive-offers');
                                                                                                                                                                    // data = data.replace(/\$OG_TYPE/g, 'BeatMySugar');
                                                                                                                                                                    data = data.replace(/\$OG_DESCRIPTION/g, 'BeatMySugar.com - Simplifying Diabetes Management is an Ecommerce Marketplace for Diabetic Products, Healthcare Services, Diabetic related Services & we provide Diabetic Health Knowledge suggested by Professional Doctors & Nutritionists.');
                                                                                                                                                                    data = data.replace(/\$KEYWORDS/g, 'Diabetes, Health Knowledge, Diabetic Care, Health Care, Diabetic Products, Diabetic Food, Health Food, Keto Food, Diabetic Foot Care, Diabetic Devices, Healthcare Devices, Doctors, Nutritionists, Health Insurance, Beverages/Drinks, Diabetes Friendly Food, Diabetes Friendly Sweets, Diabetes Supplements, Health Supplements, Immunity Boosters, Keto Food, Kids Nutrition, Sugar Substitutes, Superfoods');
                                                                                                                                                                    var result = data.replace(/\$OG_IMAGE/g, ImgUrl);
                                                                                                                                                                    response.send(result);
                                                                                                                                                                  });
                                                                                                                                                                });
  // app.use(cors())
// app.use(cors())
app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', function(request, response) {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  response.sendFile(filePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`));