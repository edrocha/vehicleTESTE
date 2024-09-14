import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VehicleService } from '../../services/vehicle.service';
import { VehicleFormComponent } from '../vehicle-form/vehicle-form.component';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent {
  vehicles: any[] = [];
  displayedColumns: string[] = ['chassi', 'marca', 'modelo', 'placa', 'ano', 'renavam', 'actions'];

  constructor(private vehicleService: VehicleService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe(
      data => {
        let dataconv = JSON.stringify(data)
        this.vehicles = (JSON.parse(dataconv)).vehicles
              },
      error => {
        console.error('Erro ao obter os dados:', error);
      }


    );
  }

  openForm(vehicle?: any): void {
    const dialogRef = this.dialog.open(VehicleFormComponent, {
      width: '600px',
      data: vehicle
    });


    dialogRef.afterClosed().subscribe(result => {
      this.loadVehicles();
    });


  }

  editVehicle(vehicle: any): void {
    this.openForm(vehicle);
  }

  deleteVehicle(id: number): void {
    this.vehicleService.deleteVehicle(id).subscribe(() => this.loadVehicles());
  }
}
