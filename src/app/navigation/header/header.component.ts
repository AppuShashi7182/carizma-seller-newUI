import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/AuthService';
import { TokenStorageService } from 'src/app/services/TokenStorageService';
import routes from '../../../assets/json/routes.json'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() public sidenavToggle = new EventEmitter();
  public key = 'home'
  showMenu=false;
  constructor(private router: Router, public authService: AuthService, public tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.key = routes?.filter((route:any)=>route.key === window.location.pathname.split('/')?.[1])?.[0]?.key
      console.log(window.location.pathname.split('/')?.[1])
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  onClickProfile() {
    this.router.navigate(['/profile']);
  }

  navigate(route:string) {
    this.router.navigate([`/${route}`]);
    this.key = route
    this.showMenu=false;
  }
  handleShowMenu(){
    this.showMenu=!this.showMenu
  }
  logOut() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
