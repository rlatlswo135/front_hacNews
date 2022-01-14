import View from './view' //Default된애는 {}가 필요없다는것.
import {RouteInfo} from '../types/index'



export default class Router { //class가 하나밖에없으니 export할게, default 붙혀줫다(안붙혀도무방하긴함)
    routeTable: RouteInfo[];
    defaultRoute: RouteInfo | null;
  
    constructor() {
      window.addEventListener('hashchange', this.route.bind(this));
  
      this.routeTable = [];
      this.defaultRoute = null;
    }
    
    setDefaultPage(page: View): void {
      this.defaultRoute = { path: '', page };
    }
  
    addRoutePath(path: string, page: View): void {
      this.routeTable.push({ path, page });
    }
  
    route() {
      const routePath = location.hash;
  
      if (routePath === '' && this.defaultRoute) {
        console.log('welcome')
        this.defaultRoute.page.render();
        return;
      }

  
      for (const routeInfo of this.routeTable) {
        // /page/인지 /show/인지에따른 여기서분기후 해당페이지에 맞는 view를 렌더
        if (routePath.indexOf(routeInfo.path) >= 0) {
          routeInfo.page.render();
          break;
        }
      }
    }
  }