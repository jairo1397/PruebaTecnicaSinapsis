import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  public baseUrl = 'http://localhost:3000/dev'; 

  constructor(public http: HttpClient) {}

  // Obtener campañas entre dos fechas (query params: start y end)
  getCampaigns(start: string, end: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/campaigns?start=${start}&end=${end}`);
  }

  // Crear una nueva campaña
  createCampaign(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/campaigns`, data);
  }

  // Enviar una campaña por su ID
  sendCampaign(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/campaigns/${id}/send`, {});
  }

  // Obtener los mensajes de una campaña por ID
  getMessages(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/campaigns/${id}/messages`);
  }

  // Obtener la lista de usuarios disponibles
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/options/users`);
  }
}