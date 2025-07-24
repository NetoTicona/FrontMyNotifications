import { Component } from '@angular/core';
import { 
  IonApp, 
  IonRouterOutlet, 
  IonMenu, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonList, 
  IonItem, 
  IonLabel,
  IonIcon,
  IonMenuButton,
  IonButtons,
  MenuController
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { home, documentText } from 'ionicons/icons';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true, // ← Esto faltaba
  imports: [
    CommonModule,
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonMenuButton,
    IonButtons
  ]
})
export class AppComponent {
  public menuItems = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Reporte',
      url: '/reporte',
      icon: 'document-text'
    },
    {
      title: 'Videos',
      url: '/videos-list',
      icon: 'document-text'
    }
  ];


  constructor(
    private router: Router,
    private menuController: MenuController
  ) {
    addIcons({
      home,
      'document-text': documentText
    });

  }


  navigate(url: string) {
    this.router.navigate([url]);
    this.menuController.close(); // Cerrar menú después de navegar
  }

  // Cerrar menú
  closeMenu() {
    this.menuController.close();
  }





}
