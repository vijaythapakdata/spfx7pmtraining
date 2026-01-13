export interface IFunctionalFormState{
    Name:string;
    Email:string;
    Age:any;
    FullAddress:string;
    Score:number;
    Salary:any;
    Admin:string; // single select people picker
    AdminId:number;
    Manager:any[]; //multi select people picker
    ManagerId:any[];
    Gender:string;
    Department:string;
}