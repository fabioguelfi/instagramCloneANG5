import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';


  ngOnInit(): void {

    // Initialize Firebase

    const config = {
      apiKey: "AIzaSyA26PkMdu6Az2t1-JwQeblzElp3nDi_MgE",
      authDomain: "jta-instagram-clone-c7678.firebaseapp.com",
      databaseURL: "https://jta-instagram-clone-c7678.firebaseio.com",
      projectId: "jta-instagram-clone-c7678",
      storageBucket: "jta-instagram-clone-c7678.appspot.com",
      messagingSenderId: "945916851719"
    };

    firebase.initializeApp(config)

  }

}


