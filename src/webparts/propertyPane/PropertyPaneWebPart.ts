import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,PropertyPaneToggle,PropertyPaneSlider,PropertyPaneDropdown,PropertyPaneChoiceGroup
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import * as strings from 'PropertyPaneWebPartStrings';
import PropertyPane from './components/PropertyPane';
import { IPropertyPaneProps } from './components/IPropertyPaneProps';

export interface IPropertyPaneWebPartProps {
  TextLabelProperty:string;
ToggleOptions:boolean;
Multilinetextfield:string;
DropdownOptions:string;
GenderOptions:string;
SliderCount:string;
}

export default class PropertyPaneWebPart extends BaseClientSideWebPart<IPropertyPaneWebPartProps> {



  public render(): void {
    const element: React.ReactElement<IPropertyPaneProps> = React.createElement(
      PropertyPane,
      {
       TextLabelProperty:this.properties.TextLabelProperty,
       ToggleOptions:this.properties.ToggleOptions,
       Multilinetextfield:this.properties.Multilinetextfield,
       DropdownOptions:this.properties.DropdownOptions,
       GenderOptions:this.properties.GenderOptions,
       SliderCount:this.properties.SliderCount
      }
    );

    ReactDom.render(element, this.domElement);
  }
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
// protected get disableReactivePropertyChanges():boolean{
//   return true
// }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('TextLabelProperty', {
                  label: strings.TextFieldLabel
                }),
                PropertyPaneToggle('ToggleOptions',{
                  label:'Toggle Options',
                  onText:'ON',
                  offText:'OFF'
                }),
                PropertyPaneDropdown('DropdownOptions',{
                  label:'Department',
                  options:[
                    {key:'IT',text:'IT'},
                    {key:'HR',text:'HR'}
                  ]
                }),
                PropertyPaneChoiceGroup('GenderOptions',{
                  label:'Gender',
                  options:[
                    {key:'Male',text:'Male'},
                    {key:'Female',text:'Female'}
                  ]
                }),
                PropertyPaneSlider('SliderCount',{
                  label:'Score',
                  min:0,
                  max:100,
                  step:1
                }),
                PropertyPaneTextField('Multilinetextfield',{
                 label: strings.MultiLineTextFieldLabel,
                 multiline:true,
                 rows:5
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
