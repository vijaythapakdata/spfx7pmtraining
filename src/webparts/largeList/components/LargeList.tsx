import * as React from 'react';
// import styles from './LargeList.module.scss';
import type { ILargeListProps } from './ILargeListProps';
import { ServiceClassLargeList } from '../../../Common/LargeListServiceApi';
import { ILargeListSate } from './ILargeListState';
import { DetailsList } from '@fluentui/react';

const LargeList:React.FC<ILargeListProps>=(props)=>{
  const[listItems,setListItems]=React.useState<ILargeListSate[]>([]);
  // const _service=new ServiceClassLargeList(props.context);

  const _service=React.useMemo(()=>{
    return new ServiceClassLargeList(props.context);

  },[props.context]);

  React.useEffect(()=>{
    const fetchDataItems=async()=>{
      try{
const result=await _service.getLargeListItems(props.ListName);
setListItems(result);
      }
      catch(err){
console.log("Error while fetching the items",err);
throw err;
      }
    }
    fetchDataItems();
  },[props.ListName,_service,props.siteurl])
  return(
    <>
    <DetailsList
    
    items={listItems}/>
    </>
  )
}
export default LargeList;
