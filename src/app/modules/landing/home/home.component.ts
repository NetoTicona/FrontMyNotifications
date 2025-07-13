import { Component } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  displayedColumns: string[] = ['device', 'color1', 'color2', 'color3', 'actions'];

dataSource = [
  { device: 'Dispositivo 1', color1: 'color1', color2: 'color2', color3: 'color3' },
  { device: 'Dispositivo 2', color1: 'color1', color2: 'color2', color3: 'color3' },
  { device: 'Dispositivo 3', color1: 'color1', color2: 'color2', color3: 'color3' },
];

devices = ['Dispositivo 1', 'Dispositivo 2', 'Dispositivo 3'];

selectedDevice = '';
input1 = '';
input2 = '';
input3 = '';

save() {
  // Add or update logic here
}

edit(row: any) {
  // Edit logic
}

delete(row: any) {
  // Delete logic
}

sendToAll() {
  // Your bulk logic here
}


}
