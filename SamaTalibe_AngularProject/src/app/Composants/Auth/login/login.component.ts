import { NgIfContext } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN_KEY } from 'src/app/constants/constant';
import { AuthService } from 'src/app/service/auth-service.service';
// import Swal from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
regions: string[] = ["Dakar", "Kaolack", "Saint-louis",
"Diourbel", "Ziguinchor", "Tambacounda","Matam", "Fatick", "Thies",
"Kédougou", "Matam", "Kaffrine","Kolda", "Sédhiou"
];
selectedImage: File | null = null;
selectedRegion: string = "";
getLoginLogin(choice: string) {
  this.isLoginFormVisible = choice;
}
  isLoginFormVisible = 'connexion';
  choixForm: string = 'inscription';
  nomDahra: string = '';
  nomOuztas: string = '';
  adresse: string = '';
  region: string = '';
  numeroTelephone: string = '';
  numeroTelephoneOuztas: string = '';
  nombreTalibe: string = '';
  email: string = '';
  password: string = '';
  imageFile: string = '';

  updateChoixForm(event: any) {
    // this.choixForm = event.target.value;
    this.isLoginFormVisible = event.target.value;
  }

  loginUser = {
    email: '',
    password: '',
  };

  signupUser = {
    name: '',
    firstname: '',
    number: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  signupDahra = {
    imageFile: '',
    nomDahra: '',
    nomOustaz: '',
    adressDahra: '',
    regionDahra: '',
    numeroDahra: '',
    numeroOustaz: '',
    nombreTalibeDahra: '',
    mailDahra: '',
    passwordDahra: '',
  };

  // toggleForm() {
  //   this.isLoginFormVisible = !this.isLoginFormVisible;
  // }
  submitFunction(event: Event) {
    event.preventDefault();
  }

  constructor(private route: Router, private authService: AuthService) {}
  ngOnInit() {}
  user: any = {
    name: '',
    firstname: '',
    numerotelephone: '',
    username: '',
    password: '',
    confirmedPassword: '',
  };
  userDahra: any = {
    nom: '',
    nameDahra: '',
    numeroOustaz: '',
    numeroDahra: '',
    adresseDahra: '',
    regionDahra: '',
    mailDahra: '',
    nombreTalibeDahra: '',
    passwordDahra: '',
  };
  credentials: any;
  loading!: boolean;
  userConnected: any;
  errorMsg: any;

  userConnect: any;
  
  // Nos attributs

  emailLogin: string = '';
  passwordLogin: string = '';
  prenom: string = '';
  nom: string = '';
  // email: string = '';
  // password: string = '';
  // adresse: string = '';
  // region: string = '';
  // numeroTelephone: string = '';

  // sweetalert
  showMessage(icon: any, titre: any, texte: any) {
    Swal.fire({
      icon: icon,
      title: titre,
      text: texte,
    });
  }

  login() {
    if (this.emailLogin == '' || this.passwordLogin == '') {
      this.showMessage('error', 'Oops', 'Veuillez renseigner tous les champs');
    } else {
      // alert('connecter');

      this.authService.login(
        { email: this.emailLogin, password: this.passwordLogin },
        (reponse: any) => {
          console.log(reponse);
          if (reponse.token) {
            this.showMessage(
              'success',
              'Felicitations',
              'Connexion faite avec succès'
            );

            //stocker les info de la requete dans notre localstorage
            localStorage.setItem(TOKEN_KEY, JSON.stringify(reponse));

            //recuperer le le userConnecter
            this.userConnect = JSON.parse(
              localStorage.getItem(TOKEN_KEY) || ''
            );
              console.log(reponse.user.roles)
            if (reponse.user.roles.includes('ROLE_ADMIN')) {
              // console.log(this.userConnect);
              this.route.navigate(['/adsup']);
            } else if (reponse.user.roles.includes('ROLE_DAHRA')) {
              // console.log(this.userConnect);
              this.route.navigate(['/dashmaitre']);
            } else {
              // console.log(this.userConnect);
              this.route.navigate(['/dashuser']);
            } 
          } else {
            this.showMessage('error', 'Oops', 'Login ou pass incorrect');
          }
        }
      );
    }
  }

  connexion() {
    // alert(this.emailLogin);
    // alert(this.passwordLogin);

    // EmailRegex
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;

    if (this.emailLogin == '' || this.passwordLogin == '') {
      this.alertMessage(
        'error',
        'Attention',
        'Veillez renseigner tous les champs'
      );
    } else if (!this.emailLogin.match(emailPattern)) {
      this.alertMessage('error', 'Attention', 'Veillez revoir votre email');
    } else if (this.passwordLogin.length < 5) {
      this.alertMessage(
        'error',
        'Attention',
        'Le mot de passe doit contenir plus de huit caractéres'
      );
    } else {
      this.alertMessage('success', 'Bravo', 'Vous etes connecté avec succés');
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
      text: text,
    });
  }

  // inscription
  Signup() {
    this.user = {
      prenom: this.prenom,
      nom: this.nom,
      email: this.email,
      adresse: this.adresse,
      password: this.password,
      numeroTelephone: this.numeroTelephone,
    };
    // alert('hi');
    this.authService.inscriptionDonateur(this.user).subscribe(
      (response: any) => {
        console.log(response);
        alert('inscription réussie');
        // this.isLoginFormVisible=!this.isLoginFormVisible

        this.route.navigate(['/login']);
      },
      (error: any) => {
        // Gérez les erreurs d'inscription.
        console.error("Erreur d'inscription :", error);
      }
    );
  }


  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0] as File;
  }
SignupDahra() {
  // Vérifier si les champs requis sont vides
  // if (
  //   !this.imageFile ||
  //   !this.nom ||
  //   !this.nomOuztas ||
  //   !this.adresse ||
  //   !this.region ||
  //   !this.numeroTelephone ||
  //   !this.numeroTelephoneOuztas ||
  //   !this.nombreTalibe ||
  //   !this.email ||
  //   !this.password
  // ) {
  //   alert("Veuillez remplir tous les champs obligatoires.");
  //   return;
  // }

  // Créer un nouvel objet FormData
  const formData = new FormData();

  formData.append("imageFile", this.selectedImage || '');
  formData.append("nom", this.nom);
  formData.append("nomOuztas", this.nomOuztas);
  formData.append("adresse", this.adresse);
  formData.append("region", this.selectedRegion);
  formData.append("numeroTelephone", this.numeroTelephone);
  formData.append("numeroTelephoneOuztas", this.numeroTelephoneOuztas);
  formData.append("nombreTalibe", this.nombreTalibe);
  formData.append("email", this.email);
  formData.append("password", this.password);

  
  // Ajouter l'image sélectionnée à l'objet FormData (si elle existe)
  if (this.selectedImage) {
    formData.append("image", this.selectedImage);
    console.log(this.selectedImage);
    
  }
  

  // Appeler la méthode d'inscriptionDahra avec l'objet FormData
  this.authService.inscriptionDahra(formData).subscribe(
    (response:any) => {
      console.log(response);
      alert("Inscription réussie");
      this.isLoginFormVisible = this.isLoginFormVisible ? 'visible' : 'hidden';
      this.route.navigate(['/login']);
    },
    (error:any) => {
      // Gérer les erreurs d'inscription.
      console.error('Erreur d\'inscription :', error);
    }
  );
}
}
