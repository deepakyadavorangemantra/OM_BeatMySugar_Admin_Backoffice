// import time from "react-times/lib/utils/time";
// import Qualification from "../Qualification";
import time from "react-times/lib/utils/time";


export const setusername = Username =>{
    return{
        type:"SET_USERNAME",
        payload:Username
    };
};


export const setpassword = Password =>{
    return{
        type:"SET_PASSWORD",
        payload:Password
    };
};

// -----ChangePAssword---------------
export const setchangeoldpassword=changeoldpassword =>{
    return{
        type:"SET_CHANGEOLDPASSWORD",
        payload:changeoldpassword
    }
}
export const setchangenewpassword=changenewpassword =>{
    return{
        type:"SET_CHANGENEWPASSWORD",
        payload:changenewpassword
    }
}
export const setchangeconfirmpassword=changeconfirmpassword =>{
    return{
        type:"SET_CHANGECONFIRMPASSWORD",
        payload:changeconfirmpassword
    }
}
export const setclearchangepassword=() =>{
    return{
        type:"CLEAR_CHANGEPASSWORD",

    }
}

//--------------------------Add Blog Reducer---------------------------

export const setCategory= Category =>{
    return{
        type:"CATEGORY",
        payload:Category
    }
} 

export const setSubCategory= SubCategory =>{
    return{
        type:"SUBCATEGORY",
        payload:SubCategory
    }
} 

export const setArticalTitle= ArticalTitle =>{
    return{
        type:"ARTICALTITLE",
        payload:ArticalTitle
    }
} 

export const setShortDescription= ShortDescription =>{
    return{
        type:"SHORTDESCRIPTION",
        payload:ShortDescription
    }
} 

export const setArticalContent= ArticalContent =>{
    return{
        type:"ARTICALCONTENT",
        payload:ArticalContent
    }
} 

export const setTages= Tages =>{
    return{
        type:"TAGES",
        payload:Tages
    }
} 

export const setWrittenByWhome= WrittenByWhome =>{
    return{
        type:"WRITTENBYWHOME",
        payload:WrittenByWhome
    }
} 

export const setReviewedBy= ReviewedBy =>{
    return{
        type:"REVIEWEDBY",
        payload:ReviewedBy
    }
} 

export const setShowOnWebsite= ShowOnWebsite =>{
    return{
        type:"SHOWONWEBSITE",
        payload:ShowOnWebsite
    }
} 
export const setClearArticle= () =>{
    return{
        type:"CLEAR",

    }
} 

//------------------------- End Add Blog Reducer-----------------------



//-------------------------Add Contributer----------------------------
export const setTitle=Title =>{
    return{
        type:"TITLE",
        payload:Title
    }
}

export const setName=Name =>{
    return{
        type:"NAME",
        payload:Name
    }
}

export const setDesignation=Designation =>{
    return{
        type:"DESIGNATION",
        payload:Designation
    }
}

export const setAddress=Address =>{
    return{
        type:"ADDRESS",
        payload:Address
    }
}

export const setCountry=Country =>{
    return{
        type:"COUNTRY",
        payload:Country
    }
}

export const setStateAc=State =>{
    return{
        type:"STATE",
        payload:State
    }
}

export const setCity=City =>{
    return{
        type:"CITY",
        payload:City
    }
}

export const setPinCode=PinCode =>{
    return{
        type:"PINCODE",
        payload:PinCode
    }
}

export const setPhone=Phone =>{
    return{
        type:"PHONE",
        payload:Phone
    }
}

export const setMobileNumber=MobileNumber =>{
    return{
        type:"MOBILENUMBER",
        payload:MobileNumber
    }
}

export const setEmailAddress=EmailAddress =>{
    return{
        type:"EMAILADDRESS",
        payload:EmailAddress
    }
}
export const setclearcontirbutor=() =>{
    return{
        type:"SET_CLEAR_CONTRIBUTORS",

    }
}


//-------------------------End Add Contributer----------------------------


//-------------------------Doctor Reducer-----------------------------

export const setTitleDo = Title =>{
    return{
        type:"TITLE",
        payload:Title
    }
}


export const setDoctorName = DoctorName =>{
    return{
        type:"DOCTORNAME",
        payload:DoctorName
    }
}


export const setMedicalRegistrationId = MedicalRegistrationId =>{
    return{
        type:"MEDICALREGISTRATIONID",
        payload:MedicalRegistrationId
    }
}


export const setSpecialization = Specialization =>{
    return{
        type:"SPECIALIZATION",
        payload:Specialization
    }
}


export const setStartDateOfPractice = StartDateOfPractice =>{
    return{
        type:"STARTDATEOFPRACTICE",
        payload:StartDateOfPractice
    }
}


export const setStartDateOfDiabetesPractice = StartDateOfDiabetesPractice =>{
    return{
        type:"STARTDATEOFDIABETESPRACTICE",
        payload:StartDateOfDiabetesPractice
    }
}


export const setOverallExperience = OverallExperience =>{
    return{
        type:"OVERALLEXPERIENCE",
        payload:OverallExperience
    }
}


export const setDiabetesExperience = DiabetesExperience =>{
    return{
        type:"DIABETESEXPERIENCE",
        payload:DiabetesExperience
    }
}


export const setQualification = Qualification =>{
    return{
        type:"QUALIFICATION",
        payload:Qualification
    }
}


export const setInstitute = Institute =>{
    return{
        type:"INSTITUTE",
        payload:Institute
    }
}


export const setCompletionYear = CompletionYear =>{
    return{
        type:"COMPLETIONYEAR",
        payload:CompletionYear
    }
}


export const setMobileNumberDo = MobileNumber =>{
    return{
        type:"MOBILENUMBER",
        payload:MobileNumber
    }
}


export const setEmailAddressDo = EmailAddress =>{
    return{
        type:"EMAILADDRESS",
        payload:EmailAddress
    }
}


export const setWebsiteDo = Website =>{
    return{
        type:"WEBSITE",
        payload:Website
    }
}


export const setFacebookDo = Facebook =>{
    return{
        type:"FACEBOOK",
        payload:Facebook
    }
}


export const setTwitterDo = Twitter =>{
    return{
        type:"TWITTER",
        payload:Twitter
    }
}


export const setLinkedinDo = Linkedin =>{
    return{
        type:"LINKEDIN",
        payload:Linkedin
    }
}


export const setYoutubeDo = Youtube =>{
    return{
        type:"YOUTUBE",
        payload:Youtube
    }
}


export const setInstagramDo = Instagram =>{
    return{
        type:"INSTAGRAM",
        payload:Instagram
    }
}


export const setHomeVisitDo = HomeVisit =>{
    return{
        type:"HOMEVISIT",
        payload:HomeVisit
    }
}


export const setTeleOnlineConsultation = TeleOnlineConsultation =>{
    return{
        type:"TELEONLINECONSULTATION",
        payload:TeleOnlineConsultation
    }
}


export const setShowonWebsiteDo = ShowonWebsite =>{
    return{
        type:"SHOWONWEBSITE",
        payload:ShowonWebsite
    }
}


export const setApprovalDo = Approval =>{
    return{
        type:"APPROVAL",
        payload:Approval
    }
}


export const setcleardoctor = () =>{
    return{
        type:"CLEAR"
    }
}



//------------------------- End of Doctor Reducer---------------------






//------------------------- Diettician ------------------------------

export const setNameDi = Name =>{
    return{
        type:"NAME",
        payload:Name
    }
}



export const setStartDateOfPracticeDi = StartDateOfPractice =>{
    return{
        type:"STARTDATEOFPRACTICE",
        payload:StartDateOfPractice
    }
}


export const setOverallExperienceDi = OverallExperience =>{
    return{
        type:"OVERALLEXPERIENCE",
        payload:OverallExperience
    }
}



