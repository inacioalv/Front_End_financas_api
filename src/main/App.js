import React from 'react';

import Rotas from './rotas'
import Navbar from '../components/navbar'
import 'toastr/build/toastr.min.js'
import ProvedorAuteticacao from './provedorAuteticacao'

import '../custom.css'
import 'bootswatch/dist/flatly/bootstrap.css'
import 'toastr/build/toastr.css'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';





class App extends React.Component{

      render(){
        return(
          <ProvedorAuteticacao>
          <Navbar/>
          
          <div className="container"> 
         <Rotas/>
        
          </div>
          </ProvedorAuteticacao>
        )
      }
 
}

export default App;
