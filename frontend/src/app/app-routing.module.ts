import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'content',
        loadChildren: () => import('./features/content/content.module').then(m => m.ContentModule)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'content'
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
