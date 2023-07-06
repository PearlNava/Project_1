import * as React from 'react';
// import styles from './DetailListTable.module.scss';
import { IDetailListTableProps } from './IDetailListTableProps';
import { IDetailListState } from './IDetailListState';
import {sp,Web} from '@pnp/sp/presets/all';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import { DetailsList, IColumn } from 'office-ui-fabric-react';
// import { escape } from '@microsoft/sp-lodash-subset';

export default class DetailListTable extends React.Component<IDetailListTableProps, IDetailListState> {
  constructor(props:IDetailListTableProps,state:IDetailListState){
    super(props);
    sp.setup({
      spfxContext:this.props.context as any
    });
    this.state={
      IListItems:[],
      Title:"",
      Age:0,
      Department:"",
      Manager:"",
      Designation:"",
      Description:""
    }
  }
  public async FetchData(){
    const data:any[]=[];
    let web =Web(this.props.siteurl);
    const items:any[]=await web.lists.getByTitle("CrudOperation").items.select("*","Manager/Title").expand("Manager").get();
    await items.forEach(async item=>{
      await data.push({
        Title:item.Title,
        Age:item.Age,
        Department:item.Department,
        Manager:item.Manager.Title,
        Designation:item.Designation,
        Description:item.Description
      });
    });
    this.setState({IListItems:data});
  }
  public async componentDidMount(){
    await this.FetchData();
  }
  public render(): React.ReactElement<IDetailListTableProps> {
const columns:IColumn[]=[
  {key:'Title',name:'Employee Name',fieldName:'Title',isResizable:true,minWidth:300},
  {key:'Age',name:'Employee Age',fieldName:'Age',isResizable:true,isSorted:true,minWidth:300},
  {key:'Department',name:'Employee Department',fieldName:'Department',isResizable:true,minWidth:300},
  {key:'Designation',name:'Employee Position',fieldName:'Designation',isResizable:true,minWidth:300},
  {key:'Description',name:'Job Description',fieldName:'Description',isMultiline:true,isResizable:true,minWidth:300},
  {key:'Manger',name:'Reporting Manager',fieldName:'Manager',minWidth:300,isResizable:true}
]   

    return (
  <>
  <DetailsList items={this.state.IListItems}
  columns={columns}/>
  </>
    );
  }
}
