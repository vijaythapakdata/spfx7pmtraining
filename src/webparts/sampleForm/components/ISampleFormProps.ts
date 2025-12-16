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
  departmentOptions:any; //single seleted dropdown
  genderOptions:any; //radio button
  SkillsOptions:any; //multi selected dropdown
  cityOptions:any; //lookup
   
}
