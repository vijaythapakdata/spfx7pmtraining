import * as React from 'react';
// import styles from './FirstWebpart.module.scss';
import type { IFirstWebpartProps } from './IFirstWebpartProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import ButtonSample from './ButtonSample';
const FirstWebpart:React.FC<IFirstWebpartProps>=(props)=>{
  return(
    <>
    <p> I am paragrpah</p>
    <br/>
    <ButtonSample/>
    
    </>
  )
}
export default FirstWebpart;
