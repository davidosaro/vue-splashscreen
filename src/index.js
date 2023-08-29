/* eslint-disable no-unused-vars */
import SplashScreenComponent from '@/splash/Splash.vue';

export default {
  install: (app, options) => {
    app.component("VueSplashScreen", SplashScreenComponent);
  }
}