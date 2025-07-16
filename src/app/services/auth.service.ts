
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, finalize, map , retry, tap} from 'rxjs/operators';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { from } from 'rxjs';


import { environment } from 'src/environments/environment';
import { DatabaseService } from './database.service';
import { Preferences } from '@capacitor/preferences';
import { ConfigService } from './config.service';
import { ROLES_ENUM } from '../uiModel/roles.enum';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = new BehaviorSubject(false);// ya que solo existira un usuario, entonces esto sera true cuando se añada aun usuario y falso cuando se elimine
  public getToken: Observable<any>  ;
  private tokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public nRetry: number = 5;
  urlApp:any=null;
  loading:any=null;
  constructor(
    private http: HttpClient,
   // private Preferences: Preferences,
    private router: Router,
    public configService: ConfigService,
    private toastController:ToastController,
    public loadingController: LoadingController,
    private alertController: AlertController,
    private dataBaseService:DatabaseService
  ) {
    this.getToken = this.tokenSubject.asObservable(); 
    this.ifLoggedIn();
  }
  //http://52.116.35.78:443

  user:any;

   loginUser(data: any) {
    this.urlApp =  this.configService.getURLApp();
    console.log("url"+this.urlApp)
    const url_login_api = this.configService.getURLApp()+"/getAuthUser";
    //this.presentLoading('Ingresando');
    return this.http.post(url_login_api, data,  ).pipe(
      
      tap( ( data:any ) =>{ console.log("data from Back: ", data )
      
      if(data.status == "true"){
        this.authState.next(true);
      }else{
        this.authState.next(false);
      }

       }),   
       retry(this.nRetry),  
        catchError( (err)=>{
        this.handleError(err)
        return err;
      } ),

      map(data => data))
     
  }


  
  async setToken(data: any) {
    /* this.Preferences.set("USER", JSON.stringify(data)).then(res => {
      console.log("Preferences", res)
      this.authState.next(true);
      this.ifLoggedIn();
      this.router.navigate(["products"])
    }) */

    await Preferences.set({
      key: 'USER',
      value: JSON.stringify(data),
    });
    this.authState.next(true);
      this.ifLoggedIn();
      this.router.navigate(["products"])

  }

  async ifLoggedIn() {

    this.getToken= from( Preferences.get({ key: 'USER' }).then( (token)=>{
      return token.value;
    } ))
    //this.getToken = from(  );
  }


  async logout() {
  /*   this.Preferences.remove('USER').then(() => {
      localPreferences.setItem("intervalID", "false");
      this.router.navigate(['login']);
      this.authState.next(false);
    }); */
    await Preferences.remove({ key: 'name' });
    await Preferences.set({
      key: 'intervalID',
      value: JSON.stringify(false),
    });
    this.router.navigate(['login']);
      this.authState.next(false);

  }

  isAuthenticated() {
    return this.authState.value;
  }


  isAuthenticatedLs(){
    //---------------------User------------------------------------//
    let store_user_id = localStorage.getItem(environment.idcompany)
    if( store_user_id ){
      return true;
    }else{
      return false;
    }
    
  }



  hassAccessToModule( role:ROLES_ENUM[] ){ //recurso puede estar disponible en varios roles;
    //let store_user_id = this.PreferencesService.getItems(Preferences_KEY_USER )
    //let auth = this.isAuthenticatedLs();
    let rolcito:any  =  localStorage.getItem(environment.rol) 
    if( rolcito ){
      return role.includes( rolcito )
    }else{
      //console.log("No se autentico ningun usuario.");
      return false
    }
  }




  async presentToast(msm:string) {
    const toast = await this.toastController.create({
      message: msm,
      duration: 2000,
      
      color:"warning",
      position: "middle",
    });
    toast.present();
  }



  async presentLoading( message: string ) {
    this.loading = await this.loadingController.create({
      message,
      duration: 2000
    });
    return this.loading.present();
  }
  
        async presentAlert(msm:string) {
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Oops!',
            //subHeader: 'Ocurrio un problema con el servidor.',
           message: msm,
            buttons: ['OK']
          });
      
          await alert.present();
      
          const { role } = await alert.onDidDismiss();
          console.log('onDidDismiss resolved with role', role);
        }

        private  handleError(error: HttpErrorResponse) {
          console.log("HANDLE ERRORRRRRRRRRRRRRRRRR: ", error );
          //this.loadingController.dismiss();
          this.dataBaseService.sendClickToErrorHttp();
      
          this.presentAlert('Ocurrio un error en el servidor.')
      
       /*    if (error.error instanceof ErrorEvent) {
          
          } else {
        
          } */
          // return an observable with a user-facing error message
          //this.spinner.hide();
          //this.snackBar.open('Algo ocurrio por favor trate nuevamente.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          return throwError("Algo ocurrio por favor trate nuevamente.");
          //return;
        }


}
