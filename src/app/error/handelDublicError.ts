import { TErrorSources, TGeneralErrorResponse } from "../interface/error";


const handelDuplicateError=(err :any):TGeneralErrorResponse=>{
    const match = err.errorResponse.errmsg.match(/dup key: \{ name: "([^"]+)" \}/);
 const errorSources:TErrorSources=[{
    path:'',
    message:match
 }]
    const statsCode=400;
    return{
        statsCode,
        message:"Duplicate entry",
        errorSources
    }
}

export default handelDuplicateError;