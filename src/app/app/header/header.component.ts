import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  links = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Help', link: '/help' },
  ];

}