export const setQualificationDi = Qualification =>{
    return{
        type:"QUALIFICATION",
        payload:Qualification
    }
}


export const setInstituteDi = Institute =>{
    return{
        type:"INSTITUTE",
        payload:Institute
    }
}


export const setCompletionYearDi = CompletionYear =>{
    return{
        type:"COMPLETIONYEAR",
        payload:CompletionYear
    }
}


export const setMobileNumberDi = MobileNumber =>{
    return{
        type:"MOBILENUMBER",
        payload:MobileNumber
    }
}


export const setEmailAddressDi = EmailAddress =>{
    return{
        type:"EMAILADDRESS",
        payload:EmailAddress
    }
}


export const setWebsiteDi = Website =>{
    return{
        type:"WEBSITE",
        payload:Website
    }
}


export const setFacebookDi = Facebook =>{
    return{
        type:"FACEBOOK",
        payload:Facebook
    }
}


export const setTwitterDi = Twitter =>{
    return{
        type:"TWITTER",
        payload:Twitter
    }
}


export const setLinkedinDi = Linkedin =>{
    return{
        type:"LINKEDIN",
        payload:Linkedin
    }
}


export const setYoutubeDi = Youtube =>{
    return{
        type:"YOUTUBE",
        payload:Youtube
    }
}


export const setInstagramDi = Instagram =>{
    return{
        type:"INSTAGRAM",
        payload:Instagram
    }
}


export const setHomeVisitDi = HomeVisit =>{
    return{
        type:"HOMEVISIT",
        payload:HomeVisit
    }
}


export const setTeleOnlineConsultationDi = TeleOnlineConsultation =>{
    return{
        type:"TELEONLINECONSULTATION",
        payload:TeleOnlineConsultation
    }
}


export const setShowonWebsiteDi = ShowonWebsite =>{
    return{
        type:"SHOWONWEBSITE",
        payload:ShowonWebsite
    }
}


export const setApprovalDi = Approval =>{
    return{
        type:"APPROVAL",
        payload:Approval
    }
}

//------------------------- End of Diettician ------------------------------

//------------------------- Health Center------------------------

export const setHealthCenterCodeHc = HealthCenterCode =>{
    return{
        type:"HEALTHCENTERCODE",
        payload:HealthCenterCode
    }
}

export const setHealthCenterTypeHc = HealthCenterType =>{
    return{
        type:"HEALTHCENTERTYPE",
        payload:HealthCenterType
    }
}

export const setHealthCenterNameHc = HealthCenterName =>{
    return{
        type:"HEALTHCENTERNAME",
        payload:HealthCenterName
    }
}

export const setAddressHc = Address =>{
    return{
        type:"ADDRESS",
        payload:Address
    }
}

export const setAreaHc = Area =>{
    return{
        type:"AREA",
        payload:Area
    }
}

export const setLandmarkHc = Landmark =>{
    return{
        type:"LANDMARK",
        payload:Landmark
    }
}

export const setCountryHc = Country =>{
    return{
        type:"COUNTRY",
        payload:Country
    }
}

export const setStateHc = State =>{
    return{
        type:"STATE",
        payload:State
    }
}

export const setCityHc = City =>{
    return{
        type:"CITY",
        payload:City
    }
}

export const setPincodeHc = Pincode =>{
    return{
        type:"PINCODE",
        payload:Pincode
    }
}

export const setPhoneHc = Phone =>{
    return{
        type:"PHONE",
        payload:Phone
    }
}

export const setMobileNumberHc = MobileNumber =>{
    return{
        type:"MOBILENUMBER",
        payload:MobileNumber
    }
}

export const setEmailAddressHc = EmailAddress =>{
    return{
        type:"EMAILADDRESS",
        payload:EmailAddress
    }
}

export const setWebsiteAddressHc = WebsiteAddress =>{
    return{
        type:"WEBSITEADDRESS",
        payload:WebsiteAddress
    }
}

export const setLatitudeHc = Latitude =>{
    return{
        type:"LATITUDE",
        payload:Latitude
    }
}

export const setLongitudeHc = Longitude =>{
    return{
        type:"LONGITUDE",
        payload:Longitude
    }
}

export const setFacilitiesHc = Facilities =>{
    return{
        type:"FACILITIES",
        payload:Facilities
    }
}

export const setServicesHc = Services =>{
    return{
        type:"SERVICES",
        payload:Services
    }
}

export const setShowonWebsiteHc = ShowOnWebsite =>{
    return{
        type:"SHOWONWEBSITE",
        payload:ShowOnWebsite
    }
}

export const setApprovalHc = Approval =>{
    return{
        type:"APPROVAL",
        payload:Approval
    }
}



export const setClearHc = () =>{
    return{
        type:"CLEAR"
    }
}



//-------------------------End Health Center------------------------


// --------------------------Staff Reducers---------------------------------------------------------
  export const setemployeeid=employeeid =>{
      return{
          type:"SET_EMPLOYEE_ID",
          payload:employeeid
      }
  }
  export const setname=name =>{
      return{
          type:"SET_NAME",
          payload:name
      }
  }
  export const setmobile=mobile =>{
      return{
          type:"SET_MOBILE",
          payload:mobile
      }
  }
  export const setemail=email =>{
    return{
        type:"SET_EMAIL",
        payload:email
    }
}

export const setdob=dob =>{
    return{
        type:"SET_DOB",
        payload:dob
    }
}
export const setgender=gender =>{
    return{
        type:"SET_GENDER",
        payload:gender
    }
}
export const setfathername=fathername =>{
    return{
        type:"SET_FATHER_NAME",
        payload:fathername
    }
}
export const setmaritalstatus=maritalstatus =>{
    return{
        type:"SET_MARITAL_STATUS",
        payload:maritalstatus
    }
}
export const setanniversary=anniversarydate =>{
    return{
        type:"SET_ANNIVERSARY_DATE",
        payload:anniversarydate
    }
}
export const setbloodgroup=bloodgroup =>{
    return{
        type:"SET_BLOOD_GROUP",
        payload:bloodgroup
    }
}
export const setchronic=chronicdisease =>{
    return{
        type:"SET_CHRONIC_DISEASE",
        payload:chronicdisease
    }
}
export const setdescription=description =>{
    return{
        type:"SET_DESCRIPTION",
        payload:description
    }
}
export const setdesignation=designation =>{
    return{
        type:"SET_DESIGNATION",
        payload:designation
    }
}
export const setdepartment=department =>{
    return{
        type:"SET_DEPARTMENT",
        payload:department
    }
}
export const setusertype=usertype =>{
    return{
        type:"SET_USER_TYPE",
        payload:usertype
    }
}
export const setjoiningdate=joiningdate =>{
    return{
        type:"SET_JOINING_DATE",
        payload:joiningdate
    }
}
export const setaddress=address =>{
    return{
        type:"SET_ADDRESS",
        payload:address
    }
}
export const setcountry=country =>{
    return{
        type:"SET_COUNTRY",
        payload:country
    }
}
export const setstate=state =>{
    return{
        type:"SET_STATE",
        payload:state
    }
}
export const setcity=city =>{
    return{
        type:"SET_CITY",
        payload:city
    }
}
export const setpincode=pincode =>{
    return{
        type:"SET_PINCODE",
        payload:pincode
    }
}

export const setpermanentaddress=address =>{
    return{
        type:"SET_PERMANENT_ADDRESS",
        payload:address
    }
}

export const setpermanentcountry=country =>{
    return{
        type:"SET_PERMANENT_COUNTRY",
        payload:country
    }
}
export const setpermanentstate=state =>{
    return{
        type:"SET_PERMANENT_STATE",
        payload:state
    }
}
export const setpermanentcity=city =>{
    return{
        type:"SET_PERMANENT_CITY",
        payload:city
    }
}
export const setpermanentpincode=pincode =>{
    return{
        type:"SET_PERMANENT_PINCODE",
        payload:pincode
    }
}
export const setstatus=status =>{
    return{
        type:"SET_STATUS",
        payload:status
    }
}

