import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonMenuToggle, IonButton, IonIcon, IonButtons,
  IonLabel, IonInput, IonItem, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonList, IonPopover
} from '@ionic/angular/standalone';
import { grid, home, documentText, menu, chevronDown, create, trash } from 'ionicons/icons';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView } from '@ionic/angular/standalone';
import usersSequences from './data';
import { StorageServiceService } from '../services/storage-service.service';
import { IonToast } from '@ionic/angular/standalone';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

  standalone: true,
  imports: [
    IonHeader, CommonModule, IonToolbar, IonTitle, IonContent, IonMenuButton, IonMenuToggle, IonButton, IonIcon, IonButtons,
    IonLabel, IonInput, IonItem, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonList, IonPopover,
    ReactiveFormsModule, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, FormsModule, IonToast
  ],
})
export class HomePage implements OnInit {
  selectedName: string = '';
  selectedUserId: string = '';
  testDataForm: FormGroup;
  userSequenceDataForm: FormGroup;
  selectTabs = 'first';
  usersSequences: any = [];
  isConfigSaved = false;
  colorOptions: any[] = [];
  isToastOpen = false;
  toastMessage = '';
  isColorInputsReadonly = false;
  toastButtons = [
    {
      text: 'OK',
      role: 'cancel',
    }
  ];
  listUsers = [
    { id: 55, user: 'user 1', iddevice: 100 },
    { id: 6, user: 'user 2', iddevice: 101 }, 
    { id: 77, user: 'user 3', iddevice: 102 },
    { id: 8, user: 'user 4', iddevice: 103 },
    { id: 23, user: 'user 5', iddevice: 104 }
  ];

  get sequenceDetailForm(): FormArray {
    return this.userSequenceDataForm.get('sequenceDetail') as FormArray;
  }

