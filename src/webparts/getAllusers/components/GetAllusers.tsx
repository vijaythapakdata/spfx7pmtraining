import * as React from 'react';
// import styles from './GetAllusers.module.scss';
import type { IGetAllusersProps } from './IGetAllusersProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import {MSGraphClientV3} from "@microsoft/sp-http";
import { DetailsList, PrimaryButton } from '@fluentui/react';

interface IUser{
  displayName:string;
  mail:string;
}
const GetAllusers:React.FC<IGetAllusersProps>=(props)=>{
  const [userState,setUserState]=React.useState<IUser[]>([]);

  const getUsers=React.useCallback(()=>{
    props.graphclient
    .getClient('3')
    .then((msGraphClient:MSGraphClientV3)=>{
      msGraphClient.api('users').version('v1.0')
      .select('displayName,mail')
      .get((err,response)=>{
        if(err){
          console.error(`Error occurred while fetching users`,err);
          return
        }
        const allUsers:IUser[]=response.value.map((result:any)=>({
          displayName:result.displayName,
          mail:result.mail
        })

        );
        setUserState(allUsers);
      })
    })
  },[props.graphclient]);
  return(
    <>
    <PrimaryButton text='Searc users' onClick={getUsers} iconProps={{iconName:"search"}}/>
    <br/>
    <DetailsList
    items={userState}
    />
    </>
  )
}
export default GetAllusers;