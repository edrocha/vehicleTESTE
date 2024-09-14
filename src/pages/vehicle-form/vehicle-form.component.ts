import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VehicleService } from '../../services/vehicle.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  form!: FormGroup;
  desativar: boolean = false;

  constructor(public dialogRef: MatDialogRef<VehicleFormComponent>,
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = this.fb.group({
      id: [null],
      chassi: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      placa: ['', Validators.required],
      ano: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]], // Validação para ano de 4 dígitos
      renavam: ['', Validators.required]
    });
    if (this.data != undefined || this.data != null) {
      this.preencheForm(data);
    }
  }
  ngOnInit(): void {

  }

  addForm(vehicleData: any) {
    this.vehicleService.addVehicle(vehicleData).subscribe({
      next: (response) => {
        alert('Veículo adicionado com sucesso');
        this.dialogRef.close(response); // Fecha o diálogo e retorna a resposta
      },
      error: (error) => {
        alert('Erro ao adicionar veículo:');
      }
    });
  }
  editForm(vehicleData: any) {
    this.vehicleService.updateVehicle(vehicleData).subscribe({
      next: (response) => {
        alert('Veículo editado com sucesso');
        this.dialogRef.close(response); // Fecha o diálogo e retorna a resposta
      },
      error: (error) => {
        alert('Erro ao editar veículo:');
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const vehicleData = this.form.value; // Obtemos os dados do formulário
      if (this.data == undefined) {
        this.addForm(vehicleData)
      } else {
        this.editForm(vehicleData)
      }



    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  preencheForm(data: any) {
    this.form = this.fb.group({
      id: [data.id],
      chassi: [data.chassi],
      marca: [data.marca],
      modelo: [data.modelo],
      placa: [data.placa],
      ano: [data.ano],
      renavam: [data.renavam]
    })
  }
}

