import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadChildren: () => import('./task/task.module').then(m=> m.TaskModule)
    }
];
