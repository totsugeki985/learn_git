import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  selectedComponent

  constructor() { }

  ngOnInit(): void 
  {
    this.selectedComponent = "login"
  }

  registeredMessage()
  {
    alert("Successfuly Registered")
  }
  showLogin()
  {
    this.selectedComponent = "login"
  }

  showRegister()
  {
    this.selectedComponent = "register"
  }

}
