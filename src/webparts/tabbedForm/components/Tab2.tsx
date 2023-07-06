import { Label, PrimaryButton, TextField } from 'office-ui-fabric-react';
import * as React  from 'react';
import styles from './Tab2.module.scss'
export default class TabForm2 extends React.Component<{}>{
    public render():React.ReactElement<{}>{
        return(
            <>
            <h2>
                Tab2 
                <form className={styles.form}>
                    <Label>User Name</Label>
                    <TextField/>
                    <Label>Email:</Label>
                    <TextField placeholder='Vijay@gmail.com' />
                    <br/>
                    <PrimaryButton text="Login"/>
                </form>
                </h2></>
        )
    }
}