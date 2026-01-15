import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
// import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'FunctionalFormWebPartStrings';
import FunctionalForm from './components/FunctionalForm';
import { IFunctionalFormProps } from './components/IFunctionalFormProps';

export interface IFunctionalFormWebPartProps {
  ListName: string;
}

export default class FunctionalFormWebPart extends BaseClientSideWebPart<IFunctionalFormWebPartProps> {



  public async render(): Promise<void> {
    const element: React.ReactElement<IFunctionalFormProps> = React.createElement(
      FunctionalForm,
      {
      ListName:this.properties.ListName,
      context:this.context,
      siteurl:this.context.pageContext.web.absoluteUrl,
      departmentoptions:await this.getChoiceFields(this.properties.ListName,this.context.pageContext.web.absoluteUrl,'Department'),
      genderoptions:await this.getChoiceFields(this.properties.ListName,this.context.pageContext.web.absoluteUrl,'Gender'),
      skillsoptions:await this.getChoiceFields(this.properties.ListName,this.context.pageContext.web.absoluteUrl,'Skills'),
      cityoptions:await this.getLookup()
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
                PropertyPaneTextField('ListName', {
                  label: strings.ListFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
   private async getChoiceFields(ListName:string,siteurl:string,fieldValue:any):Promise<any>{
    try{
const response=await fetch(`${siteurl}/_api/web/lists/getbytitle('${ListName}')/fields?$filter=EntityPropertyName eq '${fieldValue}'`,

  {
    method:'GET',
    headers:{
      'Accept':'application/json;odata=nometadata'
    }
  }
);
if(!response.ok){
  throw new Error(`Error while reading choice values : ${response.status}-${response.statusText}`);
};
const data=await response.json();
const choices=data.value[0].Choices;
return choices.map((choice:any)=>({
  key:choice,
  text:choice
}));
    }
    catch(err){
console.error(err);
return [];
    }
  }
  //get lookup
  private async getLookup():Promise<any>{
    try{
const response=await fetch(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Cities')/items?$select=Title,ID`,
  {
    method:'GET',
    headers:{
      'Accept':'application/json;odata=nometadata'
    }
  }
);
if(!response.ok){
  throw new Error(`Error while reading lookup values: ${response.status}-${response.statusText}`);
};
const data=await response.json();
return data.value.map((city:{Title:string,ID:string})=>({
  key:city.ID,
  text:city.Title
}));
    }
    catch(err){
console.error(err);
return[];
    }
  }
}
