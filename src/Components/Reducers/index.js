import {combineReducers} from 'redux';
import LoginReducers from './LoginReducers';
 import ChangePasswordReducer from './ChangePasswordReducer';
import StaffReducers from './StaffReducers';
import BrandReducers from './BrandReducers';
import CompanyReducers from './CompanyReducers';
import CategoriesReducers from './CategoriesReducers';
import FoodFilterReducers from './FoodFilterReducers';
import BookLangReducer from './BookslangReducers';
import BookCategoryReducer from './BookCategoryReducers';
import DeviceCategoryReducers from './DeviceCategoryREducers';
import DeviceFilterReducers from './DeviceFilterReducers';
import FootwearTypeReducers from './FootwearTypeReducers';
import FootwearColorReducers from './FootwearColorReducers';
import FootwearsizeReducers from './FootwearSizeReducers';
import SocksSizeReducers from './SockssizeReducers';
import PackageTypeRedeucers from './PackagingTypeReducers';
import PackageSizeRedeucers from './PackageSizeReducers';
import DosageFormReducer from './DosageFormReducers';
import MedicineReducer from './MedicineCategoryReducers';
import SaltReducers from './SaltReducers';
import AddFoodReducers from './AddFoodReducers';
import AddFootwearReducers from './FootwearReducers';
import AddScoksReducers from './SocksReducers';
import BookReducers from './BookReducers';
import HealthServiceReducers from './HealthServiceReducers';
import HealthFacilityReducers from './HealthFacilityReducers'
import AddBlogReducer from './AddBlogReducer';
import AddContributerReducer from './AddContributerReducer';
import DoctorReducer from './DoctorReducer';
import DietitianReducer from './DietitianReducer';
import HealthCenterReducer from './HealthCenterReducer';
import ArticleTagReducer from './ArticleTagReducer';
import ArticleCategoryReducer from './ArticleCategoryReducer';
import ArticleSubCategoryReducer from './ArticleSubCategoryReducer';
import FoodFlavourReducer from './FoodFlavourReducer';
import VendorReducer from './AddvendorReducer';
import SocksType from './SocksTypeReducers';
import Career from './CareerReducer';
import SocksColorReducer from './SocksColorReducer';
import SocksTypeReducers from './SocksTypeReducers';
import QualificationReducer from './QualificationReducer';
import SpecializationReducer from './SpecializationReducer'
import VenderLicenseReducer from './VenderLicenseReducer'
import VenderFacilitiesReducer from './VenderFacilitiesReducer';
import AccreditationReducer from './AccreditationReducer';
import OfferReducer from './OfferReducer';
import ViewSell from './ViewSellWithUSReducers';
import ViewInsurance from './ViewInsuranceReducers';

import ChapterReducer from '../../Reducer/Education/ChapterReducer';
export default combineReducers({
    OfferReducer:OfferReducer,
    LoginReducers:LoginReducers,
    ChangePasswordReducer:ChangePasswordReducer,
    StaffReducers:StaffReducers,
    BrandReducers:BrandReducers,
    CompanyReducers:CompanyReducers,
    FoodCat:CategoriesReducers,
    FoodFilter:FoodFilterReducers,
    BookLang:BookLangReducer,
    BookCat:BookCategoryReducer,
    DeviceCat:DeviceCategoryReducers,
    DeviceFil:DeviceFilterReducers,
    FootType:FootwearTypeReducers,
    FootColor:FootwearColorReducers,
    FootSize:FootwearsizeReducers,
    SocksSizeReducers:SocksSizeReducers,
    PackageType:PackageTypeRedeucers,
    PackageSizeReducer:PackageSizeRedeucers,
    DosageForm:DosageFormReducer,
    MedicineCategory:MedicineReducer,
    SaltReducers:SaltReducers,
    FoodItemReducer:AddFoodReducers,
    FootwearItemReducer:AddFootwearReducers,
    SocksItemReducers:AddScoksReducers,
    BookReducers:BookReducers,
    HealthService:HealthServiceReducers,
    HealthFacility:HealthFacilityReducers,
    Addblog:AddBlogReducer,
    AddContributer : AddContributerReducer,
    Doctor : DoctorReducer,
    Dietitian : DietitianReducer,
    HealthCenter : HealthCenterReducer,
    ArticleTag : ArticleTagReducer,
    ArticleCategory : ArticleCategoryReducer,
    ArticleSubCategory : ArticleSubCategoryReducer,
    FoodFlavourMaster : FoodFlavourReducer,
    VendorReducer: VendorReducer,
    SocksType:SocksTypeReducers,
    SocksColor:SocksColorReducer,
    Qualification :QualificationReducer,
    Specialization : SpecializationReducer,
    VenderLicense : VenderLicenseReducer,
    VenderFacilities : VenderFacilitiesReducer,
    Accreditation : AccreditationReducer,
    Career:Career,
    ViewSell:ViewSell,
    ViewInsurance:ViewInsurance,
    // Education Reducer
    educationChapter : ChapterReducer

})