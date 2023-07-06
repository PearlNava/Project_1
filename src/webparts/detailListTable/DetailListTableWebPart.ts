import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {sp} from '@pnp/sp/presets/all';

import * as strings from 'DetailListTableWebPartStrings';
import DetailListTable from './components/DetailListTable';
import { IDetailListTableProps } from './components/IDetailListTableProps';

export interface IDetailListTableWebPartProps {
  description: string;
}

export default class DetailListTableWebPart extends BaseClientSideWebPart<IDetailListTableWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IDetailListTableProps> = React.createElement(
      DetailListTable,
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
      });
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
