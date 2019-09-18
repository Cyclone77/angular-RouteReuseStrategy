import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';

import { AppComponent } from './app.component';
import { RouteReuseStrategy, Routes, RouterModule } from '@angular/router';
import { SimpleReuseStrategy } from './simple-reuse-strategy';
import { NewsComponent } from './news/news.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full', },
  { path: 'home', component: HomeComponent, data: { title: '首页', module: 'home', power: 'SHOW' } },
  { path: 'news', component: NewsComponent, data: { title: '新闻管理', module: 'news', power: 'SHOW' } },
  { path: 'contact', component: ContactComponent, data: { title: '联系我们', module: 'contact', power: 'SHOW' } },
  { path: 'about', component: AboutComponent, data: { title: '关于我们', module: 'about', power: 'SHOW' } },
];

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    ContactComponent,
    AboutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgZorroAntdModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
