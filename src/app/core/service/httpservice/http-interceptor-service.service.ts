import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AuthserviceService } from '../auth/authservice.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorServiceService implements HttpInterceptor {
  constructor(private authService: AuthserviceService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    
    const BASE_URL = 'http://3.7.146.10:3333/api/v1/';

    let apiRequest = req.clone({
      url: BASE_URL + req.url,
    });

    let accToken = this.authService.getTokenLocalStorage();

    if (accToken) {
      apiRequest = apiRequest.clone({
        setHeaders: {
          authorization: `Bearer ${accToken}`,
        },
      });
    }

    return next.handle(apiRequest).pipe(
      tap(
      (event) => {
        if (event.type === HttpEventType.Response && event.status === 200) {
          const { token,user } = event.body;


          if (token) {
            this.authService.setTokenLocalStorage(token);
            apiRequest.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },

            });
          }
          if(user){
            this.authService.setUserIdInLocalStorage(user);
          }
          else{
            console.log("user not found");
          }
          
        }
      },
      catchError((error)=>{
        if(error.status===403){
          console.log('unauthorized')
        }
        return throwError(error)
      })
      
      )
    );

    throw new Error('Method not implemented.');
  }
}
