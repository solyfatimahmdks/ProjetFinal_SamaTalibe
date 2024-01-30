import { NgIfContext } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service.service';
// import Swal from 'sweetalert2';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoginFormVisible = true;

  loginUser = {
    email: '',
    password: ''
  };

  signupUser = {
    name:'',
    firstname:'',
    number:'',
    username: '',
    password: '',
    confirmPassword: ''
  };

  toggleForm() {
    this.isLoginFormVisible = !this.isLoginFormVisible;
  }
 submitFunction(event: Event) {
    event.preventDefault();
  }

  constructor(private route:Router, private authService: AuthService){}
  ngOnInit() {

  }
  user: any = {
    name: '',
    firstname: '',
    numerotelephone: '',
    username: '',
    password: '',
    confirmedPassword: '',
  };
  credentials: any;
  loading!: boolean;
  userConnected: any;
  errorMsg: any;
 
  userConnect: any;
  userOnline: any;
   // Nos attributs

  
   
   emailLogin: string = "";
   passwordLogin: string = "";
   prenom: string = "";
   nom: string = "";
   email: string = "";
   password: string = "";
   adresse: string = "";
   region:string="";
   numeroTelephone:string="";


// sweetalert
showMessage(icon:any, titre:any, texte:any){
  Swal.fire({
    icon: icon,
    title: titre,
    text: texte,
  })
}


   login() {
     if (this.emailLogin == "" || this.passwordLogin == "") {
       this.showMessage("error", "Oops","Veuillez renseigner tous les champs");
      } else {
      alert('connecter');
  
      this.authService.login({ email: this.emailLogin, password: this.passwordLogin }, (reponse: any) => {
  
        console.log(reponse);
        if (reponse.token) {
          this.showMessage("success","Felicitations" ,"Connexion faite avec succès");
  
          //stocker les info de la requete dans notre localstorage
          localStorage.setItem("userOnline", JSON.stringify(reponse));
  
          //recuperer le le userConnecter
            this.userConnect = JSON.parse(localStorage.getItem('userOnline') || '');
           
          if (this.userConnect.roles === 'ROLE_ADMIN')
          console.log(this.userConnect)
          {
            this.route.navigateByUrl('/adsup')
            ;
          } 
          if (this.userConnect.roles === 'ROLE_USER')
          console.log(this.userConnect)
          {
            this.route.navigateByUrl('/dashuser')
            ;
          } 
          if (this.userConnect.roles === 'ROLE_DAHRA')
          console.log(this.userConnect)
          {
            this.route.navigateByUrl('/dashmaitre')
            ;
          } 
        } else {
          this.showMessage("error", "Oops","Login ou pass incorrect");
        }
      });
    }
  }

  connexion() {
    // alert(this.emailLogin);
    // alert(this.passwordLogin);

    // EmailRegex
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;

    if (this.emailLogin == "" || this.passwordLogin == "") {
      this.alertMessage("error", "Attention", "Veillez renseigner tous les champs");
    } else if (!this.emailLogin.match(emailPattern)) {
      this.alertMessage("error", "Attention", "Veillez revoir votre email");
    } else if (this.passwordLogin.length < 5) {
      this.alertMessage("error", "Attention", "Le mot de passe doit contenir plus de huit caractéres");
    } else {
      this.alertMessage("success", "Bravo", "Vous etes connecté avec succés");
    }

  }

   // Initialiser le contenu actuel
   currentContent: string = '';

   // Mettre à jour le contenu actuel
   showComponant(contentId: string): void {
     this.currentContent = contentId;
   }

  // sweetAlert
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text
    });
  }

// inscription
Signup() {
  this.user={
    prenom:this.prenom,
    nom:this.nom,
    email:this.email,
    adresse:this.adresse,
    password:this.password,
    numeroTelephone:this.numeroTelephone,

  }
  alert("hi");
  this.authService.inscriptionDonateur(this.user).subscribe(
    (response:any) => {
      console.log(response);
      alert("inscription réussie")
      this.isLoginFormVisible=!this.isLoginFormVisible
      
      this.route.navigate(['/login']);
    }, 
    (error:any) => {
      // Gérez les erreurs d'inscription.
      console.error('Erreur d\'inscription :', error);
    }
  );
}

}
