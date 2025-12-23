import * as React from 'react';
// import styles from './Pagination.module.scss';
import type { IPaginationProps } from './IPaginationProps';
import PaginationService from '../../../Common/PaginationServiceApi';
import {sp} from "@pnp/sp/presets/all";
// import { ListNames } from '../../../ServiceFile/Enum/utility';
import {Table,Input} from 'antd';
const Pagination:React.FC<IPaginationProps>=(props)=>{
  const [items,setItems]=React.useState<any[]>([]);
  const [searchText,setSearchText]=React.useState<string>("");
  React.useEffect(()=>{
sp.setup({
  spfxContext:props.context as any
});

PaginationService.getPaginationItems(props.ListName)
.then((response)=>setItems(response))
.catch((err)=>console.error("Error in fetching pagination items: ",err));
  },[props.context]);

  const columns=[
    {
      title:"Name",
      dataIndex:"Title",
      key:"Title",
      sorter:(a:any,b:any)=>(a.Title||"").localeCompare(b.Title||""),
    },
    {
      title:"Email Address",
      dataIndex:"EmailAddress",
      key:"EmailAddress",
      sorter:(a:any,b:any)=>(a.EmailAddress||"").localeCompare(b.EmailAddress||""),
    },
    {
      title:"Age",
      dataIndex:"Age",
      key:"Age",
      sorter:(a:any,b:any)=>(a.Age||0)-(b.Age||0),
    },
    {
      title:"Admin",
      dataIndex:"Admin",
      key:"Admin",
      sorter:(a:any,b:any)=>(a.Admin||"").localeCompare(b.Admin||""),
    },
    {
      title:"City",
      dataIndex:"City",
      key:"City",
      sorter:(a:any,b:any)=>(a.City||"").localeCompare(b.City||""),
    }
  ];
  const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setSearchText(e.target.value);
  };

  const filteredItems=items.filter((item)=>(item?.Title?.toLowerCase()||"").includes(searchText.toLowerCase())
||(item?.EmailAddress?.toLowerCase()||"").includes(searchText.toLowerCase())
||(item?.Admin?.toLowerCase()||"").includes(searchText.toLowerCase())
||(item?.City?.toLowerCase()||"").includes(searchText.toLowerCase())
  );
  return(
    <>
    <Input
    placeholder="search here..."
    value={searchText}
    onChange={handleSearch}
    style={{marginBottom:20}}
    />
    <Table
    dataSource={filteredItems}
    columns={columns}
    pagination={{pageSize:5}}
    />
    </>
  )
}
export default Pagination
