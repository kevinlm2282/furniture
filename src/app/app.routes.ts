import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main/main.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { LoginLayout } from './layouts/login/login.component';
import { LoginPage } from './pages/login/login.component';
import { HomePage } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: LoginLayout,
        children: [
            {path: 'login', component: LoginPage}
        ]
    },
    {
        path:'app', 
        component: MainLayout,
        children: [
            {path: 'home', component: HomePage},
            {path:'inventario', component: InventoryComponent}
        ]
    },
    // { path: '**', redirectTo: 'auth/login', pathMatch: 'full' }
    { path: '**', redirectTo: 'app', pathMatch: 'full' }
];
