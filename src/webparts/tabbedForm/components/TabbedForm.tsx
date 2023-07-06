import * as React from 'react';
// import styles from './TabbedForm.module.scss';
import { ITabbedFormProps } from './ITabbedFormProps';
import { Pivot, PivotItem } from 'office-ui-fabric-react';
import TabForm1 from './Tab1';
import TabForm2 from './Tab2';
import TabForm3 from './Tab3';

export default class TabbedForm extends React.Component<ITabbedFormProps, {}> {
  public render(): React.ReactElement<ITabbedFormProps> {
   

    return (
      <>
      <Pivot aria-label='Simple-Tab-Form'>
<PivotItem headerText='User Information'>
  <TabForm1/>
</PivotItem>
<PivotItem headerText='New User'>
  <TabForm2/>
</PivotItem><PivotItem headerText='Registration'>
  <TabForm3/>
</PivotItem>
      </Pivot>
      </>
    );
  }
}
