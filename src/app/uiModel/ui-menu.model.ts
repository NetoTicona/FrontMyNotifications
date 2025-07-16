import {  ROLES_ENUM } from "./roles.enum";

export interface IMenu{
    title: string;
        icon?:any;
        //name?:string;
        link?:string;
        href?:string;
        method?: ()=> any;
        role?:ROLES_ENUM[];
        functionNameString?:string;
        imagen?:any;
 
}[];
