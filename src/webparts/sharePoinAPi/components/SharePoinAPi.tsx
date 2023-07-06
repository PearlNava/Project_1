import * as React from 'react';
// import styles from './SharePoinAPi.module.scss';
import { ISharePoinAPiProps } from './ISharePoinAPiProps';
import {SPHttpClient,SPHttpClientResponse} from '@microsoft/sp-http';
import {Table, Input} from 'antd';
import {ColumnProps} from 'antd/lib/table';

interface IlistItem{
  Title:string;
  Age:number;
  Description:string
}

interface ISharePointApiState{
  listItems:IlistItem[];
  loading:boolean;
  searchValue:string;
  currentPage:number;
}
export default class SharePoinAPi extends React.Component<ISharePoinAPiProps, ISharePointApiState> {
  private _tableColumns:ColumnProps<IlistItem>[]=[
    {
      title:'Title',
      dataIndex:'Title',
      sorter:(a:IlistItem,b:IlistItem)=>a.Title.localeCompare(b.Title)
    },
    {
      title:'Age',
      dataIndex:'Age',
      sorter:(a:IlistItem,b:IlistItem)=>a.Age-b.Age
    },
    {
      title:'Description',
      dataIndex:'Description',
      sorter:(a:IlistItem,b:IlistItem)=>a.Title.localeCompare(b.Description)
    }

  ]
  constructor(props:ISharePoinAPiProps,state:ISharePointApiState){
    super(props);
    this.state={
      listItems:[],
      loading:true,
      searchValue:'',
      currentPage:1
    }
  }
  //the

  //Fetch Data
  private _fetchData():void{
    const siteUrl:string=this.props.context.pageContext.web.absoluteUrl;
    const endpoint:string=`${siteUrl}/_api/web/lists/getbytitle('CrudOperation')/items?$select=Title,Age,Description`;
    this.props.context.spHttpClient.get(endpoint,SPHttpClient.configurations.v1).then((response:SPHttpClientResponse)=>{
      return response.json()
    })
    .then((jsonResponse:any)=>{
      const listItems:IlistItem[]=jsonResponse.value.map((item:any)=>{
        return{
          Title:item.Title,
          Age:item.Age,
          Description:item.Description
        }
        
      });
      this.setState({listItems,loading:false})
    });
    

  }
  public componentDidMount(): void {
    this._fetchData();
  } 
  public _handleSearch=(event:React.ChangeEvent<HTMLInputElement>):void=>{
    const searchValue:string=event.target.value;
    this.setState({searchValue,currentPage:1})
  }
  public _handlePaginationChange=(page:number):void=>{
    this.setState({currentPage:page});
  }      
  public render(): React.ReactElement<ISharePoinAPiProps> {
   const{listItems,loading,searchValue,currentPage}=this.state;

   //filter list items based on search value
   const filteredListItems:IlistItem[]=listItems.filter((item:IlistItem)=>
   item.Title.toLowerCase().indexOf(this.state.searchValue.toLowerCase())!==-1);
   const pageSize:number=2;
   const startItemIndex:number=(currentPage-1)*pageSize;
   const endItemIndex:number=startItemIndex+pageSize;
   const paginatedListItems:IlistItem[]=filteredListItems.slice(startItemIndex,endItemIndex);

   
    return (
     <>
     <Input.Search
     placeholder='Search By Title'
     value={searchValue}
     onChange={this._handleSearch}
     style={{marginBottom:16}}/>
     <Table
     dataSource={paginatedListItems}
     columns={this._tableColumns}
     loading={loading}
     pagination={{
      total:filteredListItems.length,
      pageSize,
      current:currentPage,
      onChange:this._handlePaginationChange
     }}/>
     </>
    );
  }
}
