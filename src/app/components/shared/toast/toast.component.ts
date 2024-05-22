import { Component, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnDestroy {
  message: string = '';
  classToast: string = '';
  private subscription: Subscription;

  constructor(private toastService: SharedService) {
    // Suscribirse a los cambios en el servicio ToastService
    this.subscription = this.toastService.onToast().subscribe(data => {
      this.message = data.message;
      this.classToast = data.classToast;
      // Agregar algún código para mostrar el toast (puede ser un componente de toast)
    });
  }

  ngOnDestroy(): void {
    // Desuscribirse al destruir el componente para evitar posibles memory leaks
    this.subscription.unsubscribe();
  }
}
