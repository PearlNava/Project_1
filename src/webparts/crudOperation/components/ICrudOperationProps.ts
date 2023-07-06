import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICrudOperationProps {
  description: string;
  context:WebPartContext;
  siteurl:string;
}
