import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = LoginPage;
  private pages: Array<{ title: string, icon: string, component: any }>
  private user: any;

  constructor(platform: Platform, public angularfireDatabase: AngularFireDatabase, public menuCtrl: MenuController, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // Set your sidemenu pages here.
    this.pages = [
      { title: 'Home', icon: '', component: HomePage },
      { title: 'Profile', icon: 'md-profile', component: ProfilePage }
    ];

    // Check if user is logged in and authenticated on Firebase.
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Set user information on the sidemenu based on userData created on database.
        this.angularfireDatabase.object('accounts/' + firebase.auth().currentUser.uid).subscribe((user) => {
          this.user = user;
        });
      }
    });
  }

  // Toggle menu.
  toggleMenu() {
    this.menuCtrl.toggle();
  }
  // Open page.
  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
