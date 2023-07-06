import * as React from 'react';
import styles from './CrudOperation.module.scss';
import { ICrudOperationProps } from './ICrudOperationProps';
import { ICrudOperationsState } from './ICrudOperationState';
import {sp,Web} from '@pnp/sp/presets/all';
import {PeoplePicker,PrincipalType} from "@pnp/spfx-controls-react/lib/PeoplePicker"
import '@pnp/sp/lists';
import '@pnp/sp/items';
import { Dialog } from '@microsoft/sp-dialog';
import { Dropdown, IDropdownOption, IIconProps, Label, PrimaryButton, TextField } from 'office-ui-fabric-react';

export default class CrudOperation extends React.Component<ICrudOperationProps, ICrudOperationsState> {
  private onsaveIcon:IIconProps={
iconName:'save'
  }
 private onEditIcon:IIconProps={
  iconName:'edit'
  }
  private ondeleteIcon:IIconProps={
    iconName:'delete'
       }

  constructor(props:ICrudOperationProps,state:ICrudOperationsState){
    super(props);
    sp.setup({
      spfxContext:this.props.context as any
    });
    this.state={
      IListItems:[],
      Title:"",
      Age:0,
      Description:"",
      ID:0,
      Manager:"",
      ManagerId:0,
      Department:"",
      Designation:"",
      HTML:[]
    }
  }
  // Fetch Data 
  public async FetchData(){
    let web=Web(this.props.siteurl);
    const items:any[]=await web.lists.getByTitle("CrudOperation").items.select("*","Manager/Title").expand("Manager").get();
    this.setState({IListItems:items});
    let html=await this.getHTMLTable(items);
    this.setState({HTML:html});
  }
  public async componentDidMount() {
    await this.FetchData();
  }

  // Find Data
  public FindData=(id:any):void=>{
    var ItemId=id;
    var allitems=this.state.IListItems;
    var allitemsLength=allitems.length;
    if(allitemsLength>0){
      for(var i=0;i<allitemsLength;i++){
        if(ItemId==allitems[i].Id){
          this.setState({
            ID:ItemId,
            Title:allitems[i].Title,
            Age:allitems[i].Age,
            Description:allitems[i].Description,
            Department:allitems[i].Department,
            Designation:allitems[i].Designation,
            Manager:allitems[i].Manager.Title,
            ManagerId:allitems[i].ManagerId
          });
        }
      }
    }
  }
  
  public async getHTMLTable(items:any){
    var tabledata=<table className={styles.table}>
<thead>
  <tr>
    <th>Employee Name</th>
    <th>Employee Age</th>
    <th>Employee Address</th>
    <th>Department</th>
    <th>Designation</th>
    <th>Manager</th>
  </tr>
</thead>
<tbody>
  {items && items.map((item:any,i:any)=>{
    return[
      <tr key={i} onClick={()=>this.FindData(item.ID)}>
        <td>{item.Title}</td>
        <td>{item.Age}</td>
        <td>{item.Description}</td>
        <td>{item.Department}</td>
        <td>{item.Designation}</td>
        <td>{item.Manager.Title}</td>
      </tr>
    ]
  })}
</tbody>
 
    </table>
    return await tabledata
  }

  public async CreateData(){
    let web=Web(this.props.siteurl);
    await web.lists.getByTitle("CrudOperation").items.add({
      Title:this.state.Title,
      Age:this.state.Age,
      Description:this.state.Description,
      ManagerId:this.state.ManagerId,
      Department:this.state.Department,
      Designation:this.state.Designation
    }).then((data)=>{
      console.log("No Error Found....");
      return data;
    }).catch((err)=>{
      console.log("Error Found ....");
      throw err;
    });
    Dialog.alert("Item has been created successfully");
    this.setState({Title:"",Age:0,Description:"",Department:"",Designation:"",Manager:""});
    this.FetchData();
  }
// Update Data
public async UpdateData(){
  let web=Web(this.props.siteurl);
  await web.lists.getByTitle("CrudOperation").items.getById(this.state.ID).update({
    Title:this.state.Title,
    Age:this.state.Age,
    Description:this.state.Description,
    ManagerId:this.state.ManagerId,
    Department:this.state.Department,
    Designation:this.state.Designation
  }).then((data)=>{
    console.log("No Error Found....");
      return data;
  }).catch((err)=>{
    console.log("Error Found ....");
    throw err;
  });
  Dialog.alert("Item has been updated successfully");
  this.setState({Title:"",Age:0,Description:"",Department:"",Designation:"",Manager:""});
  this.FetchData();
}
public async DeleteData(){
let web=Web(this.props.siteurl);
await web.lists.getByTitle("CrudOperation").items.getById(this.state.ID).delete().then((data)=>{
  console.log("No Error found");
  return data;
}).catch((err)=>{
  console.log("Erorr found");
  throw err;
});
Dialog.alert("Item has been deleted successfully");
this.setState({Title:"",Age:0,Description:"",Department:"",Designation:"",Manager:""});
this.FetchData();
}

