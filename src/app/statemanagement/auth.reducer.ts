// import { createReducer, on } from "@ngrx/store";
// import { LoadUserFail, loadUsersSuccess } from "./auth.action";
// import { state } from "@angular/animations";
// import { UserState } from "./auth.state";


// const _UserReducer= createReducer(UserState,
//      on(loadUsersSuccess,(state,action)=>{
//           return{
//                ...state,
//                list:[...action.list],
//                errormessage:''
//           }
//      }), on(LoadUserFail,(state,action)=>{
//           return{
//               ...state,
//               list:[],
//               errormessage: action.errormessage
//           }
//       })
//      )


//      export function UserReducer (state:any,action:any){
//           return _UserReducer(state,action)
//      }