import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient } from "@pnp/sp";

export interface ISharePoinApiCrudProps {
  description: string;
context:WebPartContext;
spHttpClient:SPHttpClient;
siteurl:string;
}
