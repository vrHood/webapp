import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScriptGuard } from './guards/script.guard';
import { ExternalScript } from './services/script-loader.tservice';

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('./features/admin/admin.module').then((m) => m.AdminModule)
    },
    {
        path: 'content',
        loadChildren: () => import('./features/content/content.module').then((m) => m.ContentModule),
        canActivate: [
            ScriptGuard.load(ExternalScript.GOOGLE_MAPS)
        ]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'content'
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { onSameUrlNavigation: 'ignore', urlUpdateStrategy: 'eager' }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}
