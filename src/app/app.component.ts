import { Component } from '@angular/core';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'

})
export class AppComponent {
  title = 'vehicle';
  constructor(public loadingService: LoadingService) {}
  ngOnInit(): void {
    // Simule uma chamada para carregar dados
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
    }, 2000); // Simule um atraso de 2 segundos
  }
}