  constructor(
    private _fb: FormBuilder,
    private storageService: StorageServiceService,
    private cdr: ChangeDetectorRef,
    private router:Router

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
    console.log("nOnInit");
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

  ionViewWillEnter() {
    console.log("onViewWillEnter");


    this.selectTabs = 'first';
    // Load config if exists

    const savedConfig = this.storageService.getConfig();
    if (savedConfig) {
      this.loadConfigIntoForm(savedConfig);
      this.isConfigSaved = true;
      this.colorOptions = savedConfig.color;
    }

    // Refresh sequences list
    this.usersSequences = this.storageService.getSequences();
    if (this.usersSequences.length > 0) {
      console.log("Disable!!!");

      this.disableTestDataForm();
      this.setOpenToast(true, "Para cambiar los colores base debe borrar la lista de usuarios.");
    } else {
      this.enableTestDataForm();
    }

    //-------------//
    //Quitar los usuarios 
    let listUsersLS = this.storageService.getSequences();
    this.listUsers = this.listUsers.filter( user =>  !listUsersLS.some( (e:any) => user.id === e.iduser ) );
    console.log("ListUSers: ", this.listUsers );
    
    
 

  }

  private disableTestDataForm() {
    this.isColorInputsReadonly = true;
    // Disable only specific controls that should be locked when sequences exist
    /*     this.testDataForm.get('cicles')?.enable({ onlySelf: true });
        this.testDataForm.get('transitionTime')?.enable({ onlySelf: true });
        this.testDataForm.get('selectNumber')?.enable({ onlySelf: true }); */

    // Disable all color inputs in the FormArray
    /* const colourDetailArray = this.colourDetailForm;
    colourDetailArray.controls.forEach((group: AbstractControl) => {
      if (group instanceof FormGroup) {
        group.get('color')?.disable({ onlySelf: true });
      }
    }); */
    this.cdr.detectChanges();
  }


  private enableTestDataForm() {
    this.isColorInputsReadonly = false;
    // Enable the controls that should be editable
    /* this.testDataForm.get('cicles')?.enable({ onlySelf: true });
    this.testDataForm.get('transitionTime')?.enable({ onlySelf: true });
    this.testDataForm.get('selectNumber')?.enable({ onlySelf: true }); */

    // Enable all color inputs in the FormArray
    /* const colourDetailArray = this.colourDetailForm;
    colourDetailArray.controls.forEach((group: AbstractControl) => {
      if (group instanceof FormGroup) {
        group.get('color')?.enable({ onlySelf: true });
      }
    }); */
    this.cdr.detectChanges();
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
      console.log("SaveConf: ", formValue );
      

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
      this.setOpenToast(true, "Se guardó los cambios");
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
        username: formValue.selectedUserName,
        sequence: formValue.sequenceDetail.map((item: any, index: number) => ({
          order: index + 1,
          color: item.sequence
        }))
      };

      this.storageService.saveSequence(output);
      this.usersSequences = this.storageService.getSequences();

      // Reset the form after saving
      this.userSequenceDataForm.reset();
      this.sequenceDetailForm.clear();

      // Remove selected user from listUsers if it exists
      this.listUsers = this.listUsers.filter(user => user.id !== formValue.selectedUserId);

      console.log("✅ Sequence saved:", JSON.stringify(output, null, 2));
      this.setOpenToast(true, "Se guardó usuario - secuencia.");
    } else {
      console.log("❌ Invalid form");
    }
  }

  private loadConfigIntoForm(config: any) {
    this.testDataForm.patchValue({
      cicles: config.cicles,
      transitionTime: config.transitionTime
    });

    // Set selectNumber and create color inputs
    this.testDataForm.get('selectNumber')?.setValue(config.color.length);

    const colourDetail = this.colourDetailForm;
    colourDetail.clear();
    config.color.forEach((colorObj: any) => {
      colourDetail.push(this._fb.group({
        color: [colorObj.color, Validators.required]
      }));
    });
  }



  segmentChanged(e: any) {
    if (e.detail.value === 'third') {
      this.usersSequences = this.storageService.getSequences();
      this.cdr.detectChanges();
    }

    if( e.detail.value === 'first' ){
      console.log("Disable!!!");

      this.usersSequences = this.storageService.getSequences();
      if (this.usersSequences.length > 0) {
        console.log("Disable!!!");
  
        this.disableTestDataForm();
        this.setOpenToast(true, "Para cambiar los colores base debe borrar la lista de usuarios.");
      } else {
        this.enableTestDataForm();
      }
      
    }


  }


  editUser(user: any) {
    // Switch to second tab
    this.selectTabs = 'second';

    // Populate the form
    this.userSequenceDataForm.patchValue({
      selectedUserId: user.iduser,
      selectedUserName: user.username,
      iddevice: user.iddevice,
      counterSequence: user.sequence.length
    });

    // Set up sequence inputs
    const sequenceDetail = this.sequenceDetailForm;
    sequenceDetail.clear();
    user.sequence.forEach((seq: any) => {
      sequenceDetail.push(this._fb.group({
        sequence: [seq.color, Validators.required]
      }));
    });

    // Remove from sequences list (will be re-added if saved)
    this.deleteUser(user);
  }


  deleteUser(user: any) {
    const sequences = this.storageService.getSequences();
    const updatedSequences = sequences.filter(seq => seq.iduser !== user.iduser);
    localStorage.setItem(this.storageService['SEQUENCES_KEY'], JSON.stringify(updatedSequences));
    this.usersSequences = updatedSequences;

    // Add user back to available list if not already there
    if (!this.listUsers.some(u => u.id === user.iduser)) {
      this.listUsers.push({
        id: user.iduser,
        user: user.username,
        iddevice: user.iddevice
      });
    }

    // If no more sequences, enable the form
    if (this.usersSequences.length === 0) {
      this.enableTestDataForm();
    }
  }


  startSequence() {
    const testForm = this.testDataForm.value;

    if( this.usersSequences.length > 0 ){
      const req = {
        date: testForm.date,
        cicles: testForm.cicles,
        transitionTime: testForm.transitionTime,
        usersSequences: this.usersSequences
      }
         console.log("envioTest: ", req );
         this.router.navigate(['regresive-counter'])
    
    }else{
      this.setOpenToast(true, "No usuarios a enviar secuencia.");
    }



 


  }


  setOpenToast(isOpen: boolean, message?: string) {
    this.isToastOpen = isOpen;
    if (message) {
      this.toastMessage = message;
    }
  }


}
