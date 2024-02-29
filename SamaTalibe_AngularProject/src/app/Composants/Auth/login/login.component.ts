import { NgIfContext } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { TOKEN_KEY } from 'src/app/constants/constant';
import { AuthService } from 'src/app/service/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import Swal from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // Attributs
  regions: string[] = [
    'Dakar',
    'Kaolack',
    'Saint-louis',
    'Diourbel',
    'Ziguinchor',
    'Tambacounda',
    'Matam',
    'Fatick',
    'Thies',
    'Kédougou',
    'Matam',
    'Kaffrine',
    'Kolda',
    'Sédhiou',
  ];
  selectedImage: File | null = null;
  selectedRegion: string = '';

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
  // validations Attributs
  truthyTab: any[] = [];

  // toggleForm() {
  //   this.isLoginFormVisible = !this.isLoginFormVisible;

  // Methodes
  constructor(private route: Router, private authService: AuthService) {}

  ngOnInit() {}
  getLoginLogin(choice: string) {
    this.isLoginFormVisible = choice;
  }
  updateChoixForm(event: any) {
    this.truthyTab=[]
    // this.choixForm = event.target.value;
    this.isLoginFormVisible = event.target.value;
    console.log(this.isLoginFormVisible);
    

  }
  // }
  submitFunction(event: Event) {
    event.preventDefault();
  }

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
      timer: 2000,
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
            console.log(reponse.user.roles);
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
            this.showMessage('error', 'Oops', 'Login ou Mot de passe incorrect');
          }
        },((error:any)=>{
          if (error.error.code==401) {
            this.showMessage('error', 'Oops', 'Login ou Mot de passe incorrect');
            
          }
          // console.log(error);
        })
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
    if (
      this.truthyTab.find((value: any) => value.image == true) ==
      undefined
    ) {
      this.truthyTab.push({ image: true });
    }else{
      this.truthyTab.splice(
        this.truthyTab.findIndex((value: any) => value.password == true),
        1
      );
    }
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

    formData.append('imageFile', this.selectedImage || '');
    formData.append('nom', this.nom);
    formData.append('nomOuztas', this.nomOuztas);
    formData.append('adresse', this.adresse);
    formData.append('region', this.selectedRegion);
    formData.append('numeroTelephone', this.numeroTelephone);
    formData.append('numeroTelephoneOuztas', this.numeroTelephoneOuztas);
    formData.append('nombreTalibe', this.nombreTalibe);
    formData.append('email', this.email);
    formData.append('password', this.password);

    // Ajouter l'image sélectionnée à l'objet FormData (si elle existe)
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
      console.log(this.selectedImage);
    }

    // Appeler la méthode d'inscriptionDahra avec l'objet FormData
    this.authService.inscriptionDahra(formData).subscribe(
      (response: any) => {
        console.log(response);
        alert('Inscription réussie');
        this.isLoginFormVisible = this.isLoginFormVisible
          ? 'visible'
          : 'hidden';
        this.route.navigate(['/login']);
      },
      (error: any) => {
        // Gérer les erreurs d'inscription.
        console.error("Erreur d'inscription :", error);
      }
    );
  }

  // validations

  emailValidate() {
    let validationEmail = document.getElementById('validationEmail');
    const emailRegexGegin = /^[a-zA-Z]+[.a-z0-9]+@[a-z]+[.]{1}[a-z]{2,}$/;
    // const emailRegexEnd = /^[a-z]{2,}$/;
    // this.emailError = emailRegexGegin.test(this.email);
    if (emailRegexGegin.test(this.emailLogin)) {
      // console.log(emailRegexGegin.test(this.email));
      validationEmail!.innerHTML = 'valide';
      validationEmail!.classList.remove('error');
      validationEmail!.classList.add('success');
      if (
        this.truthyTab.find((value: any) => value.emailLogin == true) ==
        undefined
      ) {
        this.truthyTab.push({ emailLogin: true });
      }
      console.log(this.truthyTab);
    } else {
      // console.log(emailRegexGegin.test(this.email));
      validationEmail!.innerHTML = 'invalide';
      validationEmail!.classList.remove('success');
      validationEmail!.classList.add('error');
      if (
        this.truthyTab.find((value: any) => value.emailLogin == true) !=
        undefined
      ) {
        this.truthyTab.splice(
          this.truthyTab.findIndex((value: any) => value.emailLogin == true),
          1
        );
      }
    }
    if (this.emailLogin == '') {
      validationEmail!.innerHTML = '';
    }
    // console.log(this.truthyTab);
  }

  // pass  validator
  passeValidate() {
    let validationPrenom = document.getElementById('validationPasse');
    const nomPrenomRegex = /^[a-zA-Z]+[a-zA-Z0-9-@_&]{7,}$/;
    if (nomPrenomRegex.test(this.passwordLogin)) {
      // console.log(nomPrenomRegex.test(this.pass));
      validationPrenom!.innerHTML = 'valide';
      validationPrenom!.classList.remove('error');
      validationPrenom!.classList.add('success');
      if (
        this.truthyTab.find((value: any) => value.passwordLogin == true) ==
        undefined
      ) {
        this.truthyTab.push({ passwordLogin: true });
      }
    } else {
      // console.log(nomPrenomRegex.test(this.pass));
      validationPrenom!.innerHTML = 'invalide';
      validationPrenom!.classList.remove('success');
      validationPrenom!.classList.add('error');
      if (
        this.truthyTab.find((value: any) => value.passwordLogin == true) !=
        undefined
      ) {
        this.truthyTab.splice(
          this.truthyTab.findIndex((value: any) => value.passwordLogin == true),
          1
        );
      }
    }
    if (this.passwordLogin == '') {
      validationPrenom!.innerHTML = '';
    }
    // console.log(this.truthyTab);
    // console.log(this.truthyTab.length);
  }

  // text validation
  nomdahraValidate() {
    let validationPrenom = document.getElementById('validationNomDahra');
    const nomPrenomRegex = /^[a-zA-Z]{2,25}$/;
    if (nomPrenomRegex.test(this.nom)) {
      // console.log(nomPrenomRegex.test(this.prenom));
      validationPrenom!.innerHTML = 'valide';
      validationPrenom!.classList.remove('error');
      validationPrenom!.classList.add('success');
      if (this.truthyTab.find((value: any) => value.nom == true) == undefined) {
        this.truthyTab.push({ nom: true });
      }
    } else {
      // console.log(nomPrenomRegex.test(this.prenom));
      validationPrenom!.innerHTML = 'invalide';
      validationPrenom!.classList.remove('success');
      validationPrenom!.classList.add('error');
      if (this.truthyTab.find((value: any) => value.nom == true) != undefined) {
        this.truthyTab.splice(
          this.truthyTab.findIndex((value: any) => value.nom == true),
          1
        );
      }
    }
    if (this.nom == '') {
      validationPrenom!.innerHTML = '';
    }
  }
  nomOustazeValidate() {
    let validationPrenom = document.getElementById('validationOustaze');
    const nomPrenomRegex = /^[a-zA-Z]{2,25}$/;
    if (nomPrenomRegex.test(this.nomOuztas)) {
      // console.log(nomPrenomRegex.test(this.prenom));
      validationPrenom!.innerHTML = 'valide';
      validationPrenom!.classList.remove('error');
      validationPrenom!.classList.add('success');
      if (
        this.truthyTab.find((value: any) => value.nomOuztas == true) ==
        undefined
      ) {
        this.truthyTab.push({ nomOuztas: true });
      }
    } else {
      // console.log(nomPrenomRegex.test(this.prenom));
      validationPrenom!.innerHTML = 'invalide';
      validationPrenom!.classList.remove('success');
      validationPrenom!.classList.add('error');
      if (
        this.truthyTab.find((value: any) => value.nomOuztas == true) !=
        undefined
      ) {
        this.truthyTab.splice(
          this.truthyTab.findIndex((value: any) => value.nomOuztas == true),
          1
        );
      }
    }
    if (this.nomOuztas == '') {
      validationPrenom!.innerHTML = '';
    }
  }


  adresseValidate() {
    let validationPrenom = document.getElementById('validationAdresse');
    const nomPrenomRegex = /^[a-zA-Z]+[a-z0-9]{3,}$/;
    if (nomPrenomRegex.test(this.adresse)) {
      // console.log(nomPrenomRegex.test(this.adresse));
      validationPrenom!.innerHTML = 'valide';
      validationPrenom!.classList.remove('error');
      validationPrenom!.classList.add('success');
      if (this.truthyTab.find((value:any)=>value.adresse==true)==undefined) {
        this.truthyTab.push({adresse:true});
      }

    } else {
      // console.log(nomPrenomRegex.test(this.adresse));
      validationPrenom!.innerHTML = 'invalide';
      validationPrenom!.classList.remove('success');
      validationPrenom!.classList.add('error');
      if (this.truthyTab.find((value:any)=>value.adresse==true)!=undefined) {
        this.truthyTab.splice(this.truthyTab.findIndex((value:any)=>value.adresse==true),1);
      }
    }
    if (this.adresse=="") {
      validationPrenom!.innerHTML="";
    }
  }



  telephoneDharaValidate() {
    let validationPrenom = document.getElementById('validationTelephoneDahra');
    const nomPrenomRegex = /^(77|76|75|78|33)[0-9]{7}$/;
    if (nomPrenomRegex.test(this.numeroTelephone)) {
      // console.log(nomPrenomRegex.test(this.numeroTelephone));
      validationPrenom!.innerHTML = 'valide';
      validationPrenom!.classList.remove('error');
      validationPrenom!.classList.add('success');
      if (this.truthyTab.find((value:any)=>value.telephone==true)==undefined) {
        this.truthyTab.push({telephone:true});
      }

    } else {
      // console.log(nomPrenomRegex.test(this.numeroTelephone));
      validationPrenom!.innerHTML = 'invalide';
      validationPrenom!.classList.remove('success');
      validationPrenom!.classList.add('error');
      if (this.truthyTab.find((value:any)=>value.telephone==true)!=undefined) {
        this.truthyTab.splice(this.truthyTab.findIndex((value:any)=>value.telephone==true),1);
      }
    }
    if (this.numeroTelephone=="") {
      validationPrenom!.innerHTML="";
    }
  }
  telephoneOustazeValidate() {
    let validationPrenom = document.getElementById('validationTelephoneOustaze');
    const nomPrenomRegex = /^(77|76|75|78|33)[0-9]{7}$/;
    if (nomPrenomRegex.test(this.numeroTelephoneOuztas)) {
      // console.log(nomPrenomRegex.test(this.numeroTelephoneOuztas));
      validationPrenom!.innerHTML = 'valide';
      validationPrenom!.classList.remove('error');
      validationPrenom!.classList.add('success');
      if (this.truthyTab.find((value:any)=>value.telephone==true)==undefined) {
        this.truthyTab.push({telephone:true});
      }

    } else {
      // console.log(nomPrenomRegex.test(this.numeroTelephoneOuztas));
      validationPrenom!.innerHTML = 'invalide';
      validationPrenom!.classList.remove('success');
      validationPrenom!.classList.add('error');
      if (this.truthyTab.find((value:any)=>value.telephone==true)!=undefined) {
        this.truthyTab.splice(this.truthyTab.findIndex((value:any)=>value.telephone==true),1);
      }
    }
    if (this.numeroTelephoneOuztas=="") {
      validationPrenom!.innerHTML="";
    }
  }

