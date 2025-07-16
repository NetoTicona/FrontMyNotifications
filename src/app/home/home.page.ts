import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonMenuToggle, IonButton, IonIcon, IonButtons, IonLabel, IonInput, IonItem, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonList, IonPopover, IonFooter } from '@ionic/angular/standalone';
import { grid, home, documentText, menu, chevronDown } from 'ionicons/icons';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonMenuToggle, IonButton, IonIcon ,
     IonButtons, IonLabel,IonInput ,
     IonItem,
     IonCard,
     IonCardContent,
     IonCardSubtitle,
     IonCardTitle,
     IonList,
     IonCardHeader,
     IonPopover,
     IonFooter
    
    ],
})
export class HomePage implements OnInit {
  selectedName: string = '';
  constructor() {
    addIcons({
      grid,
      home,
      'document-text': documentText,
      menu,
      'chevron-down':chevronDown
    });
  }

  selectName(name: string) {
    this.selectedName = name;
    // Actualizar el valor del input
    const nameInput = document.querySelector('#name-trigger ion-input') as HTMLIonInputElement;
    if (nameInput) {
      nameInput.value = name;
    }
    // Cerrar el popover
    const popover = document.querySelector('ion-popover') as HTMLIonPopoverElement;
    if (popover) {
      popover.dismiss();
    }
  }


ngOnInit(): void {
    
}











}
