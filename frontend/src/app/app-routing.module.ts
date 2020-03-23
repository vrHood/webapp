import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'admin',
        loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule)
    },
    {
        path: 'content',
        loadChildren: () => import('./features/content/content.module').then((m) => m.ContentModule)
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
export class AppRoutingModule {

}
