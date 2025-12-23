import * as React from 'react';
import styles from './FormValidation.module.scss';
import type { IFormValidationProps } from './IFormValidationProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import { FormikService } from '../../../ServiceFile/service';
// import FormikService from '../../../ServiceFile/service';
import {sp} from "@pnp/sp/presets/all"
import * as Yup from 'yup';
import { DatePicker, Dropdown, Label, PrimaryButton, Stack, TextField } from '@fluentui/react';
import { FormikProps ,Formik} from 'formik';
import { Dialog } from '@microsoft/sp-dialog';
import { PeoplePicker, PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
// import { fill } from 'lodash';

const stackTokens={childrenGap:10}
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
    <>
    <Formik
    initialValues={{
      name:"",
      projectName:"",
      emailAddress:"",
      phoneNumber:"",
      details:"",
      startDate:null,
      endDate:null
    }}
    validationSchema={validationForm}
    onSubmit={(values,helpers)=>{
      createRecord(values).then(()=>helpers.resetForm())
    }}
    
    >
{(formik:FormikProps<any>)=>(
  <form onSubmit={formik.handleSubmit}>
<div className={styles.formValidation}>

<Stack tokens={stackTokens}>
<Label className={styles.lbl}>User Name</Label>
<PeoplePicker
context={props.context as any}
personSelectionLimit={1}
disabled={true}
principalTypes={[PrincipalType.User]}
ensureUser={true}
defaultSelectedUsers={[props.context.pageContext.user.displayName as any]}
webAbsoluteUrl={props.siteurl}
/>
</Stack>
<Stack tokens={stackTokens} horizontal>
<Label className={styles.lbl}>Task Name</Label>
<TextField
{...getFieldProps(formik,'name')}
/>
<Label className={styles.lbl}>Email Address</Label>
<TextField
{...getFieldProps(formik,'emailAddress')}
/>
<Label className={styles.lbl}>Phone Number</Label>
<TextField
{...getFieldProps(formik,'phoneNumber')}
/>
</Stack>
<Label className={styles.lbl}>Project Name</Label>
<Stack tokens={stackTokens}>
<Dropdown

options={[
  {key:"Project 1",text:"Project 1"},
  {key:"Project 2",text:"Project 2"}
]}
selectedKey={formik.values.projectName}
onChange={(_,option)=>formik.setFieldValue('projectName',option?.key)}
errorMessage={formik.errors.projectName as string}
/>
<Label className={styles.lbl}>Start Date</Label>
<DatePicker
value={formik.values.startDate}
textField={{...getFieldProps(formik,'startDate')}}
onSelectDate={(date)=>formik.setFieldValue('startDate',date)}
/>
<Label className={styles.lbl}>End Date</Label>
<DatePicker
value={formik.values.endDate}
textField={{...getFieldProps(formik,'endDate')}}
onSelectDate={(date)=>formik.setFieldValue('endDate',date)}
/>
<Label className={styles.lbl}>Task Details</Label>
<TextField
{...getFieldProps(formik,'details')}
multiline
rows={5}
/>
</Stack>
<PrimaryButton
className={styles.btn}
type='submit'
text='Submit'
iconProps={{iconName:'save'}}
/>
<PrimaryButton
className={styles.btn}
// type='submit'
text='Cancel'
iconProps={{iconName:'cancel'}}
onClick={formik.handleReset as any}
/>
</div>
  </form>
)}

      </Formik>
    
    </>
  )
}
export default  FormValidation;