export const setaadharcard=aadharcard =>{
    return{
        type:"SET_AADHAR_CARD",
        payload:aadharcard
    }
}
export const setpancard=pancard =>{
    return{
        type:"SET_PAN_CARD",
        payload:pancard
    }
}
export const setdrivinglicenses=drivinglicenses =>{
    return{
        type:"SET_DRIVING_LICENSES",
        payload:drivinglicenses
    }
}
export const setvehiclenumber=vehiclenumber =>{
    return{
        type:"SET_VEHICLE_NUMBER",
        payload:vehiclenumber
    }
}
export const setstaffpassword=password =>{
    return{
        type:"SET_PASSWORD",
        payload:password
    }
}
export const setstaffconfirmpassword=confirmpassword =>{
    return{
        type:"SET_CONFIRM_PASSWORD",
        payload:confirmpassword
    }
}
export const setclearstaff=() =>{
    return{
        type:"CLEAR_STAFF",

    }
}

// ---------------------------Brand Master---------------------
export const setbrandname=brandname =>{
    return{
        type:"SET_BRAND_NAME",
        payload:brandname
    }
}
export const setcompanyname=companyname =>{
    return{
        type:"SET_COMPANY_NAME",
        payload:companyname
    }
}
export const setclearbrand=() =>{
    return{
        type:"CLEAR_BRAND",

    }
}
// -------------------------------CompanyMaster--------------------

export const setcompany=companyname =>{
    return{
        type:"SET_COMPANY",
        payload:companyname
    }
}
export const setclearcompany=() =>{
    return{
        type:"CLEAR_COMPANY"

    }
}
// ------------------------FoodCategory----------------

export const setfoodcategory=foodcategoryname =>{
    return{
        type:"SET_FOOD_CATEGORY",
        payload:foodcategoryname
    }
}
export const setclearfoodcategory=() =>{
    return{
        type:"CLEAR_FOOD_CATEGORY"

    }
}
// ---------------------------FoodFilter--------------------

export const setfoodfilter=filtername =>{
    return{
        type:"SET_FOOD_FILTER",
        payload:filtername
    }
}
export const setclearfoodfilter=() =>{
    return{
        type:"CLEAR_Food"

    }
}


//---------FoodFlavour--------

export const setFoodFlavourM = FoodFLavour =>{
    return{
        type:"SET_FOODFLAVOUR",
        payload: FoodFLavour
    }
}
export const setClearFoodFlavourM = () =>{
    return{
        type:"CLEAR_Food"
    }
}


// -----------------------------Book Language---------------------
export const setbooklang=language =>{
    return{
        type:"SET_BOOK_LANG",
        payload:language
    }
}
export const setclearlanguage=() =>{
    return{
        type:"CLEAR_LANG"

    }
}
// ------------------------BookCategory----------------

export const setbookcategory=bookcategoryname =>{
    return{
        type:"SET_BOOK_CATEGORY",
        payload:bookcategoryname
    }
}
export const setclearbookcategory=() =>{
    return{
        type:"CLEAR_BOOK_CATEGORY"

    }
}

// --------------------------DeviceCategory------------------
export const setdevicecategory=devicecategoryname =>{
    return{
        type:"SET_DEVICE_CATEGORY",
        payload:devicecategoryname
    }
}
export const setcleardevicecategory=() =>{
    return{
        type:"CLEAR_DEVICE_CATEGORY"

    }
}

// ---------------------------FoodFilter--------------------

export const setdevicefilter=devicefiltername =>{
    return{
        type:"SET_DEVICE_FILTER",
        payload:devicefiltername
    }
}
export const setcleardevicefilter=() =>{
    return{
        type:"CLEAR_DEVICE_FILTER"

    }
}
// --------------------------------FootwearType-------------------
export const setfootweartype=footweartype =>{
    return{
        type:"SET_FOOTWEAR_TYPE",
        payload:footweartype
    }
}
export const setclearfoottype=() =>{
    return{
        type:"CLEAR_TYPE"

    }
}

// --------------------------------FootwearColor-------------------
export const setfootwearcolor=footwearcolor =>{
    return{
        type:"SET_FOOTWEAR_COLOR",
        payload:footwearcolor
    }
}
export const setclearfootcolor=() =>{
    return{
        type:"CLEAR_COLOR"

    }
}

// --------------------------------FootwearColor-------------------
export const setfootwearsize=footwearsize =>{
    return{
        type:"SET_FOOTWEAR_SIZE",
        payload:footwearsize
    }
}
export const setclearfootsize=() =>{
    return{
        type:"CLEAR_SIZE"

    }
}
// --------------------------------FootwearSize-------------------
export const setsockssize=sockssize =>{
    return{
        type:"SET_SOCKS_SIZE",
        payload:sockssize
    }
}
export const setclearsockssize=() =>{
    return{
        type:"CLEAR_SOCKS_SIZE"

    }
}

//--------------------------SocksColor------------------------------
export const setSocksColor=Sockscolor =>{
    return{
        type:"SET_SOCKS_COLOR",
        payload:Sockscolor
    }
}
export const setclearSockscolor=() =>{
    return{
        type:"CLEAR_COLOR"

    }
}

//----------------------Qualification-------------------

export const setQualificationM = Qualification =>{
    return{
        type: "SET_QUALIFICATION",
        payload: Qualification
    }
}

export const setclearQualificationM=() =>{
    return{
        type:"CLEAR_QUALIFICATION"

    }
}

//----------------------------specialization---------------------

export const setSpecializationM = Specialization =>{
    return{
        type: "SET_SPECIALIZATION",
        payload: Specialization
    }
}

export const setclearSpecializationM=() =>{
    return{
        type:"CLEAR_SPECIALIZATION"

    }
}

//--------------------------------Vender License------------------

export const setVenderType = Type =>{
    return{
        type: "SET_TYPE",
        payload: Type
    }
}

export const setclearVenderType=() =>{
    return{
        type:"CLEAR_TYPE"

    }
}


//--------------------------------Vender Facilities------------------
export const setVenderFacility = Facility =>{
    return{
        type: "SET_FACILITY",
        payload: Facility
    }
}

export const setclearVenderFacility=() =>{
    return{
        type:"CLEAR_FACILITY"

    }
}


//--------------------AccreditationsMaster-----------

export const setNameAccred = Name =>{
    return{
        type: "SET_NAME",
        payload: Name
    }
}

export const setclearNameAccred =() =>{
    return{
        type:"CLEAR_NAME"

    }
}



// --------------------------------PackageType-------------------
export const setpackagetype=packagetype =>{
    return{
        type:"SET_PACKAGE_TYPE",
        payload:packagetype
    }
}
export const setclearpackagetype=() =>{
    return{
        type:"CLEAR_PACKAGE_TYPE"

    }
}
// --------------------------------PackagerSize-------------------
export const setpackagessize=packagesize =>{
    return{
        type:"SET_PACKAGE_SIZE",
        payload:packagesize
    }
}
export const setclearpackagessize=() =>{
    return{
        type:"CLEAR_PACKAGE_SIZE"

    }
}
// --------------------------------DosageForm-------------------
export const setdosageform=dosageform =>{
    return{
        type:"SET_DOSAGE_FORM",
        payload:dosageform
    }
}
export const setcleardosage=() =>{
    return{
        type:"CLEAR_DOSAGE"

    }
}

