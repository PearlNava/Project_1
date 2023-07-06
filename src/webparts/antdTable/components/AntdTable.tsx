import * as React from 'react';
// import styles from './AntdTable.module.scss';
import { IAntdTableProps } from './IAntdTableProps'
import { IAntdTableState } from './IAntdTableState';
import {sp} from '@pnp/sp/presets/all';
import '@pnp/sp/lists';
import '@pnp/sp/items';
// import 'antd/dist/antd.css';
import {Table,Input} from 'antd';
export default class AntdTable extends React.Component<IAntdTableProps, IAntdTableState> {
  constructor(props:IAntdTableProps,state:IAntdTableState){
    super(props);
    this.state={
      items:[],
      searchText:""
    }
  }
  public componentDidMount(): void {
    sp.setup({
      spfxContext:this.props.context as any
    });
    sp.web.lists.getByTitle('CrudOperation').items.select('Title','Age','Department','Description').get().then((data)=>{
      const dataformattedItems=data.map((item)=>{
        return{
          key:item.Id,
          Title:item.Title,
          Age:item.Age,
        Department:item.Age,
        Description:item.Description
        };
      });
      this.setState({items:dataformattedItems});
    })
    .catch((err)=>{
      console.error('Error occurrs while fetching data',err);
    });
  }
  public handleSearch=(event:React.ChangeEvent<HTMLInputElement>)=>{
    const searchText=event.target.value;
    this.setState({searchText});
  }
  public render(): React.ReactElement<IAntdTableProps> {
    const {items,searchText}=this.state;

    const columns=[
      {
        title:'Title',
        dataIndex:'Title',
        key:'Title',
        sorter:(a:any,b:any)=>a.Title.localeCompare(b.Title),

      },
      {
        title:'Age',
        dataIndex:'Age',
        Key:'Age',
      },
      {
        title:'Department',
        dataIndex:'Department',
        key:'Department'
      },
      {
        title:'Description',
        dataIndex:'Description',
        key:'Description'
      }
    ]
    

    return (
      <>
      <Input placeholder='Search...'
      value={searchText}
      onChange={this.handleSearch}/>
     <Table
     
     dataSource={items.filter((item)=>{
      return(
      item.Title.toLowerCase().includes(searchText)
    
      );
     })}
     columns={columns}
     pagination={{pageSize:3}}
     />

      </>
     
    );
  }
}
