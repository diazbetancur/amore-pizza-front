// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url_API : 'https://localhost:7027/api/',
  //url_API : 'https://localhost:7201/api/',
  menu: [
    {
      title: "PIDE EN LINEA",
      link: '#', 
      type: '',
      module: 'Pide-en-linea',
      loged : false
    },
    {
      title: "MENU",
      link: '/products', 
      type: '',
      module: 'menu',
      loged : false
    },
    {
      title: "RESTAURANTES",
      link: '/restaurant', 
      type: '',
      module: 'restaurantes',
      loged : false
    },
    {
      title: "INICIAR SESION",
      link: '/login', 
      type: 'button',
      module: 'login',
      loged : false
    },
    {
      title: "Admi",
      link: '/login', 
      type: 'button',
      module: 'login',
      loged : true
    },
  ]
};

