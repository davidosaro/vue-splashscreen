<!-- eslint-disable vue/multi-word-component-names -->
<template src="./Splash.html"/>
<style scoped src="./css/Splash.css" />


<script>
import { showElements, positionElement } from "./script/methods";
import { animatePercentage, animateProgress } from "./script/animation"

export default {
  name: "vue-splashscreen",
  props: {
    // backgroundColor: {
    //   default: 'black',
    // },
    // color: {
    //   default: 'black'
    // },
    show: {
      type: Array,
      default: () => ['percentage'],
    },
    position: {
      type: String,
      default: "center"
    },
    fadeOut: {
      type: String,
      default: 'fade'
    },
    loadInDelay: {
      type: Number,
      default: 1000,
    },
    loadOutDelay: {
      type: Number,
      default: 500,
    }
  },
  data() {
    return {
      Elements: {},
    }
  },
  methods: {
    setElements(elements) {
      this.Elements = elements
    },
    showSplashScreen(modifications = {}) {
      const elements = modifications['show'];
      const position = modifications['position'] ?? 'center'
      const loadOutAnim = modifications['loadOut'] ?? 'fade'

      showElements(elements) //show elements
      positionElement(this.Elements.positioner, position) //position element

      //elements
      const animationSpeed = 10; //lower the number, higher the speed
      for ( let i of elements) {
        const element = this.Elements[i]
        if (!element) return;
        switch(i) {
          case 'percentage':
            animatePercentage(element, this.Elements.background, loadOutAnim, animationSpeed, this.loadOutDelay);
            break;
          case 'progress':
            animateProgress(element, this.Elements.background, loadOutAnim, animationSpeed, this.loadOutDelay);
            break;
        }
      }
    },
    //run splashscreen
    initialiseSplashScreen() {
      setTimeout(()=> {
        const Elements = {
          percentage: document.querySelector('.percentage'),
          progress: document.querySelector('.progress'),
          positioner: document.querySelector('.positioner'),
          background: document.querySelector('.background'),
        }
        this.setElements(Elements);
        this.showSplashScreen({
          'show': this.show,
          'position': this.position,
          'loadOut': this.fadeOut,
        });
      }, this.loadInDelay)
    }
  },
  mounted() {
    // add a one time show for sessions
    this.initialiseSplashScreen();
  }
}
</script>