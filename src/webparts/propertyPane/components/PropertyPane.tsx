import * as React from 'react';
import type { IPropertyPaneProps } from './IPropertyPaneProps';

const PropertyPane:React.FC<IPropertyPaneProps>=(props)=>{
  return(
    <>
    <div>
      <strong>ListName :</strong>{props.TextLabelProperty}
    </div>
     <div>
      <strong>Toggle :</strong>{props.ToggleOptions?'ON':'OFF'}
    </div>
      <div>
      <strong>Department :</strong>{props.DropdownOptions}
    </div>
     <div>
      <strong>Gender :</strong>{props.GenderOptions}
    </div>
     <div>
      <strong>Score :</strong>{props.SliderCount}
    </div>
     <div>
      <strong>Full Address :</strong>{props.Multilinetextfield}
    </div>
    </>
  )
}
export default PropertyPane;
