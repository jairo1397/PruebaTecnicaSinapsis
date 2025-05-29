import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoaderService } from '../../services/loader.service';
import { CampaignService } from '../../services/campaign.service';  // Asegúrate que la ruta sea correcta

import Swal from 'sweetalert2';

@Component({
  selector: 'app-campaign-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent {
  start = '';                  // Fecha de inicio del filtro
  end = '';                    // Fecha de fin del filtro
  campaigns: any[] = [];       // Lista de campañas obtenidas
  error = '';                  // Mensaje de error
  selectedPhones: string[] = []; // Teléfonos para el modal

  constructor(
    public router: Router,
    public loader: LoaderService,
    public campaignService: CampaignService
  ) { }

  ngOnInit(): void {
    // Establecer el rango de fechas al mes actual
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    this.start = firstDay.toISOString().split('T')[0];
    this.end = lastDay.toISOString().split('T')[0];

    this.listCampaigns();
  }

  listCampaigns() {
    this.error = '';
    this.campaigns = [];
    this.loader.show();

    // Validar fechas antes de hacer la petición
    if (!this.start || !this.end) {
      this.error = 'Debe seleccionar rango de fechas.';
      this.loader.hide();
      return;
    }

    // Obtener campañas del backend con el rango de fechas
    this.campaignService.getCampaigns(this.start, this.end).subscribe({
      next: (res) => {
        // Procesar fechas para visualización
        this.campaigns = res.map((msg: any) => {
          const date = new Date(msg.process_date);
          return {
            ...msg,
            fullDateTime: date
          };
        });
        this.loader.hide();
      },
      error: (err) => {
        this.error = 'Error al obtener campañas.';
        console.error(err);
        this.loader.hide();
      },
    });
  }

  // Navega a la vista de mensajes de una campaña específica
  viewMessages(campaignId: number) {
    this.router.navigate(['/messages', campaignId]);
  }

  // Simula el envío de una campaña
  simulateSend(id: number) {
    this.loader.show();
    this.campaignService.sendCampaign(id).subscribe({
      next: () => {
        this.loader.hide();
        Swal.fire({
          title: 'Simulación de Envío',
          text: 'La simulación de envío de la campaña fue exitosa.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.listCampaigns(); // Refrescar la lista después del envío
      },
      error: (err) => {
        this.loader.hide();
        console.error(err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo simular el envío de la campaña.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
    });
  }

  // Muestra los teléfonos asociados a una campaña en un modal
  openPhonesModal(phones: string): void {
    this.selectedPhones = phones.split(',').map(p => p.trim());
  }
}