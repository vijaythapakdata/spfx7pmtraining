import * as React from 'react';
import { PrimaryButton,Pivot,Label,IStyleSet,ILabelStyles, PivotItem,TextField,Dropdown,ChoiceGroup } from '@fluentui/react';

// basic fluetn css to give spaces between controls label
const labelStyles:IStyleSet<ILabelStyles>={
    root:{
        marginTop:10
    }
}

const ButtonSample:React.FC<{}>=()=>{
    return(
        <>
        <PrimaryButton text="Save" onClick={()=>alert("I am save button")} iconProps={{iconName:'save'}}/>
            <Pivot aria-label='Basic Pivot Example'>
<PivotItem headerText='My Files' headerButtonProps={{
    'data-order':1,
    'data-title':'My Files',
    'aria-label':'My Files Tab'
}}
itemCount={100}
itemIcon='Globe'
>

    <Label styles={labelStyles}>Content for my files</Label>
</PivotItem>
<PivotItem headerText='Recent' headerButtonProps={{
    'data-order':2,
    'data-title':'Recent Files',
    'aria-label':'Recent Files Tab'
}}
itemCount={100}
itemIcon='Recent'
>

    <Label styles={labelStyles}>Content for Recent files</Label>
    <TextField
    label='Name'
    placeholder='Enter name'
    type='text'
    iconProps={{iconName:'people'}}
    />
     <TextField
    label='Email Address'
    placeholder='Enter Email Address'
    type='mail'
    iconProps={{iconName:'mail'}}
    />
  <Dropdown
  placeholder='--select--'
  label='Department'
  options={[
    {key:'hr',text:'HR'},
    {key:'it',text:'IT'},
    {key:'finance',text:'Finance'}
  ]}

  />
  <ChoiceGroup
 label='Gender'
 options={[
    {key:'male',text:'Male'},
    {key:'female',text:'Female'}
 ]}
  />
  <TextField
    label='Comments'
    placeholder='Enter your comments'
    multiline
    rows={4}
    />
    <TextField type='file'
    label='Upload File'/>
    <br/>
    <PrimaryButton text='Submit' onClick={()=>alert('Form Submitted')} iconProps={{iconName:'upload'}} />
</PivotItem>
<PivotItem headerText='Shared with me files' headerButtonProps={{
    'data-order':3,
    'data-title':'Shared with me Files',
    'aria-label':'Shared with me Files Tab'
}}
itemCount={145}
itemIcon='Ringer'
>

    <Label styles={labelStyles}>Content for shared with me files</Label>
</PivotItem>
            </Pivot>
        </>
    )
}
export default ButtonSample;