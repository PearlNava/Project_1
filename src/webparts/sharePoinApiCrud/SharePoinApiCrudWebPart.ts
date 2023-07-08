import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {sp} from '@pnp/sp/presets/all';

import * as strings from 'SharePoinApiCrudWebPartStrings';
import SharePoinApiCrud from './components/SharePoinApiCrud';
import { ISharePoinApiCrudProps } from './components/ISharePoinApiCrudProps';

export interface ISharePoinApiCrudWebPartProps {
  description: string;
}

export default class SharePoinApiCrudWebPart extends BaseClientSideWebPart<ISharePoinApiCrudWebPartProps> {
  protected onInit(): Promise<void> {
    return super.onInit().then(message => {
      sp.setup({
        spfxContext:this.context as any
      });
    });
  }
  public render(): void {
    const element: React.ReactElement<ISharePoinApiCrudProps> = React.createElement(
      SharePoinApiCrud,
      {
        description: this.properties.description,
        spHttpClient:this.context.spHttpClient as any,
       context:this.context,
       siteurl:this.context.pageContext.web.absoluteUrl
        
      }
    );

    ReactDom.render(element, this.domElement);
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
