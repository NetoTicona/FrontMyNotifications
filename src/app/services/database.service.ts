import { Injectable } from '@angular/core';
import { 
  HttpClient, 
  HttpErrorResponse, 
  HttpHeaders 
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { 
  catchError, 
  retry, 
  timeout, 
  map 
} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private readonly nTimeout: number = 45000;
  private readonly nRetry: number = 5;
  private readonly apiUrl = "http://apinoti.thenett0.com"; // Asume que tienes esto en environment

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private router: Router
  ) {}

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      
    });
  }



  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la petición:', error);

    let errorMessage = 'Ocurrió un error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código: ${error.status}\nMensaje: ${error.message}`;
    }

    this.showAlert(errorMessage);
    
    // Propaga el error para que el componente pueda manejarlo si es necesario
    return throwError(() => new Error(errorMessage));
  }

  private async showAlert(message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Error',
      message,
      buttons: ['OK']
    });
    
    await alert.present();
  }


//------------------------------//
getCompanyById(idCompanyRequest: any): Observable<any> {
  return this.http.post(
    `${this.apiUrl}/getCompanyById`, 
    idCompanyRequest, 
    { headers: this.headers }
  ).pipe(
    retry(this.nRetry),
    timeout(this.nTimeout),
    catchError((error: HttpErrorResponse) => this.handleError(error))
  );
}

getActiveDevices(  ): Observable<any> {
  return this.http.get(
    `${this.apiUrl}/active-devices`
  ).pipe(
    retry(this.nRetry),
    timeout(this.nTimeout),
    catchError((error: HttpErrorResponse) => this.handleError(error))
  );
}



sendNotificationsData( data:any ){

  return this.http.post(
    `${this.apiUrl}/sendNotificationsData` , data
  ).pipe(
    retry(this.nRetry),
    timeout(this.nTimeout),
    catchError((error: HttpErrorResponse) => this.handleError(error))
  );

}






}