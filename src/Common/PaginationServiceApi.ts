import {sp} from "@pnp/sp/presets/all";

export interface IPaginationItems{
    Key:number;
    Title:string;
    EmailAddress:string;
    Age:number;
    Admin?:string;
    City?:string;
}
export default class PaginationService{
    public static async getPaginationItems(ListName:string):Promise<IPaginationItems[]>{
try{
const data=await sp.web.lists.getByTitle(ListName).items
.select("Id","Title","EmailAddress","Age","Admin/Title","City/Title").expand("Admin","City")
.get();
return data.map(e=>({
    Key:e.Id,
    Title:e.Title,
    EmailAddress:e.EmailAddress,
    Age:e.Age,
    Admin:e.Admin?.Title,
    City:e.City?.Title
}));
}
catch(err){
console.error("Error fetching pagination items: ", err);
return [];
    }
}
}