// import * as React from "react";
import {sp} from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export const FormikService=()=>{

    // const web=Web(siteurl);
    // create items

    const createItems=async(ListName:string,body:any)=>{
       
const createItem=await sp.web.lists.getByTitle(ListName).items.add(body);
return createItem;
       
       

    }
    return(
       {createItems}
    )
}
