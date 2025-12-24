import {ICamlQuery, sp} from "@pnp/sp/presets/all";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ILargeListSate } from "../webparts/largeList/components/ILargeListState";
export class ServiceClassLargeList{
constructor(context:WebPartContext){
    sp.setup({
        spfxContext:context as any
    });

}

//Method to get list items

public async getLargeListItems(ListName:string):Promise<ILargeListSate[]>{
    const allItems:ILargeListSate[]=[];
    let position:any;
   do{
 const camlQuery:ICamlQuery={
                ViewXml:`
                <View>
                <Query>
                <Where>
                <IsNotNull>
                <FieldRef Name='Title'/>
                </IsNotNull>
                </Where>
                </Query>
                <RowLimit Paged='TRUE'>5000</RowLimit>
                </View>
                `
            };
            const response=await sp.web.lists.getByTitle(ListName).getItemsByCAMLQuery(camlQuery,position);
            console.log(`Batched items ${response.length}`);
            allItems.push(...response.map((item:any)=>({
                Title:item.Title
            })));
            
   }
   while(position){
console.log(`Fetching more items ${allItems.length}`);
return allItems;
   }
}
}