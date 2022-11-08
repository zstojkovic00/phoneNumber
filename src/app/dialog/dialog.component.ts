import {Component,OnInit} from '@angular/core';
import {FormBuilder, FormGroup,Validators} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import {Inject} from "@angular/core";



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {


  Form !: FormGroup;
  actionButton : string = "Dodaj"

  constructor(private formBulider : FormBuilder, private api : ApiService, @Inject(MAT_DIALOG_DATA) public editData : any,  private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.Form = this.formBulider.group({
      imeKompanije : ['',Validators.required],
      phoneNumber : ['',Validators.required]
    })

    if(this.editData){
      this.actionButton = "Promeni";
      this.Form.controls['imeKompanije'].setValue(this.editData.imeKompanije);
      this.Form.controls['phoneNumber'].setValue(this.editData.phoneNumber);
    }

  }


  addPhoneNumber(){
    if(!this.editData){
    if(this.Form.valid){
      this.api.postPhone(this.Form.value).subscribe({
        next:(res)=>{
          alert("Uspesno dodato")
          this.Form.reset();
          this.dialogRef.close('save');

        },
        error:()=>{
          alert("Neuspesno dodato")
        }
      })
    } } else {
      this.updatePhoneNumber();
    }
  }
  updatePhoneNumber(){
   this.api.putPhoneNumber(this.Form.value, this.editData.id).subscribe({
     next:(res)=>{
       alert("Uspesno promenjeno")
       this.Form.reset();
       this.dialogRef.close('update');
     },
     error:()=>{
       alert("Neuspesno promenjeno");
     }
   })
  }



}
