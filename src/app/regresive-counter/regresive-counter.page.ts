import { Component, ViewChild, ElementRef, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { VideoService } from '../services/video.service';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonMenuToggle, IonButton, IonIcon, IonButtons,
  IonLabel, IonInput, IonItem, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonList, IonPopover
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView } from '@ionic/angular/standalone';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-regresive-counter',
  templateUrl: './regresive-counter.page.html',
  styleUrls: ['./regresive-counter.page.scss'],
  standalone: true,
  imports: [
    IonHeader, CommonModule, IonToolbar, IonTitle, IonContent, IonMenuButton, IonMenuToggle, IonButton, IonIcon, IonButtons,
    IonLabel, IonInput, IonItem, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonList, IonPopover,
    ReactiveFormsModule, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView
  ],
})
export class RegresiveCounterPage implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;

  counter = 5;
  countdownInterval: any;
  isRecording = false;
  mediaRecorder: MediaRecorder | null = null;
  recordedChunks: BlobPart[] = [];
  currentVideoName = '';

  constructor(
    private videoService: VideoService,
    private navCtrl: NavController,
    private router:Router
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // Start countdown immediately when the view initializes
    this.startCountdown();
  }

  startCountdown() {
    this.countdownInterval = setInterval(() => {
      this.counter--;
      
      if (this.counter <= 0) {
        clearInterval(this.countdownInterval);
        // Add a small delay to ensure the DOM has updated after isRecording changes
        setTimeout(() => this.startRecording(), 100);
      }
    }, 1000);
  }

  async startRecording() {
    try {
      // First set isRecording to true to show the video element
      this.isRecording = true;
      
      // Wait a moment for the DOM to update and the video element to be available
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Check if videoElement is available
      if (!this.videoElement) {
        throw new Error('Video element not found');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment' // Use back camera
        },
        audio: true
      });

      this.videoElement.nativeElement.srcObject = stream;
      
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm'
      });

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = async () => {
        const videoBlob = new Blob(this.recordedChunks, { type: 'video/webm' });
        console.log("videoBlob: ", videoBlob );
        
        await this.videoService.storeVideo(videoBlob);

        //this.navCtrl.navigateForward('/videos-list');
        //this.router.navigate(['videos-list']);
      };

      // Start recording and stop after 60 seconds
      this.mediaRecorder.start(100);
      setTimeout(() => this.stopRecording(), 15000);

    } catch (error) {
      console.error('Error starting recording:', error);
      this.isRecording = false;
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    
    if (this.videoElement?.nativeElement?.srcObject) {
      const stream = this.videoElement.nativeElement.srcObject as MediaStream;
      stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      this.videoElement.nativeElement.srcObject = null;
    }
    
    this.isRecording = false;
  }

  ngOnDestroy() {
    clearInterval(this.countdownInterval);
    this.stopRecording();
  }
}