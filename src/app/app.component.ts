import {Component, OnInit,ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogComponent} from "./dialog/dialog.component";
import {ApiService} from "./services/api.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'PhoneNumbers';
  displayedColumns: string[] = ['imeKompanije', 'phoneNumber','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private api: ApiService ) {
  }

  ngOnInit(): void {
  this.getAllPhoneNumbers();

  }

  openDialog() {
    this.dialog.open(DialogComponent, {
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllPhoneNumbers();
      }
    });
  }
  getAllPhoneNumbers(){
    this.api.getPhone().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error while fetching the Records");
      }
    })

  }

  editProduct(row : any){
    this.dialog.open(DialogComponent,{
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllPhoneNumbers();
      }
    })



  }

  deletePhoneNumber(id:number){
    this.api.deletePhoneNumber(id).subscribe({
      next:(res)=>{
        alert("Uspesno obrisano");
        this.getAllPhoneNumbers();
      },
      error:()=>{
        alert("Neuspesno obrisano");
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
