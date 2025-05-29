import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoading = false;

  constructor(
    private readonly loaderService: LoaderService,
    private readonly cd: ChangeDetectorRef
  ) {
    this.loaderService.loading$.subscribe(isLoading => {
      this.isLoading = isLoading;
      this.cd.detectChanges();
    });
  }
}