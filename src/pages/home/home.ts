import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';

declare let cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  matchMedia = {
    isAvailable: null,
    isDarkModeEnabled: null
  };

  cordovaPlugin = {
    isAvailable: null,
    isDarkModeEnabled: null
  };

  constructor(public navCtrl: NavController) {
  }

  ionViewDidEnter(){
    this.doRefreshAppTheme();
  }

  doRefreshAppTheme(){
    //By window.matchMedia -> matchMedia
    let mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    this.matchMedia.isAvailable = !!mediaQueryList;
    let isDarkMode = mediaQueryList && mediaQueryList.matches;
    console.log('Is it dark mode? ->',isDarkMode);
    this.matchMedia.isDarkModeEnabled = isDarkMode;

    //By cordova-plugin-theme-detection -> cordovaPlugin
    cordova.plugins.ThemeDetection.isAvailable((res)=>{
      this.cordovaPlugin.isAvailable = JSON.stringify(res);
    },(err)=>{
      this.cordovaPlugin.isAvailable = JSON.stringify(err);
    });
    cordova.plugins.ThemeDetection.isDarkModeEnabled((res)=>{
      this.cordovaPlugin.isDarkModeEnabled = JSON.stringify(res);
    },(err)=>{
      this.cordovaPlugin.isDarkModeEnabled = JSON.stringify(err);
    });
  }

}
