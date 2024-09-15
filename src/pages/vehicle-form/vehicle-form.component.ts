import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VehicleService } from '../../services/vehicle.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/services/loading.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  form!: FormGroup;
  submit: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<VehicleFormComponent>,
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    public loadingService: LoadingService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {}




  ngOnInit(): void {
    this.activeLoading()
    this.initializeForm();

    if (this.data) {
      this.preencheForm(this.data);
    }
  }

  private initializeForm() {
    this.form = this.fb.group({
      id: [null],
      chassi: ['', [Validators.required, Validators.minLength(17)]], // Adicionando validador personalizado
      marca: ['', [Validators.required, Validators.minLength(3)]],
      modelo: ['', [Validators.required, Validators.minLength(3)]],
      placa: ['', [Validators.required, Validators.minLength(8)]],
      ano: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]], // Validação para ano de 4 dígitos
      renavam: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  addForm(vehicleData: any) {
    this.vehicleService.addVehicle(vehicleData).subscribe({
      next: (response) => {
        this.dialogRef.close(response); // Fecha o diálogo e retorna a resposta
      },
      error: (error) => {
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
        alert('Erro ao editar veículo: ' + error.message);
      }
    });
  }

  onSubmit(): void {
    this.activeLoading()
    this.submit = true;
    if (this.form.valid) {
      const vehicleData = this.form.value; // Obtemos os dados do formulário
      if (!this.data) {
        this.addForm(vehicleData);
      } else {
        this.editForm(vehicleData);
      }
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  preencheForm(data: any) {
    this.form.patchValue(data); // Atualiza os valores do formulário existente
  }
  activeLoading(){
     // Simule uma chamada para carregar dados
     this.loadingService.show();
     setTimeout(() => {
       this.loadingService.hide();
     }, 2000); // Simule um atraso de 2 segundos
  }
}