// nombreTalibe Validators
nombreTalibes() {
  let validationPrenom = document.getElementById('validationNombreTalibes');
  const nomPrenomRegex = /^[0-9]+[0-9]$/;
  if (nomPrenomRegex.test(this.nombreTalibe)) {
    // console.log(nomPrenomRegex.test(this.pass));
    validationPrenom!.innerHTML = 'valide';
    validationPrenom!.classList.remove('error');
    validationPrenom!.classList.add('success');
    if (this.truthyTab.find((value:any)=>value.nombreTalibe==true)==undefined) {
      this.truthyTab.push({nombreTalibe:true});
    }

  } else {
    // console.log(nomPrenomRegex.test(this.pass));
    validationPrenom!.innerHTML = 'invalide';
    validationPrenom!.classList.remove('success');
    validationPrenom!.classList.add('error');
    if (this.truthyTab.find((value:any)=>value.nombreTalibe==true)!=undefined) {
      this.truthyTab.splice(this.truthyTab.findIndex((value:any)=>value.nombreTalibe==true),1);
    }
  }
  if (this.nombreTalibe=="") {
    validationPrenom!.innerHTML="";
  }
  // console.log(this.truthyTab);
  // console.log(this.truthyTab.length);
}

regionValidate() {

  if (this.truthyTab.find((value:any)=>value.region==true)==undefined) {
    this.truthyTab.push({region:true});
  }


}

