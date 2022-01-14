import {NewsDetailView,NewsFeedView} from './page' //각 페이지의 디렉토리마다 하기귀찮으니 index에 아예 취합해서 한번에하는방법
import Router from './core/router'
import Store from './store'



//window전역객체에 store를 넣어놓고 다른곳에서 window.store이렇게 접근하는방법 -> 방법1 -> 그다지 좋은방법은아님


// declare global{ //JS는 그냥 window.store = store하면 되지만 ts는 따로 타입설정을 해줘야해서 조금 다르다. declare가 뭔지알아보자
//   interface Window{
//     store:Store;
//   }
// }
// window.store = store

const store = new Store();
 
const router: Router = new Router();
const newsFeedView = new NewsFeedView('root',store);
const newsDetailView = new NewsDetailView('root',store);
  
router.setDefaultPage(newsFeedView);
//여기서 분기를하면어떨지?

router.addRoutePath('/page/', newsFeedView);
router.addRoutePath('/show/', newsDetailView);
  
router.route();

//내잔디 돌려내