// --------------------------MEdicineCategory------------------
export const setmedicinecategory=medicinecategoryname =>{
    return{
        type:"SET_MEDICINE_CATEGORY",
        payload:medicinecategoryname
    }
}
export const setclearmedicinecategory=() =>{
    return{
        type:"CLEAR_MEDICINE_CATEGORY"

    }
}

// -------------------------HealthService------------------
export const sethealthservice=healthservice =>{
    return{
        type:"SET_SERVICE_TYPE",
        payload:healthservice
    }
}
export const setclearhealthservice=() =>{
    return{
        type:"CLEAR_SERVICE"

    }
}

// -------------------------HealthFacilty------------------
export const sethealthfacility=facility =>{
    return{
        type:"SET_FACILITY",
        payload:facility
    }
}
export const setclearhealthfacility=() =>{
    return{
        type:"CLEAR_FACILITY"

    }
}


// ---------------------------Salt Master---------------------
export const setcomposition=composition =>{
    return{
        type:"SET_COMPOSITION",
        payload:composition
    }
}
export const setdivision=division =>{
    return{
        type:"SET_DIVISION",
        payload:division
    }
}
export const setclearsalt=() =>{
    return{
        type:"CLEAR_SALT",

    }
}


//-----------------------------------Artical Tag-------------------------------------

export const setArticalTag = ArticalTag =>{
    return{
        type:"SETARTICALTAG",
        payload:ArticalTag
    }
}
export const setClearTag = () =>{
    return{
        type:"CLEAR_TAG"

    }
}

//----------------------------------End of Artical tag-------------------------------

//--------------------------------- Artical Category--------------------------------
export const setCategoryName = ArticleTag =>{
    return{
        type:"CATEGORYNAME",
        payload:ArticleTag
    }
}

export const setOrder = Order =>{
    return{
        type:"ORDER",
        payload:Order
    }
}

export const setClearArticleCategory = () =>{
    return{
        type:"CLEAR_ARTICLECATEGORY"

    }
}
//---------------------------------End of Artical Category--------------------------------



//---------------------------------Artical Sub Category---------------------------------
export const setSubCategoryName = SubCategoryName =>{
    return{
        type:"SUBCATEGORYNAME",
        payload:SubCategoryName
    }
}

export const setSubOrder = Order =>{
    return{
        type:"ORDER",
        payload:Order
    }
}

export const setClearArticleSubCategory = () =>{
    return{
        type:"CLEAR_ARTICLESUBCATEGORY"

    }
}
//---------------------------------End of Artical Sub Category--------------------------



// -----------------------------------AddFoodReducers------------------------------------------
export const setitemname=itemname=>{
    return{
        type:"SET_ITEM_NAME",
        payload:itemname
    }
}
export const setbrand=brand =>{
    return{
        type:"SET_BRAND",
        payload:brand
    }
}
export const setfoodcompany=companyname=>{
    return{
        type:"SET_COMPANY_NAME",
        payload:companyname
    }
}
export const setfoodmanufacture=manufacturename=>{
    return{
        type:"SET_MANUFACTURER",
        payload:manufacturename
    }
}
export const setfoodmarketer=marketername=>{
    return{
        type:"SET_MARKETER_NAME",
        payload:marketername
    }
}
export const setfooditemcategory=category=>{
    return{
        type:"SET_CATEGORY",
        payload:category
    }
}
export const setfooditemfilter=filter=>{
    return{
        type:"SET_FILTER",
        payload:filter
    }
}
export const setfooditemflavor=flavor=>{
    return{
        type:"SET_FLAVOR",
        payload:flavor
    }
}
export const setfooditemdescription=description=>{
    return{
        type:"SET_DESCRIPTION",
        payload:description
    }
}
export const setkey=keyingridents=>{
    return{
        type:"SET_KEY_INGRIDENTS",
        payload:keyingridents
    }
}
export const setreturnable=returnable=>{
    return{
        type:"SET_RETURNABLE",
        payload:returnable
    }
}
export const setreturnabledays=returnabledays=>{
    return{
        type:"SET_RETURNABLEDAYS",
        payload:returnabledays
    }
}
export const setfoodhsn=foodhsn=>{
    return{
        type:"SET_HSN",
        payload:foodhsn
    }
}
export const setfoodgst=foodgst=>{
    return{
        type:"SET_GST",
        payload:foodgst
    }
}
export const setfoodsku=foodsku=>{
    return{
        type:"SET_ITEM_SKU_BMS",
        payload:foodsku
    }
}
export const setfoodvarient=varientname=>{
    return{
        type:"SET_VARIENT_NAME",
        payload:varientname
    }
}
export const setfoodpackaging=packagingtype=>{
    return{
        type:"SET_PACKAGING_TYPE",
        payload:packagingtype
    }
}

export const setpackagingweight=packagingweight=>{
    return{
        type:"SET_PACKAGE_WEIGHT",
        payload:packagingweight
    }
}
export const setweight=weight=>{
    return{
        type:"SET_WEIGHT",
        payload:weight
    }
}
export const setunit=unitmeasure=>{
    return{
        type:"SET_UNIT_MEASURE",
        payload:unitmeasure
            
    }
}
export const setfoodprice=price=>{
    return{
        type:"SET_PRICE",
        payload:price
    }
}
export const setfooddiscount=discount=>{
    return{
        type:"SET_DISCOUNT",
        payload:discount
    }
}
export const setfooddiscountprice=discountprice=>{
    return{
        type:"SET_DISCOUNT_PRICE",
        payload:discountprice
    }
}
export const setfoodtitle=title=>{
    return{
        type:"SET_TITLE",
        payload:title
    }
}
export const setfoodkey=keyword=>{
    return{
        type:"SET_KEYWORD",
        payload:keyword
    }
}

export const setfoodmeta=metadescription=>{
    return{
        type:"SET_META_DATA",
        payload:metadescription
    }
}
export const setfoodvendor=selectvendor=>{
    return{
        type:"SET_SELECT_VENDOR",
        payload:selectvendor
    }
}
export const setfoodvendoritem=vendoritem=>{
    return{
        type:"SET_VENDOR_ITEM",
        payload:vendoritem
    }
}
export const setfoodmargin=marginamount=>{
    return{
        type:"SET_MARGIN_AMOUNT",
        payload:marginamount
    }
}
export const setfoodbmsmargin=bmsmargin=>{
    return{
        type:"SET_BMS_MARGIN",
        payload:bmsmargin
    }
}
export const setfoodapproval=approval=>{
    return{
        type:"SET_APPROVAL",
        payload:approval
    }
}

export const setpacklength=packlength=>{
    return{
        type:"SET_PACK_LENGTH",
        payload:packlength
    }
}
export const setpackbreadth=packbreadth=>{
    return{
        type:"SET_PACK_BREADTH",
        payload:packbreadth
    }
}
export const setpackheight=packheigth=>{
    return{
        type:"SET_PACK_HEIGHT",
        payload:packheigth
    }
}
export const setpackunit=packunit=>{
    return{
        type:"SET_PACK_UNIT",
        payload:packunit
    }
}
export const setpackweightunit=unitofmeasurement=>{
    return{
        type:"SET_PACK_WEIGHT_UNIT",
        payload:unitofmeasurement
    }
}
export const setweightunit=unitofmeasurement=>{
    return{
        type:"SET_WEIGHT_UNIT",
        payload:unitofmeasurement
    }
}

export const setclearfooditem=()=>{
    return{
        type:"CLEAR_FOODITEM"
    }
}

