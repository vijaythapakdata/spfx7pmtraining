import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISampleFormProps {
  description: string; // textField
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  siteurl:string;
  context:WebPartContext;
  ListName:string;
  
}
