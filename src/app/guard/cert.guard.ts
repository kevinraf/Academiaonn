import {inject} from "@angular/core"
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../servicio/auth.service";
import {AccesoService} from "../servicio/acceso.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {environment} from "../../environments/environment.development";
import {Acceso} from "../modelo/Acceso";
import {map} from "rxjs";

export const certGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const loginService = inject(AuthService);
  const menuService = inject(AccesoService);
  const router = inject(Router);
  //1) VERIFICAR SI EL USUARIO ESTA LOGUEADO
  const result = loginService.isLogged();
  if (!result) {
    loginService.logout();
    return false;
  }
  //2) VERIFICAR SI EL TOKEN NO HA EXPIRADO
  const helper = new JwtHelperService();
  const token = sessionStorage.getItem(environment.TOKEN_NAME);
  if (!helper.isTokenExpired(token)) {
    //3) VERIFICAR SI TIENES EL ROL NECESARIO PARA ACCEDER A ESTE RECURSO
    //url -> /pages/patient
    const url = state.url;
    // @ts-ignore
    const username = helper.decodeToken(token).sub;
    return menuService.getAccesosByUser(username).pipe(map((data: Acceso[]) => {
      menuService.setAccesosChange(data);
      let count = 0;
      for (let m of data) {
        if (url.startsWith(m.url)) {
          count++;
          break;
        }
      }
      if (count > 0) {
        return true;
      } else {
        router.navigate(['/pages/not-403']);
        return false;
      }
    }));
  } else {
    loginService.logout();
    return false;
  }
}
