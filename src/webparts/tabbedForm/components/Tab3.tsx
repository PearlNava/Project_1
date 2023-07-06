import { Link } from 'office-ui-fabric-react';
import * as React  from 'react';

export default class TabForm3 extends React.Component<{}>{
    public render():React.ReactElement<{}>{
        return(
            <>
            <h2>
                Tab3 
                </h2>
                <Link  href='https://www.google.com' target='_blank'>
                <img src={require('../assets/welcome-dark.png')}/></Link>
                </>
        )
    }
}