// -----------------------------------AddFootwearReducers------------------------------------------
export const setfootwearitemname=itemname=>{
    return{
        type:"SET_ITEM_NAME",
        payload:itemname
    }
}
export const setfootweargender=gender=>{
    return{
        type:"SET_GENDER",
        payload:gender
    }
}
export const setfootwearitemtype=type=>{
    return{
        type:"SET_TYPE",
        payload:type
    }
}
export const setfootwearbrand=brand =>{
    return{
        type:"SET_BRAND",
        payload:brand
    }
}
export const setfootwearcompany=companyname=>{
    return{
        type:"SET_COMPANY_NAME",
        payload:companyname
    }
}
export const setfootwearmanufacture=manufacturename=>{
    return{
        type:"SET_MANUFACTURER",
        payload:manufacturename
    }
}
export const setfootwearmarketer=marketername=>{
    return{
        type:"SET_MARKETER_NAME",
        payload:marketername
    }
}
export const setfootwearreturnable=returnable=>{
    return{
        type:"SET_RETURNABLE",
        payload:returnable
    }
}
export const setfootwearreturnabledays=returnabledays=>{
    return{
        type:"SET_RETURNABLEDAYS",
        payload:returnabledays
    }
}
export const setfootwearhsn=foodhsn=>{
    return{
        type:"SET_HSN",
        payload:foodhsn
    }
}
export const setfootweargst=foodgst=>{
    return{
        type:"SET_GST",
        payload:foodgst
    }
}
export const setfootwearsku=foodsku=>{
    return{
        type:"SET_ITEM_SKU_BMS",
        payload:foodsku
    }
}
export const setfootwearvarient=varientname=>{
    return{
        type:"SET_VARIENT_NAME",
        payload:varientname
    }
}
export const setfootwearitemsize=footwearsize=>{
    return{
        type:"SET_SIZE",
        payload:footwearsize
    }
}
export const setcolor=color=>{
    return{
        type:"SET_COLOR",
        payload:color
    }
}

export const setfootwearpackagingsize=footwearpackagingsize=>{
    return{
        type:"SET_PACKAGING_SIZE_VOLUMETRIC",
        payload:footwearpackagingsize
    }
}
export const setfootwearpackagingweight=packagingweight=>{
    return{
        type:"SET_PACKAGE_WEIGHT",
        payload:packagingweight
    }
}
export const setfootwearprice=price=>{
    return{
        type:"SET_PRICE",
        payload:price
    }
}
export const setfootweardiscount=discount=>{
    return{
        type:"SET_DISCOUNT",
        payload:discount
    }
}
export const setfootweardiscountprice=discountprice=>{
    return{
        type:"SET_DISCOUNT_PRICE",
        payload:discountprice
    }
}
export const setfootweartitle=title=>{
    return{
        type:"SET_TITLE",
        payload:title
    }
}
export const setfootwearkey=keyword=>{
    return{
        type:"SET_KEYWORD",
        payload:keyword
    }
}

export const setfootwearmeta=metadescription=>{
    return{
        type:"SET_META_DATA",
        payload:metadescription
    }
}
export const setfootwearvendor=selectvendor=>{
    return{
        type:"SET_SELECT_VENDOR",
        payload:selectvendor
    }
}
export const setfootwearitemvendor=vendoritem=>{
    return{
        type:"SET_VENDOR_ITEM",
        payload:vendoritem
    }
}
export const setfootwearmargin=marginamount=>{
    return{
        type:"SET_MARGIN_AMOUNT",
        payload:marginamount
    }
}
export const setfootwearbmsmargin=bmsmargin=>{
    return{
        type:"SET_BMS_MARGIN",
        payload:bmsmargin
    }
}
export const setfootwearapproval=approval=>{
    return{
        type:"SET_APPROVAL",
        payload:approval
    }
}

export const setfootwearpacklength=packlength=>{
    return{
        type:"SET_PACK_LENGTH",
        payload:packlength
    }
}
export const setfootwearpackbreadth=packbreadth=>{
    return{
        type:"SET_PACK_BREADTH",
        payload:packbreadth
    }
}
export const setfootwearpackheight=packheigth=>{
    return{
        type:"SET_PACK_HEIGHT",
        payload:packheigth
    }
}
export const setfootwearpackunit=packunit=>{
    return{
        type:"SET_PACK_UNIT",
        payload:packunit
    }
}
export const setfootwearpackweightunit=unitofmeasurement=>{
    return{
        type:"SET_PACK_WEIGHT_UNIT",
        payload:unitofmeasurement
    }
}
export const setfootwearvolumetricweight=volumetricweight=>{
    return{
        type:"SET_VOLUMETRIC_WEIGHT",
        payload:volumetricweight
    }
}


export const setclearfootwearitem=()=>{
    return{
        type:"CLEAR_FOOTWEARITEM"
    }
}

// -------------------------SocksReducers-------------------------------
export const setsocksitemname=itemname=>{
    return{
        type:"SET_ITEM_NAME",
        payload:itemname
    }
}
export const setsocksgender=gender=>{
    return{
        type:"SET_GENDER",
        payload:gender
    }
}
export const setsocksitemtype=type=>{
    return{
        type:"SET_TYPE",
        payload:type
    }
}
export const setsocksbrand=brand =>{
    return{
        type:"SET_BRAND",
        payload:brand
    }
}
export const setsockscompany=companyname=>{
    return{
        type:"SET_COMPANY_NAME",
        payload:companyname
    }
}
export const setsocksmanufacture=manufacturename=>{
    return{
        type:"SET_MANUFACTURER",
        payload:manufacturename
    }
}
export const setsocksmarketer=marketername=>{
    return{
        type:"SET_MARKETER_NAME",
        payload:marketername
    }
}
export const setsocksreturnable=returnable=>{
    return{
        type:"SET_RETURNABLE",
        payload:returnable
    }
}
export const setsocksreturnabledays=returnabledays=>{
    return{
        type:"SET_RETURNABLEDAYS",
        payload:returnabledays
    }
}
export const setsockshsn=foodhsn=>{
    return{
        type:"SET_HSN",
        payload:foodhsn
    }
}
export const setsocksgst=foodgst=>{
    return{
        type:"SET_GST",
        payload:foodgst
    }
}
export const setsockssku=foodsku=>{
    return{
        type:"SET_ITEM_SKU_BMS",
        payload:foodsku
    }
}
export const setsocksvarient=varientname=>{
    return{
        type:"SET_VARIENT_NAME",
        payload:varientname
    }
}
export const setsocksitemsize=sockssize=>{
    return{
        type:"SET_SIZE",
        payload:sockssize
    }
}
export const setsockscolor=color=>{
    return{
        type:"SET_COLOR",
        payload:color
    }
}

export const setsockspackagingsize=sockspackagingsize=>{
    return{
        type:"SET_PACKAGING_SIZE_VOLUMETRIC",
        payload:sockspackagingsize
    }
}
export const setsockspackagingweight=packagingweight=>{
    return{
        type:"SET_PACKAGE_WEIGHT",
        payload:packagingweight
    }
}
export const setsocksprice=price=>{
    return{
        type:"SET_PRICE",
        payload:price
    }
}
export const setsocksdiscount=discount=>{
    return{
        type:"SET_DISCOUNT",
        payload:discount
    }
}
export const setsocksdiscountprice=discountprice=>{
    return{
        type:"SET_DISCOUNT_PRICE",
        payload:discountprice
    }
}
export const setsockstitle=title=>{
    return{
        type:"SET_TITLE",
        payload:title
    }
}
export const setsockskey=keyword=>{
    return{
        type:"SET_KEYWORD",
        payload:keyword
    }
}

export const setsocksmeta=metadescription=>{
    return{
        type:"SET_META_DATA",
        payload:metadescription
    }
}
export const setsocksvendor=selectvendor=>{
    return{
        type:"SET_SELECT_VENDOR",
        payload:selectvendor
    }
}
export const setsocksitemvendor=vendoritem=>{
    return{
        type:"SET_VENDOR_ITEM",
        payload:vendoritem
    }
}
export const setsocksmargin=marginamount=>{
    return{
        type:"SET_MARGIN_AMOUNT",
        payload:marginamount
    }
}
export const setsocksbmsmargin=bmsmargin=>{
    return{
        type:"SET_BMS_MARGIN",
        payload:bmsmargin
    }
}
export const setsocksapproval=approval=>{
    return{
        type:"SET_APPROVAL",
        payload:approval
    }
}


