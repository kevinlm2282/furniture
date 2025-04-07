import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main/main.component';

export const routes: Routes = [
    {
        path:'app', 
        component: MainLayout,
        children: [
            // {}
        ]
    },
    { path: '**', redirectTo: 'app', pathMatch: 'full' }
];
