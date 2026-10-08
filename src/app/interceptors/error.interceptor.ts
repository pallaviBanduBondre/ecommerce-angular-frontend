import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError, catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse)=>{

      let errorMessage = 'Something went wrong';
      if(error.status === 0){
        errorMessage = 'Unable to connect to server.';
      }
      else if(error.status === 400){
        errorMessage = 'Invalid request. Please check the entered data.';
      }
      else if(error.status === 401){
        errorMessage = 'You are not authorized. Please login.';
      }
      else if(error.status === 403){
        errorMessage = 'You do not permissions to persom this action.';
      }
      else if(error.status === 404){
        errorMessage = 'Requested resource was not found.';
      }
      else if(error.status === 500){
        errorMessage = "server error. Please try again later.";
      }

      console.error(error);
      return throwError(()=> error);
    })
  );
};
