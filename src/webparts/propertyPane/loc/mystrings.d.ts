declare interface IPropertyPaneWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
 TextFieldLabel:string;
 MultiLineTextFieldLabel:string;
}

declare module 'PropertyPaneWebPartStrings' {
  const strings: IPropertyPaneWebPartStrings;
  export = strings;
}
