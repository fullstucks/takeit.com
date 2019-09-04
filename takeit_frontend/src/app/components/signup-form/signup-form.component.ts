import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import api from 'src/app/services/api'

declare function main(): any;

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  success:boolean = false
  error:boolean = false
  error_msg:string = ""

  es_admin_restaurante:boolean = false

  constructor() { }

  ngOnInit() {
  }

  signup(form_data:NgForm):void{

    form_data.value.es_admin_restaurante = this.es_admin_restaurante

    console.log(form_data.value)
    if (this.validate(form_data.value)){
      fetch(api.signup, {
        credentials: 'include',
        method : 'post',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form_data.value)
      })
      .then(response => {
        console.log(response)
        this.success = response.ok
        this.error = !response.ok
      })
      .catch(e => {
        this.error = true
        this.error_msg = e
        console.log("error x", e)
      })
    }
    else{
      this.error = true
      this.error_msg = "Asegurese de poner todos los datos correctamente"
    }
      
  }

  validate(data:any):boolean{
    let complete = data.username &&
                    data.email &&
                    data.password &&
                    data.fecha_nacimiento &&
                    data.first_name &&
                    data.last_name
    return (data.password === data.password_again) && complete
  }


  changed_is_admin(event: any, es_admin_restaurante:any):void{
    this.es_admin_restaurante = !es_admin_restaurante
  }

}
