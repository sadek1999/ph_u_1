

export type TUser={
    id:string;
    password:string;
    needsPasswordChange:string;
    role:"admin"|"student"|"Faculty";
    status:'in-progress'|'block';
    isDeleted:boolean
}


