import * as React from 'react';
import styles from './FormValidation.module.scss';
import type { IFormValidationProps } from './IFormValidationProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import { FormikService } from '../../../ServiceFile/service';
// import FormikService from '../../../ServiceFile/service';
import {sp} from "@pnp/sp/presets/all"
import * as Yup from 'yup';
import { FormikProps } from 'formik';
import { Dialog } from '@microsoft/sp-dialog';
// import { fill } from 'lodash';
const  FormValidation:React.FC<IFormValidationProps>=(props)=>{
  const [service,setService]=React.useState<ReturnType<typeof FormikService>|null>(null)
  React.useEffect(()=>{
sp.setup({
  spfxContext:props.context as any
});
setService(FormikService())
  },[props.context,props.siteurl]

  );

  // validation 
  const validationForm=Yup.object().shape({
    name:Yup.string().required("Task name is required"),
    details:Yup.string().min(15,"Minimum 15 or more than characters are required").required("Task details are required"),
    startDate:Yup.date().required("Start date is required"),
    endDate:Yup.date().required("End date is required"),
    emailAddress:Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber:Yup.string().required("Phone number is required").matches(/^[0-9]{10}$/,"phone number must be 10 digit"),
    projectName:Yup.string().required("Project name is required")
  });

  // common field props
  const getFieldProps=(formik:FormikProps<any>,field:string)=>({
    ...formik.getFieldProps(field),errorMessage:formik.errors[field] as string
  });

  //  create record
  const createRecord=async(record:any)=>{
    try{
      if(!service) return;
      const item =await service.createItems(props.ListName,{
        Title:record.name,
        StartDate:record.startDate,
        EndDate:record.endDate,
        ProjectName:record.projectName,
        EmailAddress:record.emailAddress,
        TaskDetails:record.details,
        PhoneNumber:record.phoneNumber
      });
      console.log(item);
      Dialog.alert("Saved successfully");
    }
    catch(err){
console.log(err);
    }
  }
  return(
    <></>
  )
}
export default  FormValidation;
