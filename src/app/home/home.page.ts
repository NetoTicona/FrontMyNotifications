import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonMenuToggle, IonButton, IonIcon, IonButtons,
  IonLabel, IonInput, IonItem, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonList, IonPopover
} from '@ionic/angular/standalone';
import { grid, home, documentText, menu, chevronDown, create, trash } from 'ionicons/icons';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView } from '@ionic/angular/standalone';
import usersSequences from './data';
import { StorageServiceService } from '../services/storage-service.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

  standalone: true,
  imports: [
    IonHeader, CommonModule, IonToolbar, IonTitle, IonContent, IonMenuButton, IonMenuToggle, IonButton, IonIcon, IonButtons,
    IonLabel, IonInput, IonItem, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonList, IonPopover,
     ReactiveFormsModule, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView
  ],
})
export class HomePage implements OnInit {
  selectedName: string = '';
  selectedUserId: string = '';
  testDataForm: FormGroup;
  userSequenceDataForm: FormGroup;
  selectTabs = 'CONF';
  usersSequences: any = usersSequences;
  isConfigSaved = false;
  colorOptions: any[] = [];
  listUsers = [
    { id: 55, user: 'carlitos', iddevice: 100 },
    { id: 6, user: 'esteban', iddevice: 101 },
    { id: 77, user: 'victoria', iddevice: 102 },
    { id: 8, user: 'francisco', iddevice: 103 },
    { id: 23, user: 'sigourney', iddevice: 104 }
  ];

  get sequenceDetailForm(): FormArray {
    return this.userSequenceDataForm.get('sequenceDetail') as FormArray;
  }

  constructor(
    private _fb: FormBuilder,
    private storageService: StorageServiceService,
    private cdr:ChangeDetectorRef
  ) {
    addIcons({ 
      grid, 
      home, 
      'document-text': documentText, 
      menu, 
      'chevron-down': chevronDown, 
      create, 
      trash,
     
    });

    this.testDataForm = this._fb.group({
      id: [''],
      date: [''],
      cicles: ['', Validators.required],
      transitionTime: ['', Validators.required],
      selectNumber: ['', Validators.required],


      colourDetail: this._fb.array([])
    });

    this.userSequenceDataForm = this._fb.group({

      selectedUserId: ['', Validators.required],
      selectedUserName: ['', Validators.required],
      iddevice: ['', Validators.required],
      counterSequence: ['', Validators.required],
      sequenceDetail: this._fb.array([])
    });

  }

  get cicles() {
    return this.testDataForm.get('cicles');
  }

  get transitionTime() {
    return this.testDataForm.get('transitionTime');
  }

  get selectNumber() {
    return this.testDataForm.get('selectNumber');
  }

  get colourDetailForm(): FormArray {
    return this.testDataForm.get('colourDetail') as FormArray;
  }

  get counterSequence() {
    return this.userSequenceDataForm.get('counterSequence');
  }

  ngOnInit(): void {

    const savedConfig = this.storageService.getConfig();
    if (savedConfig) {
      this.isConfigSaved = true;
      this.colorOptions = savedConfig.color;
    }


    this.selectNumber?.valueChanges.subscribe((value: number) => {
      const arr = this.testDataForm.get('colourDetail') as FormArray;
      arr.clear();

      for (let i = 0; i < value; i++) {
        arr.push(this._fb.group({
          color: ['', Validators.required]
        }));
      }
    });

    this.counterSequence?.valueChanges.subscribe((value: number) => {
      const arr = this.userSequenceDataForm.get('sequenceDetail') as FormArray;
      arr.clear();

      for (let i = 0; i < value; i++) {
        arr.push(this._fb.group({
          sequence: ['', Validators.required]
        }));
      }
    });





  }

  setSelectNumber(value: number, popover: any) {

    this.testDataForm.get('selectNumber')?.setValue(value);
    popover.dismiss();
  }

  setSelectedUser(user: any, popover: any) {
    this.userSequenceDataForm.get('selectedUserId')?.setValue(user.id);
    this.userSequenceDataForm.get('selectedUserName')?.setValue(user.user);
    this.userSequenceDataForm.get('iddevice')?.setValue(user.iddevice);

    popover.dismiss();
  }

  selectSequenceColor(index: number, color: string, popover: any) {
    // Establece el valor en el FormArray
    this.sequenceDetailForm.at(index).get('sequence')?.setValue(color);
    
    // Cierra el popover
    popover.dismiss();
    this.cdr.detectChanges();
  }

  saveConf() {
    // Marcar todos los controles como tocados
    Object.keys(this.testDataForm.controls).forEach((key) => {

      const control = this.testDataForm.get(key);
      if (control instanceof FormArray) {
        control.controls.forEach((ctrl) => ctrl.markAllAsTouched());
      } else {
        control?.markAsTouched();
      }
    });


    if (this.testDataForm.valid) {
      const formValue = this.testDataForm.value;

      const output = {

        date: formValue.date,
        cicles: formValue.cicles,
        transitionTime: formValue.transitionTime,

        color: formValue.colourDetail.map((item: any, index: number) => ({
          order: index + 1,
          color: item.color
        }))
      };

      // Save to localStorage
      this.storageService.saveConfig(output);
      this.isConfigSaved = true;
      this.colorOptions = output.color;


      console.log("✅ JSON para enviar:");
      console.log(JSON.stringify(output, null, 2));
    } else {
      console.log("❌ Formulario inválido");
    }
  }

  saveSequence() {

    Object.keys(this.userSequenceDataForm.controls).forEach((key) => {

      const control = this.userSequenceDataForm.get(key);
      if (control instanceof FormArray) {
        control.controls.forEach((ctrl) => ctrl.markAllAsTouched());
      } else {
        control?.markAsTouched();
      }
    });


    if (this.userSequenceDataForm.valid) {
      const formValue = this.userSequenceDataForm.value;

      const output = {


        iduser: formValue.selectedUserId,
        iddevice: formValue.iddevice,

        sequence: formValue.sequenceDetail.map((item: any, index: number) => ({
          order: index + 1,
          color: item.sequence
        }))
      };

      this.storageService.saveSequence(output);
      this.usersSequences = this.storageService.getSequences();

      console.log(" Enviear Sequencia:");
      console.log(JSON.stringify(output, null, 2));
    } else {
      console.log("❌ Formulario inválido");
    }

  }


  segmentChanged(e: Event) {
    console.log("e: ", e);


  }


  editUser(user: any) {

  }


  deleteUser(user: any) {

  }


  addNewUserSequence() {

  }


}
