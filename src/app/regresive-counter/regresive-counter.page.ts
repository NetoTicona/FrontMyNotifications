import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-regresive-counter',
  templateUrl: './regresive-counter.page.html',
  styleUrls: ['./regresive-counter.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RegresiveCounterPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
