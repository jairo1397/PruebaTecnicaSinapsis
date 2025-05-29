import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CampaignService } from '../../services/campaign.service';
import { LoaderService } from '../../services/loader.service';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.css']
})
export class CampaignFormComponent {
  // Objeto para capturar los datos del formulario
  campaign = {
    user_id: '',
    name: '',
    message_text: '',
    phone_list: ''
  };

  users: any[] = [];               // Lista de usuarios disponibles para seleccionar
  phoneInput = '';                // Input temporal para cada número de teléfono
  phoneNumbers: string[] = [];    // Lista acumulada de teléfonos ingresados

  message = '';                   // Mensaje de éxito (no usado aquí)
  error = '';                     // Mensaje de error (no usado aquí)

  constructor(
    private readonly campaignService: CampaignService, // Servicio que conecta con la API
    private readonly loader: LoaderService             // Servicio para mostrar loading spinner
  ) {
    this.loadUsers(); // Cargar usuarios al inicializar el componente
  }

  loadUsers() {
    this.loader.show(); // Mostrar spinner mientras se cargan los usuarios

    this.campaignService.getUsers().subscribe({
      next: (data) => {
        this.users = data;     // Asignar usuarios obtenidos
        this.loader.hide();
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
        this.users = [];       // En caso de error, dejar lista vacía
        this.loader.hide();
        Swal.fire('Error', 'No se pudieron cargar los usuarios', 'error');
      },
    });
  }

  // Agrega un número de teléfono si no está repetido
  addPhone() {
    const phone = this.phoneInput.trim();
    if (phone && !this.phoneNumbers.includes(phone)) {
      this.phoneNumbers.push(phone);
    }
    this.phoneInput = ''; // Limpiar input después de agregar
  }

  // Elimina un número de teléfono por índice
  removePhone(index: number) {
    this.phoneNumbers.splice(index, 1);
  }

  // Envía los datos del formulario para crear la campaña
  createCampaign() {
    this.message = '';
    this.error = '';
    this.loader.show(); // Mostrar spinner

    // Convertir la lista de teléfonos en un solo string separado por comas
    this.campaign.phone_list = this.phoneNumbers.join(',');

    this.campaignService.createCampaign(this.campaign).subscribe({
      next: (res: any) => {
        this.loader.hide();

        // Mostrar alerta de éxito con SweetAlert2
        Swal.fire({
          title: 'Campaña creada',
          text: `La campaña "${this.campaign.name}" fue registrada correctamente.`,
          icon: 'success',
          confirmButtonText: 'OK'
        });

        // Limpiar formulario y estado del componente
        this.campaign = { user_id: '', name: '', message_text: '', phone_list: '' };
        this.phoneNumbers = [];
        this.phoneInput = '';
      },
      error: (err) => {
        this.loader.hide();
        console.error(err);

        // Mostrar error con SweetAlert2
        Swal.fire({
          title: 'Error',
          text: 'Error al crear la campaña',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      },
    });
  }
}