import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main/main.component';
import { InventoryComponent } from './pages/inventory/inventory.component';

export const routes: Routes = [
    {
        path:'app', 
        component: MainLayout,
        children: [
            {path:'inventario', component: InventoryComponent}
        ]
    },
    { path: '**', redirectTo: 'app', pathMatch: 'full' }
];
