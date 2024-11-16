import { Component, OnInit, HostListener } from '@angular/core';
import { MaterialModule } from "../../material/material.module";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { Acceso } from '../../modelo/Acceso';
import { AuthService } from '../../servicio/auth.service';
import { AccesoService } from '../../servicio/acceso.service';
import { CommonModule } from '@angular/common';  // <-- IMPORTAR CommonModule

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [MaterialModule, RouterOutlet, RouterLink, RouterLinkActive, CommonModule],  // <-- AGREGAR CommonModule AQUÍ
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
    accesos: Acceso[];
    isMobile: boolean = false;  // Variable para detectar pantallas pequeñas
    sidenavOpened: boolean = true;  // Control de apertura/cierre para pantallas grandes

    constructor(
        private authService: AuthService,
        private accesoService: AccesoService,
    ) { }

    ngOnInit(): void {
        this.accesoService.getAccesosChange().subscribe(data => {
            this.accesos = data;  // Aquí aseguramos que los datos se carguen correctamente
            console.log('Accesos:', this.accesos);  // Para depurar si los datos se están recibiendo
        });
    }


    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        this.checkScreenSize();
    }

    checkScreenSize() {
        // Detectar si la pantalla es menor a 768px (pantallas móviles)
        this.isMobile = window.innerWidth < 768;
        // Si la pantalla es móvil, asegurarse de que el sidenav esté cerrado
        if (this.isMobile) {
            this.sidenavOpened = false;
        } else {
            this.sidenavOpened = true;
        }
    }

    // Método trackByIndex para el *ngFor
    trackByIndex(index: number): number {
        return index;
    }

    logout() {
        this.authService.logout();
    }
}
