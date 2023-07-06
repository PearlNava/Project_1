import { TextField } from 'office-ui-fabric-react';
import * as React from 'react';

export default class TabForm1 extends  React.Component<{}>{
    public render():React.ReactElement<{}>{
        return(
            <>
            <h3>Tab1 Form</h3>
            <form>
                <TextField label="First Name"/>
                <TextField label="Last Name"/>
                <TextField label="City"/>
                <TextField label="State"/>
                
            </form>
            </>
        )
    }
}