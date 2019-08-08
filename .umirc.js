function getRouter(router) {
    if (router.routes) {
      router.routes = router.routes.filter(({component}) => {
        // const passRoute = ['404','index','Page','page']; //允许直接生成路由的单个文件
        // const fileFormat = '.tsx'; //文件格式
        // let  _index = 0
  
        if (component.indexOf('page.tsx') >= 0 ||
          component.indexOf('Page.tsx') >= 0 ||
          component.indexOf('404.tsx') >= 0 ||
          component.indexOf('index.tsx') >= 0) {
          return true
        }
        return false
      }).map(item => {
        if (!item.path) {
          return item
        }
        return { ...item,
          path: item.path.replace('indexPage', '').replace('Page', '')
        }
      })
    }
    return router;
  }
export default {
    plugins: [
      ['umi-plugin-dva',{ immer: true }],
      ['umi-plugin-routes', {update(routes) {
        return routes.map(item => {
            return getRouter(item)
          })
      }}],
    ],
    hd:false,
    loading:'',
    hashHistory:true,
    outputPath: '../eamweb'
  };