  public render(): React.ReactElement<ICrudOperationProps> {
    

    return (
      <>
      <h1 style={{textAlign:'center', textDecoration:'underline',color:'red',textTransform:'uppercase'}}>Employee Data</h1>
      {this.state.HTML}
      <div className={styles.btngroup}>
        <div>
       <PrimaryButton text="Create"
       onClick={()=>this.CreateData()} style={{backgroundColor:'green'}} iconProps={this.onsaveIcon}/></div>
      <div>
       <PrimaryButton text="Update"
       onClick={()=>this.UpdateData()}
       style={{backgroundColor:'orange'}} iconProps={this.onEditIcon}/></div>
       <div>
       <PrimaryButton text="Delete"
       onClick={()=>this.DeleteData()}
       style={{backgroundColor:'red'}} iconProps={this.ondeleteIcon}/></div>
      </div>
      <form>
       <div>
         <Label>Employee Name:</Label>
         <TextField value={this.state.Title}
         onChange={this.onTitleChange}/>
       </div>
       <div>
       <Label>Age:</Label>
         <TextField value={this.state.Age.toString()}
         onChange={this.onAgeChange}/>
       </div>
       <div>
       <Label>Job Description:</Label>
         <TextField value={this.state.Description}
         onChange={this.onDescriptionChange}
         multiline={true}
         rows={6}/>
       </div>
       <div>
         <Label>Employee Designation:</Label>
         <TextField value={this.state.Designation}
         onChange={this.onDesignationChange}/>
       </div>
       <div>
        <Label>Employee Department</Label>
        <Dropdown placeholder='Select Deparment'
        options={[
          {key:"Information Technology",text:"Information Technology"},
          {key:"Human Resource",text:"Human Resource"},
          {key:"Sales",text:"Sales"}
        ]}
        defaultSelectedKey={this.state.Department}
        onChange={this.oDepartmenteChange}
        />
       </div>
       <div>
         <Label>Reporting Manager:</Label>
         <PeoplePicker
         context={this.props.context as any}
         personSelectionLimit={1}
         required={false}
         onChange={this.onPeoplePickerItems}
         defaultSelectedUsers={[this.state.Manager?this.state.Manager:""]}
         // defaultSelectedUsers={this.state.Name ? [{ text: this.state.Name, id: this.state.NameId }] : []}
         showtooltip={false}
       principalTypes={[PrincipalType.User]}
       resolveDelay={1000}
       ensureUser={true}/>
       </div>
      
      </form>
      
      </>
    );
  }

  private onTitleChange=(event:React.FormEvent<HTMLInputElement| HTMLTextAreaElement>,newvalue?:string):void=>{
    this.setState({Title:newvalue||""});
  }
  private onAgeChange=(event:React.FormEvent<HTMLInputElement| HTMLTextAreaElement>,newvalue?:string):void=>{
    const age=newvalue?parseInt(newvalue):0
    this.setState({Age:age});
  }
  
  private onDescriptionChange=(event:React.FormEvent<HTMLInputElement| HTMLTextAreaElement>,newvalue?:string):void=>{
    this.setState({Description:newvalue||""});
  }
  
  private onDesignationChange=(event:React.FormEvent<HTMLInputElement| HTMLTextAreaElement>,newvalue?:string):void=>{
    this.setState({Designation:newvalue||""});
  }
  
  private oDepartmenteChange=(event:React.FormEvent<HTMLDivElement>,option?:IDropdownOption):void=>{
    this.setState({Department:option?.key as string ||""});
  }
  private onPeoplePickerItems=(items:any[]):void=>{
    if(items.length>0){
      this.setState({Manager:items[0].text,ManagerId:items[0].id})
    }
    else{
      this.setState({Manager:"",ManagerId:""});
    }
  }
}
