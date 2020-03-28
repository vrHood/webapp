import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: 'admin',
        loadChildren: () => import('./features/admin/admin.module').then((m) => m.AdminModule)
    },
    {
        path: 'users',
        loadChildren: () => import('./features/user/user.module').then((m) => m.UserModule),
        canActivate: [ AuthGuard ]
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
