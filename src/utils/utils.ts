import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';

export class Util {
  constructor(
    public loadingService: LoadingService,
    ) {}

activeLoading(){
  // Simule uma chamada para carregar dados
  this.loadingService.show();
  setTimeout(() => {
    this.loadingService.hide();
  }, 2000); // Simule um atraso de 2 segundos
}


}