export const setsockspacklength=packlength=>{
    return{
        type:"SET_PACK_LENGTH",
        payload:packlength
    }
}
export const setsockspackbreadth=packbreadth=>{
    return{
        type:"SET_PACK_BREADTH",
        payload:packbreadth
    }
}
export const setsockspackheight=packheigth=>{
    return{
        type:"SET_PACK_HEIGHT",
        payload:packheigth
    }
}
export const setsockspackunit=packunit=>{
    return{
        type:"SET_PACK_UNIT",
        payload:packunit
    }
}
export const setsockspackweightunit=unitofmeasurement=>{
    return{
        type:"SET_PACK_WEIGHT_UNIT",
        payload:unitofmeasurement
    }
}
export const setsocksvolumetricweight=volumetricweight=>{
    return{
        type:"SET_VOLUMETRIC_WEIGHT",
        payload:volumetricweight
    }
}

export const setclearsocksitem=()=>{
    return{
        type:"CLEAR_SOCKSITEM"
    }
}


// -----------Book Reducers-------------------------------
export const setbookitemtitle=booktitle=>{
    return{
        type:"SET_BOOK_TITLE",
        payload:booktitle
    }
}
export const setauthorname=authorname=>{
    return{
        type:"SET_AUTHOR_NAME",
        payload:authorname
    }
}
export const setpublishedby=publishedby=>{
    return{
        type:"SET_PUBLISHED_BY",
        payload:publishedby
    }
}
export const setbookitemcategory=category=>{
    return{
        type:"SET_BOOK_CATEGORY",
        payload:category
    }
}
export const setbookreturnable=returnable=>{
    return{
        type:"SET_RETURNABLE",
        payload:returnable
    }
}
export const setbookreturnabledays=returnabledays=>{
    return{
        type:"SET_RETURNABLEDAYS",
        payload:returnabledays
    }
}
export const setbookhsn=bookhsn=>{
    return{
        type:"SET_HSN",
        payload:bookhsn
    }
}
export const setbookgst=bookgst=>{
    return{
        type:"SET_GST",
        payload:bookgst
    }
}
export const setbooksku=booksku=>{
    return{
        type:"SET_BOOK_SKU",
        payload:booksku

    }
}
export const setbooktype=booktype=>{
    return{
        type:"SET_BOOK_TYPE",
        payload:booktype
    }
}
export const setbooklanguage=language=>{
    return{
        type:"SET_LANGUAGE",
        payload:language
    }
}
export const setbooksize=size=>{
    return{
        type:"SET_SIZE",
        payload:size
    }
}
export const setbookweight=weight=>{
    return{
        type:"SET_WEIGHT",
        payload:weight
    }
}
export const setbookprice=price=>{
    return{
        type:"SET_PRICE",
        payload:price
    }
}
export const setbookdiscount=discount=>{
    return{
        type:"SET_DISCOUNT",
        payload:discount
    }
}
export const setbookdiscountprice=discountprice=>{
    return{
        type:"SET_DISCOUNT_PRICE",
        payload:discountprice
    }
}
export const setbooktitle=title=>{
    return{
        type:"SET_TITLE",
        payload:title
    }
}
export const setbookkey=keyword=>{
    return{
        type:"SET_KEYWORD",
        payload:keyword
    }
}

export const setbookmeta=metadescription=>{
    return{
        type:"SET_META_DATA",
        payload:metadescription
    }
}
export const setbookvendor=selectvendor=>{
    return{
        type:"SET_SELECT_VENDOR",
        payload:selectvendor
    }
}
export const setbookitemvendor=vendoritem=>{
    return{
        type:"SET_VENDOR_ITEM",
        payload:vendoritem
    }
}
export const setbookmargin=marginamount=>{
    return{
        type:"SET_MARGIN_AMOUNT",
        payload:marginamount
    }
}
export const setbookbmsmargin=bmsmargin=>{
    return{
        type:"SET_BMS_MARGIN",
        payload:bmsmargin
    }
}
export const setbookapproval=approval=>{
    return{
        type:"SET_APPROVAL",
        payload:approval
    }
}

export const setbookspacklength=packlength=>{
    return{
        type:"SET_PACK_LENGTH",
        payload:packlength
    }
}
export const setbookspackbreadth=packbreadth=>{
    return{
        type:"SET_PACK_BREADTH",
        payload:packbreadth
    }
}
export const setbookspackheight=packheigth=>{
    return{
        type:"SET_PACK_HEIGHT",
        payload:packheigth
    }
}
export const setbookspackunit=packunit=>{
    return{
        type:"SET_PACK_UNIT",
        payload:packunit
    }
}
export const setbookspackweightunit=unitofmeasurement=>{
    return{
        type:"SET_PACK_WEIGHT_UNIT",
        payload:unitofmeasurement
    }
}
export const setbooksvolumetricweight=volumetricweight=>{
    return{
        type:"SET_VOLUMETRIC_WEIGHT",
        payload:volumetricweight
    }
}


export const setclearbookitem=()=>{
    return{
        type:"CLEAR_BOOK"
    }
}


// ------------------------------Vendor Reducer----------------------------

export const setvendorname=vendorname=>{
    return{
        type:"SET_VENDOR_NAME",
        payload:vendorname
    }
}
export const setgstin=gstin=>{
    return{
        type:"SET_GSTIN",
        payload:gstin
    }
}
export const setvendorpan=pan=>{
    return{
        type:"SET_PAN",
        payload:pan
    }
}
export const setvendortan=tan=>{
    return{
        type:"SET_TAN",
        payload:tan
    }
}

export const setvendorlicense=licensetype=>{
    return{
        type:"SET_LICENSE_TYPE",
        payload:licensetype
    }
}

export const setvendorlicenseno=licenseno=>{
    return{
        type:"SET_LICENSE_NO",
        payload:licenseno
    }
}
export const setaccreditionname=accreditioname=>{
    return{
        type:"SET_ACCREDITON_NAME",
        payload:accreditioname
    }
}
export const setvendoremail=email=>{
    return{
        type:"SET_EMAIL",
        payload:email
    }
}
export const setvendoraddress=address=>{
    return{
        type:"SET_ADDRESS",
        payload:address
    }
}
export const setvendorcountry=country=>{
    return{
        type:"SET_COUNTRY",
        payload:country
    }
}
export const setvendorstate=state=>{
    return{
        type:"SET_STATE",
        payload:state
    }
}
export const setvendorcity=city=>{
    return{
        type:"SET_CITY",
        payload:city
    }
}
export const setvendorpincode=pincode=>{
    return{
        type:"SET_PINCODE",
        payload:pincode
    }
}
export const setvendoraccount=accountnumber=>{
    return{
        type:"SET_ACCOUNT_NUMBER",
        payload:accountnumber
    }
}
export const setvendorbank=bankname=>{
    return{
        type:"SET_BANK_NAME",
        payload:bankname
    }
}
export const setvendorbranch=branch=>{
    return{
        type:"SET_BRANCH",
        payload:branch
    }
}
export const setvendorifsccode=ifsccode=>{
    return{
        type:"SET_IFSC_CODE",
        payload:ifsccode
    }
}
export const setvendorcontactpersonname=name=>{
    return{
        type:"SET_CONTACT_PERSON_NAME",
        payload:name
    }
}

