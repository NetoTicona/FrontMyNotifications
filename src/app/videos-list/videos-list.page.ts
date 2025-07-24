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
  
  ) {}

  ionViewWillEnter() {
    this.loadVideos();
  }

  async loadVideos() {
    this.videos = await this.videoService.loadVideos();
    console.log("los videos: ", this.videos );
    
  }

  async playVideo(video: any) {

    console.log("PlayVidep");
    

  }

}