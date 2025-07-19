import { Component } from '@angular/core';
import { VideoService } from '../services/video.service';
import { ModalController } from '@ionic/angular';
import { VideoPlayerPage } from '../video-player/video-player.page';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonIcon 
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.page.html',
  styleUrls: ['./videos-list.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon
  ]
})
export class VideosListPage {
  videos: any[] = [];

  constructor(
    private videoService: VideoService,
    private modalCtrl: ModalController
  ) {}

  ionViewWillEnter() {
    console.log("VideosLISTT onint!");
    
    //this.loadVideos();
  }

  async loadVideos() {
    this.videos = await this.videoService.loadVideos();
  }

  async playVideo(video: any) {
    const modal = await this.modalCtrl.create({
      component: VideoPlayerPage,
      componentProps: {
        videoUrl: await this.videoService.getVideoUrl(video.path)
      }
    });
    await modal.present();
  }
}