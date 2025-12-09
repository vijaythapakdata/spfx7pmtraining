import * as React from 'react';
// import styles from './FunctionalForm.module.scss';
import type { IFunctionalFormProps } from './IFunctionalFormProps';
import { IFunctionalFormState } from './IFunctionalFormState';
import {Web} from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Dialog } from '@microsoft/sp-dialog';
import { PrimaryButton, Slider, TextField } from '@fluentui/react';
 const FunctionalForm:React.FC<IFunctionalFormProps>=(props)=>{
  const [formdata,setFormData]=React.useState<IFunctionalFormState>({
    Name:"",
    Email:"",
    Age:"",
    FullAddress:"",
    Score:1,
    Salary:""
  });
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
  Salary:parseFloat(formdata.Salary)
});
Dialog.alert("Item created successfully");
console.log(item);
setFormData({
    Name:"",
    Email:"",
    Age:"",
    FullAddress:"",
    Score:1,
    Salary:""
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
