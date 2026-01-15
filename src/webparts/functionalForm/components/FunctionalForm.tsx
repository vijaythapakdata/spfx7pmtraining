import * as React from 'react';
// import styles from './FunctionalForm.module.scss';
import type { IFunctionalFormProps } from './IFunctionalFormProps';
import { IFunctionalFormState } from './IFunctionalFormState';
import {Web} from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Dialog } from '@microsoft/sp-dialog';
import { PrimaryButton, Slider, TextField ,Dropdown, ChoiceGroup, IDropdownOption,DatePicker} from '@fluentui/react';
import {PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { DatePickerStrings, FormateDate } from '../../../DatePickerFiles/DateValue';
// import { DatePicker } from 'antd';

 const FunctionalForm:React.FC<IFunctionalFormProps>=(props)=>{
  const [formdata,setFormData]=React.useState<IFunctionalFormState>({
    Name:"",
    Email:"",
    Age:"",
    FullAddress:"",
    Score:1,
    Salary:"",
    Manager:[],
    ManagerId:[],
    Admin:"",
    AdminId:0,
    Department:"",
    Gender:"",
    Skills:[],
    City:"",
    DOB:null
  });

  //get admin
  const getAdmin=(items:any[])=>{
    if(items.length>0){
      setFormData(prev=>({...prev,Admin:items[0].text,AdminId:items[0].id}))
    }
    else{
      setFormData(prev=>({...prev,Admin:"",AdminId:0}))
    }
  }
  //get managers
  const getManagers=(items:any)=>{
    setFormData(prev=>({...prev,Manager:items.map((i:any)=>i.text)}));
     setFormData(prev=>({...prev,ManagerId:items.map((i:any)=>i.id)}));
  }

  ///get skills options
  const getSKillsOptions=(event:React.ChangeEvent<HTMLInputElement>,options:IDropdownOption):void=>{
    //[q,b,c,d]=[c,d]
    const selectedkey=options.selected?[...formdata.Skills,options?.key as string]:formdata.Skills.filter((key)=>key!=options.key);
    setFormData(prev=>({...prev,Skills:selectedkey}));
  }
  //create form

  const createform=async()=>{
    try{
//get site url

const web=Web(props.siteurl);
//get list name
const listName=web.lists.getByTitle(props.ListName);
//add items
const item=await listName.items.add({
  Title:formdata.Name,
  EmailAddress:formdata.Email,
  Age:parseInt(formdata.Age),
  Address:formdata.FullAddress,
  Score:formdata.Score,
  Salary:parseFloat(formdata.Salary),
  AdminId:formdata.AdminId,
  ManagerId:{results:formdata.ManagerId},
  Department:formdata.Department,
  Gender:formdata.Gender,
  Skills:{results:formdata.Skills},
  CityId:formdata.City,
  DOB:new Date(formdata.DOB)
});
Dialog.alert("Item created successfully");
console.log(item);
setFormData({
    Name:"",
    Email:"",
    Age:"",
    FullAddress:"",
    Score:1,
    Salary:"",
     Manager:[],
    ManagerId:[],
    Admin:"",
    AdminId:0,
     Department:"",
    Gender:"",
    Skills:[],
    City:"",
        DOB:null
});
    }
    catch(err){
console.log(err);
    }
  }
  //event handling
  const handleChange=(fieldValue:keyof IFunctionalFormState,value:number|string|boolean)=>{
    setFormData(prev=>({...prev,[fieldValue]:value})); // a=[1,2,3,4,5], b[...a[3,4],[7,8,9]] console.log(b)=[1,2,3,4,5,7,8,9]

  }
  return(
    <>
    <TextField
    label='Name'
    value={formdata.Name}
    onChange={(_,e)=>handleChange("Name",e||"")}
    />
     <TextField
    label='Age'
    value={formdata.Age}
    onChange={(_,e)=>handleChange("Age",e||"")}
    />
     <TextField
    label='Email Address'
    value={formdata.Email}
    onChange={(_,e)=>handleChange("Email",e||"")}
    />
     <TextField
    label='Salary'
    value={formdata.Salary}
    onChange={(_,e)=>handleChange("Salary",e||"")}
    />
    <Slider
    label="Score"
    min={1}
    max={100}
    value={formdata.Score}
    step={1}
    onChange={(val)=>handleChange("Score",val)}
    />
    {/* Peoplepicker */}
    <PeoplePicker
    context={props.context as any}
    titleText="Admin"
    personSelectionLimit={1}
    showtooltip={true}
    onChange={getAdmin}
    principalTypes={[PrincipalType.User]}
    resolveDelay={1000} 
    ensureUser={true}
    webAbsoluteUrl={props.siteurl}
    defaultSelectedUsers={[formdata.Admin?formdata.Admin:'']}
    />
    <PeoplePicker
    context={props.context as any}
    titleText="Manager"
    personSelectionLimit={2}
    showtooltip={true}
    onChange={getManagers}
    principalTypes={[PrincipalType.User]}
    resolveDelay={1000} 
    ensureUser={true}
    webAbsoluteUrl={props.siteurl}
    defaultSelectedUsers={formdata.Manager}
    />
    {/* Dropdown & ChoiceGroup */}
    <Dropdown
    label='Department'
       placeholder='--select--'
    options={props.departmentoptions}
    selectedKey={formdata.Department}
    onChange={(_,options)=>handleChange("Department",options?.key as string)}
    />
     <ChoiceGroup
    label='Gender'
    options={props.genderoptions}
    selectedKey={formdata.Gender}
    onChange={(_,options)=>handleChange("Gender",options?.key as string)}
    />
     <Dropdown
    label='City'
       placeholder='--select--'
    options={props.cityoptions}
    selectedKey={formdata.City}
    onChange={(_,options)=>handleChange("City",options?.key as string)}
    />
    {/* Mulitselect dropdown */}
     <Dropdown
    label='SKills'
    placeholder='--select--'
    options={props.skillsoptions}
    defaultSelectedKeys={formdata.Skills}
   onChange={getSKillsOptions}
   multiSelect
    />
    {/* Date Picker */}
    <DatePicker
    label='Date of Birth'
    strings={DatePickerStrings}
    formatDate={FormateDate}
    onSelectDate={(e)=>setFormData(prev=>({...prev,DOB:e}))}
    />
     <TextField
    label='Full Address'
    value={formdata.FullAddress}
    onChange={(_,e)=>handleChange("FullAddress",e||"")}
    multiline
    rows={5}
    />
    <br/>
    <PrimaryButton
    text='Save' onClick={createform} iconProps={{iconName:'Save'}}
    />
    </>
  )
}
export default FunctionalForm
