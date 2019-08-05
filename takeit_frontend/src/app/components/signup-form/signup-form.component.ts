import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import api from 'src/app/services/api'

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  success:boolean = false

  constructor() { }

  ngOnInit() {
  }

  signup(form_data:NgForm):void{

    if (this.validate(form_data.value)){
      fetch(api.signup, {
        method : 'post',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form_data.value)
      })
      .then(response => {
        console.log(response)
        this.success = response.ok
        console.log(this.success)
      })
      .catch(e => {
        console.log("error x", e)
      })
    }
      

    
  }


  validate(data:any):boolean{
    return data.password === data.password_again
  }

}
