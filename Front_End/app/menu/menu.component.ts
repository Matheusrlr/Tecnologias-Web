import { Component, OnInit,NgZone } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private ngZone: NgZone) { }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem('TOKEN')
    localStorage.removeItem('TIPO');
    this.ngZone.run(() => {
      this.router.navigateByUrl('');
    });

  }

}
