import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoaderService } from '../../services/loader.service';
import { CampaignService } from '../../services/campaign.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-campaign-messages',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './campaign-messages.component.html',
  styleUrls: ['./campaign-messages.component.css']
})
export class CampaignMessagesComponent implements OnInit {
  campaignId!: number;      // ID de la campaña obtenida de la ruta
  messages: any[] = [];     // Lista de mensajes asociados a la campaña
  error = '';               // Mensaje de error a mostrar

  constructor(
    public route: ActivatedRoute,     // Para obtener parámetros de la URL
    public router: Router,             // Para navegación programática
    public campaignService: CampaignService,  // Servicio para obtener datos
    public loader: LoaderService       // Servicio para mostrar loader
  ) { }

  ngOnInit(): void {
    // Obtener el ID de campaña desde los parámetros de la URL
    this.campaignId = Number(this.route.snapshot.paramMap.get('campaignId'));
    
    // Validar que el ID sea válido
    if (!this.campaignId) {
      this.error = 'ID de campaña inválido';
      return;
    }
    
    // Si es válido, cargar los mensajes
    this.fetchMessages();
  }

  fetchMessages() {
    this.error = '';
    this.loader.show(); // Mostrar loader mientras carga

    // Llamada al servicio para obtener mensajes de la campaña
    this.campaignService.getMessages(this.campaignId).subscribe({
      next: (res) => {
        // Mapear mensajes para agregar fecha en formato Date
        this.messages = res.map((msg: any) => {
          // Convertir la fecha de proceso a un objeto Date
          const date = new Date(msg.process_date);

          // Formatear la hora de proceso
          const [hours, minutes, seconds] = msg.process_hour.split(':').map(Number);
          const hourDate = new Date();
          hourDate.setHours(hours, minutes, seconds);

          const formattedHour = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          }).format(hourDate);
          return {
            ...msg,
            fullDateTime: date,
            formattedHour: formattedHour
          };
        });

        // Mostrar mensaje si no hay mensajes
        if (this.messages.length === 0) {
          this.error = 'No se encontraron mensajes para esta campaña.';
        }

        this.loader.hide(); // Ocultar loader al terminar
      },
      error: (err) => {
        this.error = 'Error al obtener mensajes.';
        console.error(err);
        this.loader.hide(); // Ocultar loader en caso de error
      },
    });
  }

  // Método para navegar de vuelta a la lista de campañas
  goBack() {
    this.router.navigate(['/campaigns']);
  }
}