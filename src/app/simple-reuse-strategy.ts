import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class SimpleReuseStrategy implements RouteReuseStrategy {

    public static handlers = new Map<string, any>();

    /**
     *  是否允许复用路由
     * @param route 路由对象
     */
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return true;
    }

    /**
     * 当路由离开时会触发，存储路由
     * @param route 路由对象
     * @param handle 路由脏值
     */
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        // SimpleReuseStrategy.handlers[route.routeConfig.path] = handle;
        SimpleReuseStrategy.handlers.set(route.routeConfig.path, handle);
    }

    /**
     * 是否允许还原路由
     * @param route 路由对象
     */
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!route.routeConfig && !!SimpleReuseStrategy.handlers.get(route.routeConfig.path);
    }

    /**
     * 获取存储路由
     * @param route 路由对象
     */
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        if (!route.routeConfig) {
            return null;
        }
        return SimpleReuseStrategy.handlers.get(route.routeConfig.path);
    }

    /**
     * 进入路由触发，是否同一路由时复用路由
     * @param future 路由对象
     * @param curr 进入路由
     */
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }
}
