import { CanActivateFn, Router } from '@angular/router';
import { TOKEN_KEY } from '../constants/constant';
import Swal from 'sweetalert2';

export const tokenGuardGuard: CanActivateFn = (route, state) => {
  const router=new Router();
  if (localStorage.getItem(TOKEN_KEY)==null || localStorage.getItem(TOKEN_KEY)==undefined) {
    Swal.fire({
      title: "Oops",
      text: "Veuillez vous connecter",
      icon: "warning",
    });
    // router.navigate(['/a-propos']);
    return false;
  }else{
    
    return true;
  }
};