emailRegisterValidate() {
  let validationEmail = document.getElementById('validationEmail');
  const emailRegexGegin = /^[a-zA-Z]+[.a-z0-9]+@[a-z]+[.]{1}[a-z]{2,}$/;
  // const emailRegexEnd = /^[a-z]{2,}$/;
  // this.emailError = emailRegexGegin.test(this.email);
  if (emailRegexGegin.test(this.email)) {
    // console.log(emailRegexGegin.test(this.email));
    validationEmail!.innerHTML = 'valide';
    validationEmail!.classList.remove('error');
    validationEmail!.classList.add('success');
    if (
      this.truthyTab.find((value: any) => value.email == true) ==
      undefined
    ) {
      this.truthyTab.push({ email: true });
    }
    console.log(this.truthyTab);
  } else {
    // console.log(emailRegexGegin.test(this.email));
    validationEmail!.innerHTML = 'invalide';
    validationEmail!.classList.remove('success');
    validationEmail!.classList.add('error');
    if (
      this.truthyTab.find((value: any) => value.email == true) !=
      undefined
    ) {
      this.truthyTab.splice(
        this.truthyTab.findIndex((value: any) => value.email == true),
        1
      );
    }
  }
  if (this.email == '') {
    validationEmail!.innerHTML = '';
  }
  // console.log(this.truthyTab);
}


