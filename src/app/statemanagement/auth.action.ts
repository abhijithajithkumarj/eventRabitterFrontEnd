import { createAction, props } from "@ngrx/store";
import { User } from "../core/models/user.model";


export const LoadUser=createAction('[user page]load user')
export const loadUsersSuccess=createAction('[user page load user success]',props <{list:User[]}>())

export const LoadUserFail= createAction('[user page]load user failure', props <{errormessage:string}>())