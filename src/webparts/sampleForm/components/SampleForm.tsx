import * as React from 'react';
// import styles from './SampleForm.module.scss';
import type { ISampleFormProps } from './ISampleFormProps';
import { ISampleFormState } from './ISampleFormState';
import { useState } from 'react';
import {Web} from "@pnp/sp/presets/all";
import "@pnp/sp/items";
import "@pnp/sp/lists";
import { Dialog } from '@microsoft/sp-dialog';
import {  PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { PrimaryButton, Slider, TextField } from '@fluentui/react';
const SampleForm:React.FC<ISampleFormProps>=(props)=>{ /// Name ----[], Age=[], Salary=[],Email=[],FullAddress=[]
  const[formdata,setFormData]=useState<ISampleFormState>({
    Name:"",
    EmpAge:"",
    Compensation:"",
    FullAddress:"",
    Email:"",
    Score:1,
    Manager:[],
    ManagerId:[],
    Admin:"",
    AdminId:""
  });
  //get Manager
  const  _getManager=(items: any[]) =>{
    const managerNames=items.map((item:any)=>item.text)
       const managerNamesId=items.map((item:any)=>item.id)
       setFormData(prev=>({...prev,Manager:managerNames,ManagerId:managerNamesId}))
  console.log('Items:', items);
}
//get admin
const _getAdminItems=(items: any[]) =>{
  if(items.length>0){
    setFormData(prev=>({...prev,Admin:items[0].text,AdminId:items[0].id}))
  }
  console.log('Items:', items);
}
const createForm=async()=>{
  try{
const web=Web(props.siteurl);
const listname= web.lists.getByTitle(props.ListName);
const items=await listname.items.add({
  Title:formdata.Name,
  Age:parseInt(formdata.EmpAge),
  Salary:parseFloat(formdata.Compensation),
  Address:formdata.FullAddress,
  EmailAddress:formdata.Email,
  Score:formdata.Score,
  AdminId:formdata.AdminId,
  ManagerId:{results:formdata.ManagerId}
});
Dialog.alert("data has been saved");
console.log(items);
setFormData({
   Name:"",
    EmpAge:"",
    Compensation:"",
    FullAddress:"",
    Email:"",
    Score:1,
     Manager:[],
    ManagerId:[],
    Admin:"",
    AdminId:""
});
  }
  catch(err){
Dialog.alert("Error while saving the data");
console.log(err);
  }
}

//form event 
const handleChange=(fieldValue:keyof ISampleFormState,value:number|string|boolean):void=>{
  setFormData(prev=>({...prev,[fieldValue]:value}));
}
  return(
    <>
    <TextField
    label='Name'
    value={formdata.Name}
    onChange={(_,e)=>handleChange("Name",e||"")}
    />
       <TextField
    label='Email Address'
    value={formdata.Email}
    onChange={(_,e)=>handleChange("Email",e||"")}
    />
       <TextField
    label='Age'
    value={formdata.EmpAge}
    onChange={(_,e)=>handleChange("EmpAge",e||"")}
    />
       <TextField
    label='Salary'
    value={formdata.Compensation}
    onChange={(_,e)=>handleChange("Compensation",e||"")}
    />
    <Slider
    label='Score'
    value={formdata.Score}
    max={100}
    step={1}
    onChange={(val)=>handleChange("Score",val)}
    />
    {/* People Picker */}
    <PeoplePicker
    context={props.context as any}
    titleText="Admin"
    personSelectionLimit={1}
    showtooltip={true}
    onChange={_getAdminItems}
    // showHiddenInUI={false}
    principalTypes={[PrincipalType.User]}
    ensureUser={true}
    defaultSelectedUsers={[formdata.Admin?formdata.Admin:""]}
    resolveDelay={1000} 
    webAbsoluteUrl={props.siteurl}/>
    <PeoplePicker
    context={props.context as any}
    titleText="Managers"
    personSelectionLimit={2}
    showtooltip={true}
    onChange={_getManager}
    // showHiddenInUI={false}
    principalTypes={[PrincipalType.User]}
    ensureUser={true}
    defaultSelectedUsers={formdata.Manager}
    resolveDelay={1000} 
    webAbsoluteUrl={props.siteurl}/>
       <TextField
    label='Full Address'
    value={formdata.FullAddress}
    onChange={(_,e)=>handleChange("FullAddress",e||"")}
    multiline
    rows={5}
    />
    <br/>
    <PrimaryButton
    text='Save' onClick={createForm} iconProps={{iconName:"save"}}
    />
    </>
  )
}
export default SampleForm;