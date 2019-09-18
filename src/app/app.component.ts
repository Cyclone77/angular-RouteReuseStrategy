import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { map, filter, mergeMap } from 'rxjs/operators';
import { SimpleReuseStrategy } from './simple-reuse-strategy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // 路由列表
  menuList: Array<{ title: string, module: string, power: string, isSelect: boolean }> = [];

  selectedIndex = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) {
  }

  ngOnInit(): void {

    this.router.events
      .pipe(
        // takeUntil(this.unsubscribe$),
        filter(evt => evt instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) { route = route.firstChild; }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe(event => {
        // 路由data的标题
        const { title, module, power } = event;
        if (title && module) {
          this.menuList.forEach(p => p.isSelect = false);
          const menu = { title, module, power, isSelect: true };
          this.titleService.setTitle(title);
          const index = this.menuList.findIndex(info => info.module === module);
          if (index > -1) {
            // 如果存在不添加，当前表示选中
            this.menuList.forEach(p => p.isSelect = p.title === title);
            this.selectedIndex = index;
            return;
          }
          this.menuList.push(menu);
          this.selectedIndex = this.menuList.length - 1;
        }
      });
  }

  // 关闭选项标签
  closeUrl({ module, isSelect }) {
    // 当前关闭的是第几个路由
    const index = this.menuList.findIndex(p => p.module === module);
    // 如果只有一个不可以关闭
    if (this.menuList.length === 1) { return; }

    this.menuList = this.menuList.filter(p => p.module !== module);

    // 删除复用
    SimpleReuseStrategy.handlers.delete(module);
    if (!isSelect) { return; }
    // 显示上一个选中
    let menu = this.menuList[index - 1];
    if (!menu) {
      // 如果上一个没有下一个选中
      menu = this.menuList[index];
    }
    // console.log(menu);
    // console.log(this.menuList);
    this.menuList.forEach(p => p.isSelect = p.module === menu.module);
    // 显示当前路由信息
    this.router.navigate([menu.module]);
  }
}
