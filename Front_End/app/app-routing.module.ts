import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FestasComponent} from './festas/festas.component';
import {EmpresasComponent} from './empresas/empresas.component';
import {UsuariosComponent} from './usuarios/usuarios.component';
import {HomeComponent} from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { AuthGuard } from './login/login-auth.guard';

const routes: Routes = [
{path: 'festas', redirectTo:'/menu/festas', canActivate: [AuthGuard]},
{path: 'empresas', redirectTo:'/menu/empresas', canActivate: [AuthGuard]},
{path: 'usuarios', redirectTo:'/menu/usuarios', canActivate: [AuthGuard]},
{path: 'home', redirectTo:'/menu/home',canActivate: [AuthGuard]},
{path: '', component: LoginComponent },
{path: 'login', component: LoginComponent },
//{path: 'home', component: HomeComponent },
{path: 'menu', component:MenuComponent, canActivate: [AuthGuard], children:[
{path: 'festas', component: FestasComponent, canActivate: [AuthGuard]},
{path: 'empresas', component: EmpresasComponent, canActivate: [AuthGuard]},
{path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard]},
{path: 'home', component: HomeComponent, canActivate: [AuthGuard]},

]}


];

@NgModule({imports: [RouterModule.forRoot(routes)], exports: [RouterModule]})
export class AppRoutingModule {
}

