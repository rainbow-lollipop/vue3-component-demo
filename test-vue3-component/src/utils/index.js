import { defineAsyncComponent, h } from 'vue';
import Loading from '../components/Loading.vue';
import Error from '../components/Error.vue';
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

NProgress.configure({
  trickleSpeed: 50,
  showSpinner: false
})

export function delay(duration) {
  if(!duration) {
    duration = randomDelay(1000, 3000);
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, duration)
  })
}

export function randomDelay(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

// 得到一个异步组件
export function getAsyncComponent(path) {
  return defineAsyncComponent({
    loader: async () => {
      await delay();
      if(Math.random() < 0.5) {
        throw new TypeError()
      }
      return import(path); // 实际开发直接返回这个就行
    },
    loadingComponent: Loading, // 当promise为pending状态时，显示该组件
    errorComponent: {
      render() {
        return h(Error, "组件加载出错")
      }
    }
  });
}

// 得到一个异步页面
export function getAsyncPage(path) {
  return defineAsyncComponent({
    loader: async () => {
      NProgress.start();
      await delay();
      // if(Math.random() < 0.5) {
      //   throw new TypeError()
      // }
      const page = await import(path); // 实际开发直接返回这个就行
      NProgress.done();
      return page
    },
    loadingComponent: Loading, // 当promise为pending状态时，显示该组件
    // errorComponent: {
    //   render() {
    //     return h(Error, "组件加载出错")
    //   }
    // }
  });
} 