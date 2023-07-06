import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'AntdTableWebPartStrings';
import AntdTable from './components/AntdTable';
import { IAntdTableProps } from './components/IAntdTableProps';
import {sp} from '@pnp/sp/presets/all'
export interface IAntdTableWebPartProps {
  description: string;
}

export default class AntdTableWebPart extends BaseClientSideWebPart<IAntdTableWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAntdTableProps> = React.createElement(
      AntdTable,
      {
        description: this.properties.description,
        context:this.context,
        siteurl:this.context.pageContext.web.absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return super.onInit().then(message => {
   sp.setup({
    spfxContext:this.context as any
   })
    });
  }
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