passeRegisterValidate() {
  let validationPrenom = document.getElementById('validationPasseRegister');
  const nomPrenomRegex = /^[a-zA-Z]+[a-zA-Z0-9-@_&]{7,}$/;
  if (nomPrenomRegex.test(this.password)) {
    // console.log(nomPrenomRegex.test(this.pass));
    validationPrenom!.innerHTML = 'valide';
    validationPrenom!.classList.remove('error');
    validationPrenom!.classList.add('success');
    if (
      this.truthyTab.find((value: any) => value.password == true) ==
      undefined
    ) {
      this.truthyTab.push({ password: true });
    }
  } else {
    // console.log(nomPrenomRegex.test(this.pass));
    validationPrenom!.innerHTML = 'invalide';
    validationPrenom!.classList.remove('success');
    validationPrenom!.classList.add('error');
    if (
      this.truthyTab.find((value: any) => value.password == true) !=
      undefined
    ) {
      this.truthyTab.splice(
        this.truthyTab.findIndex((value: any) => value.password == true),
        1
      );
    }
  }
  if (this.passwordLogin == '') {
    validationPrenom!.innerHTML = '';
  }
  // console.log(this.truthyTab);
  // console.log(this.truthyTab.length);
}

// inscription validators

nomUserValidate() {
  let validationPrenom = document.getElementById('validationNomUser');
  const nomPrenomRegex = /^[a-zA-Z]{2,25}$/;
  if (nomPrenomRegex.test(this.nom)) {
    // console.log(nomPrenomRegex.test(this.prenom));
    validationPrenom!.innerHTML = 'valide';
    validationPrenom!.classList.remove('error');
    validationPrenom!.classList.add('success');
    if (this.truthyTab.find((value: any) => value.nom == true) == undefined) {
      this.truthyTab.push({ nom: true });
    }
  } else {
    // console.log(nomPrenomRegex.test(this.prenom));
    validationPrenom!.innerHTML = 'invalide';
    validationPrenom!.classList.remove('success');
    validationPrenom!.classList.add('error');
    if (this.truthyTab.find((value: any) => value.nom == true) != undefined) {
      this.truthyTab.splice(
        this.truthyTab.findIndex((value: any) => value.nom == true),
        1
      );
    }
  }
  if (this.nom == '') {
    validationPrenom!.innerHTML = '';
  }
}

prenomUserValidate() {
  let validationPrenom = document.getElementById('validationPrenomUser');
  const nomPrenomRegex = /^[a-zA-Z]{2,25}$/;
  if (nomPrenomRegex.test(this.prenom)) {
    // console.log(nomPrenomRegex.test(this.prenom));
    validationPrenom!.innerHTML = 'valide';
    validationPrenom!.classList.remove('error');
    validationPrenom!.classList.add('success');
    if (this.truthyTab.find((value: any) => value.prenom == true) == undefined) {
      this.truthyTab.push({ prenom: true });
    }
  } else {
    // console.log(nomPrenomRegex.test(this.prenom));
    validationPrenom!.innerHTML = 'invalide';
    validationPrenom!.classList.remove('success');
    validationPrenom!.classList.add('error');
    if (this.truthyTab.find((value: any) => value.prenom == true) != undefined) {
      this.truthyTab.splice(
        this.truthyTab.findIndex((value: any) => value.prenom == true),
        1
      );
    }
  }
  if (this.prenom == '') {
    validationPrenom!.innerHTML = '';
  }
}
telephoneUserValidate() {
  let validationPrenom = document.getElementById('validationTelephoneDahra');
  const nomPrenomRegex = /^(77|76|75|78|33)[0-9]{7}$/;
  if (nomPrenomRegex.test(this.numeroTelephone)) {
    // console.log(nomPrenomRegex.test(this.numeroTelephone));
    validationPrenom!.innerHTML = 'valide';
    validationPrenom!.classList.remove('error');
    validationPrenom!.classList.add('success');
    if (this.truthyTab.find((value:any)=>value.telephone==true)==undefined) {
      this.truthyTab.push({telephone:true});
    }

  } else {
    // console.log(nomPrenomRegex.test(this.numeroTelephone));
    validationPrenom!.innerHTML = 'invalide';
    validationPrenom!.classList.remove('success');
    validationPrenom!.classList.add('error');
    if (this.truthyTab.find((value:any)=>value.telephone==true)!=undefined) {
      this.truthyTab.splice(this.truthyTab.findIndex((value:any)=>value.telephone==true),1);
    }
  }
  if (this.numeroTelephone=="") {
    validationPrenom!.innerHTML="";
  }
}

}