export const setvendordesignation=designation=>{
    return{
        type:"SET_DESIGNATION",
        payload:designation
    }
}
export const setvendordepartment=department=>{
    return{
        type:"SET_DEPARTMENT",
        payload:department
    }
}
export const setvendorphonenumber=phonenumber=>{
    return{
        type:"SET_PHONE_NUMBER",
        payload:phonenumber
    }
}
export const setvendormobilenumber=mobilenumber=>{
    return{
        type:"SET_MOBILE_NUMBER",
        payload:mobilenumber
    }
}
export const setvendoremailaddress=emailaddress=>{
    return{
        type:"SET_EMAIL_ADDRESS",
        payload:emailaddress
        
    }
}
export const setvendorlandmark=landmark=>{
    return{
        type:"SET_LANDMARK",
        payload:landmark
    }
}
export const setvendorwebsite=website=>{
    return{
        type:"SET_WEBSITE",
        payload:website
    }
}
export const setvendorclear=()=>{
    return{
        type:"SET_CLEAR_VENDOR"
    }
}



// --------------------------------SockType-------------------
export const setsockstype=sockstype =>{
    return{
        type:"SET_SOCKS_TYPE",
        payload:sockstype
    }
}
export const setclearsockstype=() =>{
    return{
        type:"CLEAR_TYPE"

    }
}

// ----------------------------Career---------------
export const setjobtitle=jobtitle =>{
    return{
        type:"SET_JOB_TITLE",
        payload:jobtitle
    }

}
export const setcareercountry=country =>{
    return{
        type:"SET_COUNTRY",
        payload:country
    }

}
export const setcareerstate=state =>{
    return{
        type:"SET_STATE",
        payload:state
    }

}
export const setcareercity=city =>{
    return{
        type:"SET_CITY",
        payload:city
    }
}
export const setemploymenttype=employment =>{
    return{
        type:"SET_EMPLOYMENT_TYPE",
        payload:employment
    }

}
export const setcareertime=joiningtime =>{
    return{
        type:"SET_TIME",
        payload:joiningtime
    }

}
export const setclearcareer=() =>{
    return{
        type:"CLEAR_JOB"

    }
}


// --------------------Offer-----------------


export const  setoffername =  (Name) => {
    return {
      type: "SET_NAME",
      payload : Name
    };
  };
  
  export const  setoffercaption =  (Caption) => {
    return {
      type: "SET_CAPTION",
      payload : Caption
    };
  };
  
  export const  setofferprice =  (Price) => {
    return {
      type: "SET_PRICE",
      payload : Price
    };
  };
  
  
  export const  setoffermaxprice =  (MaxPrice) => {
    return {
      type: "SET_MAX_PRICE",
      payload : MaxPrice
    };
  };
  
  export const  setofferminprice =  (MinPrice) => {
    return {
      type: "SET_MIN_PRICE",
      payload : MinPrice
    };
  };
  
  
  export const  setofferdescription =  (Description) => {
    return {
      type: "SET_DESCRIPTION",
      payload : Description
    };
  };
  
  export const  setoffercode =  (Code) => {
    return {
      type: "SET_CODE",
      payload : Code
    };
  };
  
  
  export const  setofferstartdate =  (StartDate) => {
    return {
      type: "SET_START_DATE",
      payload : StartDate
    };
  };
  
  
  export const  setofferenddate=  (EndDate) => {
    return {
      type: "SET_END_DATE",
      payload : EndDate
    };
  };
  
  
  export const  setoffertermsconditions =  (TermsCondition) => {
    return {
      type: "SET_TERMS_CONDITION",
      payload : TermsCondition
    };
  };
  
  export const  setoffershowonwebsite =  (ShowOnWebsite) => {
    return {
      type: "SET_SHOW_ON_WEBSITE",
      payload : ShowOnWebsite
    };
  };
  
  
  
  export const  offercleardata =  () => {
    return {
      type: "CLEAR_DATA",
  
    };
  };


//   ------------------------ViewSell Reducers----------------------------
export const setSellCompanyName = companyname => {
    return {
      type: "SET_COMPANY_NAME",
      payload: companyname
    };
  };
  export const setSellAddress = Address => {
    return {
      type: "SET_ADDRESS",
      payload: Address
    };
  };
  export const setSellCountry = country => {
    return {
      type: "SET_COUNTRY",
      payload: country
    };
  }; 
  export const setSellState = state => {
    return {
      type: "SET_STATE",
      payload: state
    };
  }; 
  export const setSellCity = city => {
    return {
      type: "SET_CITY",
      payload: city
    };
  }; 
  export const setSellPincode = pincode => {
    return {
      type: "SET_PINCODE",
      payload: pincode
    };
  };
  export const setSelltitle = title => {
    return {
      type: "SET_TITLE",
      payload: title
    };
  };

  export const setSellname = name => {
    return {
      type: "SET_NAME",
      payload: name
    };
  };  
  export const setSelldesignation = designation => {
    return {
      type: "SET_DESIGNATION",
      payload: designation
    };
  };
  export const setSellemail = email => {
    return {
      type: "SET_EMAIL",
      payload: email
    };
  };
  
  export const setSellmobile = mobile=> {
    return {
      type: "SET_MOBILE",
      payload: mobile
    };
  };
  export const setSellworking = working => {
    return {
      type: "SET_WORKING",
      payload:  working
    };
  };
  export const setSellabout = about => {
    return {
      type: "SET_ABOUT",
      payload: about
    };
  };  

  export const setclearsell = () => {
    return {
      type: "SET_CLEAR_SELL",
    };
  };
  
  
  
//   -------------------------View Insurance Reducers--------------
export const setinsuredname = name => {
    return {
      type: "SET__NAME",
      payload: name
    };
  }; 

  export const setinsureddob = dob => {
    return {
      type: "SET__DOB",
      payload: dob
    };
  }; 
  export const setinsuredaddress = address => {
    return {
      type: "SET__ADDRESS",
      payload: address
    };
  }; 
  export const setinsuredemail = email => {
    return {
      type: "SET__EMAIL",
      payload: email
    };
  }; 
  export const setinsuredmobile = mobile => {
    return {
      type: "SET__MOBILE",
      payload: mobile
    };
  }; 
  export const setinsuredtype = type => {
    return {
      type: "SET__INSURANCE_TYPE",
      payload: type
    };
  }; 
  export const setinsuredsum = sum => {
    return {
      type: "SET__SUM",
      payload: sum
    };
  }; 
  export const setinsureddisease = disease => {
    return {
      type: "SET__CURRENT_DISEASE",
      payload: disease
    };
  }; 
  export const setinsuredpolicy = policy => {
    return {
      type: "SET__POLICY",
      payload: policy
    };
  }; 
  export const setinsureddisclosure = disclosure => {
    return {
      type: "SET__DISCLOSURE",
      payload: disclosure
    };
  };

  export const setinsuredheight = height => {
    return {
      type: "SET__HEIGHT",
      payload: height
    };
  };
  export const setinsuredweight = weight => {
    return {
      type: "SET__WEIGHT",
      payload: weight
    };
  };
  
  export const setclearinsurance = () => {
    return {
      type: "SET_CLEAR_INSURANCE",
    };
  };

//   --------------------Covid and Health Essential------------------------
export const setcoviditemname=itemname=>{
    return{
        type:"SET_ITEM_NAME",
        payload:itemname
    }
}
export const setcovidbrand=brand =>{
    return{
        type:"SET_BRAND",
        payload:brand
    }
}
export const setcovidcompany=companyname=>{
    return{
        type:"SET_COMPANY_NAME",
        payload:companyname
    }
}
export const setcovidmanufacture=manufacturename=>{
    return{
        type:"SET_MANUFACTURER",
        payload:manufacturename
    }
}
export const setcovidmarketer=marketername=>{
    return{
        type:"SET_MARKETER_NAME",
        payload:marketername
    }
}
export const setcoviditemcategory=category=>{
    return{
        type:"SET_CATEGORY",
        payload:category
    }
}
export const setcoviditemfilter=filter=>{
    return{
        type:"SET_FILTER",
        payload:filter
    }
}

