import * as React from 'react';
import styles from './SharePoinApiCrud.module.scss';
import { ISharePoinApiCrudProps } from './ISharePoinApiCrudProps';
import { ISharePointAPICrudState } from './ISharePointAPICrudState';
// import { IListItem } from './IListItem';
import {SPHttpClient,SPHttpClientResponse} from '@microsoft/sp-http';

export default class SharePoinApiCrud extends React.Component<ISharePoinApiCrudProps, ISharePointAPICrudState> {
  constructor(props:ISharePoinApiCrudProps,state:ISharePointAPICrudState){
    super(props);
    this.state={
      status:'Ready',
      items:[],
      Title:"",
      Id:0
    }
  }
private getLatestItemId():Promise<number>{
  return new Promise<number>((resolve:(itemId:number)=>void,reject:(error:any)=>void):void=>{
    this.props.spHttpClient.get(`${this.props.siteurl}/_api/web/lists/getbytile('xyz')i\/items?orderby=Id 
    desc&$top=1&$selected=id`
    ,SPHttpClient.configurations.v1,{
      headers:{
        'Accept':'application/json;odata=nometadata',
        'odata-version':''
      }
    }
    )
  })
}

  public render(): React.ReactElement<ISharePoinApiCrudProps> {
   

    return (
    
    );
  }
}
