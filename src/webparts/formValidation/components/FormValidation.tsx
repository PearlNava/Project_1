import * as React from 'react';
// import styles from './FormValidation.module.scss';
import { IFormValidationProps } from './IFormValidationProps';
import { IFormValidationState } from './IFormValidationState';
import {sp,Web} from '@pnp/sp/presets/all';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import { Dialog } from '@microsoft/sp-dialog';
import { Label, PrimaryButton, TextField } from '@fluentui/react';
import { PeoplePicker,PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
export default class FormValidation extends React.Component<IFormValidationProps, IFormValidationState> {
  constructor(props:any){
    super(props);
    sp.setup({
      spfxContext:this.props.context as any
    });
    this.state={
      IListItems:[],
      Title:"",
      PhoneNumber:917163169,
      Description:"",
      Manager:"",
      ManagerId:0,
      ValidationError:{}
    };

  };
  public async componentDidMount(){
    await this.fetchData();
  }

  // Fetch Data
  public async fetchData(){
    const web=Web(this.props.siteurl);
    const items:any[]=await web.lists.getByTitle(this.props.ListName).items.select('*','Manager/Title').expand('Manager').get();
    this.setState({IListItems:items});
  }
  //Validation
  private validateFormFields():boolean{
    const{PhoneNumber,Description,Manager}=this.state;
    const errors:any={};
    if(!PhoneNumber||PhoneNumber.toString().length!==10){
      errors.PhoneNumber='Please enter 10 digit phone number';
    }
    if(!Description|| Description.length<15){
      errors.Description='Please enter with aleast 15 character';
    }
    if(!Manager){
      errors.Manager="Manager cannot be empty";
    }
    this.setState({ValidationError:errors});
    return Object.keys(errors).length===0;

  }
  // Create data
  public async CreateData(){
    if(!this.validateFormFields()){
      return 
    }
    const web =Web(this.props.siteurl);
    await web.lists.getByTitle(this.props.ListName).items.add({
      Title:this.state.Title,
      Description:this.state.Description,
      PhoneNumber:this.state.PhoneNumber,
      ManagerId:this.state.ManagerId
    })
    .then((data)=>{
      console.log('No Error found');
      return data;
    })
    .catch((err)=>{
      console.error("Errors found");
    throw err;
    });
    Dialog.alert("Item has been successfully submitted");
    this.setState({Title:"",PhoneNumber:0,Description:"",Manager:""});
  }
  //Event handler
  private handleChangeEvent=(fieldName: keyof IFormValidationState, value:string|number|boolean):void=>{
    this.setState({[fieldName]:value} as unknown as Pick<IFormValidationState,keyof IFormValidationState>);
  }
  //PeopelPicker
  private _getPeoplePickerItems=(items:any[]):void=>{
    if(items.length>0){
      this.setState({Manager:items[0].text,ManagerId:items[0].id});
    }
    else{
this.setState({Manager:"",ManagerId:""});
    }
  }
  public render(): React.ReactElement<IFormValidationProps> {
  
const{ValidationError}=this.state;
    return (
      <>
      <form>
        <Label>Employee Name:</Label>
        <TextField name="Title"
        value={this.state.Title} onChange={(_event,value)=>this.handleChangeEvent("Title",value)}
        />
         <Label>Phone Number:</Label>
        <TextField name="PhoneNumber"
        value={this.state.PhoneNumber.toString()} onChange={(_event,value)=>this.handleChangeEvent("PhoneNumber",parseInt(value||"0"))}
        errorMessage={ValidationError.PhoneNumber}
        />
         <Label>Description:</Label>
        <TextField name="Description"
        value={this.state.Description} onChange={(_event,value)=>this.handleChangeEvent("Description",value)}
        multiline
        rows={7}
        errorMessage={ValidationError.Description}
        />
        <Label>Manager</Label>
        <PeoplePicker
        showtooltip={true}
        context={this.props.context as any}
        ensureUser={true}
        errorMessage={ValidationError.Manager}
        defaultSelectedUsers={[this.state.Manager?this.state.Manager:""]}
        personSelectionLimit={1}
        principalTypes={[PrincipalType.User]}
        onChange={this._getPeoplePickerItems}
        />
        <br/>
        <PrimaryButton text="Save" onClick={()=>this.CreateData()} iconProps={{iconName:"save"}}/>
      </form>
      </>
    );
  }
}
//Newcomment