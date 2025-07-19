import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButtons, 
  IonButton, 
  IonIcon 
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.page.html',
  styleUrls: ['./video-player.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon
  ]
})
export class VideoPlayerPage {
  @Input() videoUrl!: string;

  constructor(private modalCtrl: ModalController) {}

  closeModal() {
    this.modalCtrl.dismiss();
  }
}