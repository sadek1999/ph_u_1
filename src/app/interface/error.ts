export type TErrorSources = {
    path: string | number;
    message: string;
  }[];


export  type TGeneralErrorResponse={
    statsCode:number,
    message:string,
    errorSources:TErrorSources
 } 