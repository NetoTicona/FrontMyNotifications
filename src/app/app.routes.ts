import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'record',
    loadComponent: () => import('./record/record.page').then( m => m.RecordPage)
  },
  {
    path: 'report',
    loadComponent: () => import('./report/report.page').then( m => m.ReportPage)
  },  {
    path: 'regresive-counter',
    loadComponent: () => import('./regresive-counter/regresive-counter.page').then( m => m.RegresiveCounterPage)
  },
  {
    path: 'videos-list',
    loadComponent: () => import('./videos-list/videos-list.page').then( m => m.VideosListPage)
  },
  {
    path: 'video-player',
    loadComponent: () => import('./video-player/video-player.page').then( m => m.VideoPlayerPage)
  },

];