export const setcoviditemdescription=description=>{
    return{
        type:"SET_DESCRIPTION",
        payload:description
    }
}

export const setcovidreturnable=returnable=>{
    return{
        type:"SET_RETURNABLE",
        payload:returnable
    }
}
export const setcovidreturnabledays=returnabledays=>{
    return{
        type:"SET_RETURNABLEDAYS",
        payload:returnabledays
    }
}
export const setcovidhsn=covidhsn=>{
    return{
        type:"SET_HSN",
        payload:covidhsn
    }
}
export const setcovidgst=covidgst=>{
    return{
        type:"SET_GST",
        payload:covidgst
    }
}
export const setcovidsku=covidsku=>{
    return{
        type:"SET_ITEM_SKU_BMS",
        payload:covidsku
    }
}
export const setcovidvarient=varientname=>{
    return{
        type:"SET_VARIENT_NAME",
        payload:varientname
    }
}
export const setcovidpackaging=packagingtype=>{
    return{
        type:"SET_PACKAGING_TYPE",
        payload:packagingtype
    }
}

export const setcovidpackagingweight=packagingweight=>{
    return{
        type:"SET_PACKAGE_WEIGHT",
        payload:packagingweight
    }
}
export const setcoviditemweight=weight=>{
    return{
        type:"SET_WEIGHT",
        payload:weight
    }
}
export const setcovidunit=unitmeasure=>{
    return{
        type:"SET_UNIT_MEASURE",
        payload:unitmeasure
            
    }
}
export const setcovidprice=price=>{
    return{
        type:"SET_PRICE",
        payload:price
    }
}
export const setcoviddiscount=discount=>{
    return{
        type:"SET_DISCOUNT",
        payload:discount
    }
}
export const setcoviddiscountprice=discountprice=>{
    return{
        type:"SET_DISCOUNT_PRICE",
        payload:discountprice
    }
}
export const setcovidtitle=title=>{
    return{
        type:"SET_TITLE",
        payload:title
    }
}
export const setcovidkey=keyword=>{
    return{
        type:"SET_KEYWORD",
        payload:keyword
    }
}

export const setcovidmeta=metadescription=>{
    return{
        type:"SET_META_DATA",
        payload:metadescription
    }
}
export const setcovidvendor=selectvendor=>{
    return{
        type:"SET_SELECT_VENDOR",
        payload:selectvendor
    }
}
export const setcovidvendoritem=vendoritem=>{
    return{
        type:"SET_VENDOR_ITEM",
        payload:vendoritem
    }
}
export const setcovidmargin=marginamount=>{
    return{
        type:"SET_MARGIN_AMOUNT",
        payload:marginamount
    }
}
export const setcovidbmsmargin=bmsmargin=>{
    return{
        type:"SET_BMS_MARGIN",
        payload:bmsmargin
    }
}
export const setcovidapproval=approval=>{
    return{
        type:"SET_APPROVAL",
        payload:approval
    }
}

export const setcoviditemcolor=color=>{
    return{
        type:"SET_COLOR",
        payload:color
    }
}
export const setpackagingsizevolumetric=volumetric=>{
    return{
        type:"SET_PACKAGING_SIZE_VOLUMETRIC",
        payload:volumetric
    }
}

export const setclearcoviditem=()=>{
    return{
        type:"CLEAR_COVIDITEM"
    }
}

//......Accessories..........


export const setItemName=itemname=>{
    return {
        type:"SET_ITEMNAME",
        payload:itemname
    }
}

// companyName:"",
// category:'',
// type:'',
// gender:'',
// country:'',
export const setBrandName=brandname=>{
    return {
        type:"SET_BRANDNAME",
        payload:brandname
    }
}
export const setCompanyName=companyname=>{
    return {
        type:"SET_COMPANYNAME",
        payload:companyname
    }
}
export const setCategories=category=>{
    return {
        type:"SET_CATEGORYNAME",
        payload:category
    }
}
export const setType=type=>{
    return {
        type:"SET_TYPENAME",
        payload:type
    }
}
export const setGender=gender=>{
    return {
        type:"SET_GENDERNAME",
        payload:gender
    }
}
export const setCountries=country=>{
    return {
        type:"SET_COUNTRYNAME",
        payload:country
    }
}
export const setDescriptions=description=>{
    return {
        type:"SET_DESCRIPTIONNAME",
        payload:description
    }
}
export const setReturnDays=returnday=>{
    return {
        type:"SET_RETURNNAME",
        payload:returnday
    }
}
export const setReturnAble=returndable=>{
    return {
        type:"SET_RETURNABLENAME",
        payload:returndable
    }
}
export const setHsn=hsncode=>{
    return {
        type:"SET_HSNNAME",
        payload:hsncode
    }
}
export const setGst=gstrate=>{
    return {
        type:"SET_GSTNAME",
        payload:gstrate
    }
}




//......Accessories Variant..........


export const setVariantName=itemname=>{
    return {
        type:"SET_VARIANTNAME",
        payload:itemname
    }
}

export const setSizeName=size=>{
    return {
        type:"SET_SIZENAME",
        payload:size
    }
}
export const setColorName=colorname=>{
    return {
        type:"SET_COLORNAME",
        payload:colorname
    }
}
export const setLength=length=>{
    return {
        type:"SET_LENGTHNAME",
        payload:length
    }
}
export const setBreadth=breath=>{
    return {
        type:"SET_BREATHNAME",
        payload:breath
    }
}
export const setHeight=height=>{
    return {
        type:"SET_HEIGHTNAME",
        payload:height
    }
}
export const setUnitOfMeasurementLength=length=>{
    return {
        type:"SET_LENGTHMEASUREMENTNAME",
        payload:length
    }
}
export const setWeigth=weigth=>{
    return {
        type:"SET_WEIGTHNAME",
        payload:weigth
    }
}
export const setUnitOfMeasurementWeight=weight=>{
    return {
        type:"SET_WEIGHTMEASUREMENTNAME",
        payload:weight
    }
}
export const setPriceMRP=returndable=>{
    return {
        type:"SET_PRICEMRP",
        payload:returndable
    }
}
export const setVendor=vendor=>{
    return {
        type:"SET_VENDORNAME",
        payload:vendor
    }
}
export const setVendorItemSku=sku=>{
    return {
        type:"SET_VENDORITEMSKUNAME",
        payload:sku
    }
}




export const setBMSMarginOn=marginon=>{
    return {
        type:"SET_BMSMARGINONNAME",
        payload:marginon
    }
}
export const setVendorSellingPrice=length=>{
    return {
        type:"SET_VENDORSELLINGPRICENAME",
        payload:length
    }
}
export const setDiscountPercent=breath=>{
    return {
        type:"SET_DISCOUNT_PRICE_PERCENT",
        payload:breath
    }
}
export const setBMSMargin=margin=>{
    return {
        type:"SET_BMSMARGINNAME",
        payload:margin
    }
}
export const setBMSMarginAmount=margin=>{
    return {
        type:"SET_BMSMARGINAMOUNTNAME",
        payload:margin
    }
}
export const setTitleBar=weigth=>{
    return {
        type:"SET_TITLEBARNAME",
        payload:weigth
    }
}
export const setKeyword=weigth=>{
    return {
        type:"SET_KEYWORDNAME",
        payload:weigth
    }
}
export const setStatus=returndable=>{
    return {
        type:"SET_STATUSNAME",
        payload:returndable
    }
}
export const setAvaibility=vendor=>{
    return {
        type:"SET_AVAIBILITYNAME",
        payload:vendor
    }
}
