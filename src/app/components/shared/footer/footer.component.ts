import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  public visibleSection = null;
  public itemsFooter = [
    {
      title: 'Conócenos',
      id: '1',
      subItemsFooter: [
        {
        label: 'Términos y Condiciones',
        link: '#'
      },
      {
        label: 'Política de Privacidad',
        link: '#'
      }
    ]
    },
    {
      title: 'Mi cuenta',
      liidnk: '2',
      subItemsFooter: [
        {
        label: 'Iniciar sesión',
        link: '#'
      }
    ]
    }
  ];
  public socialMedia = [
    {
    name: 'facebook',
    icon: 'assets/socialmedia/facebook.svg',
    link: "https://www.facebook.com/amorepizza504/?ref=page_internal" 
  },
  {
    name: 'instagram',
    icon: 'assets/socialmedia/instagram.svg',
    link: "https://www.instagram.com/amorepizza504/?igshid=YmMyMTA2M2Y%3D" 
  },  
  {
    name: 'whatsapp',
    icon: 'assets/socialmedia/whatsapp.svg',
    link: "https://wa.me/50488927716" 
  },  
  {
    name: 'tiktok',
    icon: 'assets/socialmedia/tiktok.svg',
    link: "https://www.tiktok.com/@amorepizza504" 
  }
  ];




}
