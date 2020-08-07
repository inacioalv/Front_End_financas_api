import React from 'react'
import NavbarIntem  from './navbarIntem'
//import AuthService from '../app/service/authService'
import {AuthConsumer} from '../main/provedorAuteticacao'

//const deslogar = ()=>{
//      AuthService.removerUsuarioAutenticado()
//}

//const isUusarioAutenticado =() =>{
 //   AuthService.isUusarioAutenticado()
//}

function Navbar (props){
    return(
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
        <div className="container">
          <a href="#/Home" className="navbar-brand">Minhas Finanças</a>
          <button className="navbar-toggler" 
                        type="button" data-toggle="collapse"
                         data-target="#navbarResponsive" 
                         aria-controls="navbarResponsive"
                          aria-expanded="false" 
                          aria-label="Toggle navigation">

            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
              <NavbarIntem render={props.isUsuarioAutenticado} href="#/Home" label="Home" />
              <NavbarIntem render={props.isUsuarioAutenticado} href="#/CadastroUsuario" label="Usuário" />
              <NavbarIntem render={props.isUsuarioAutenticado} href="#/consulta-lacamento" label="Lançamento" />
              <NavbarIntem render={props.isUsuarioAutenticado}  onClick={props.deslogar} href="#/Login" label="Sair" />

          </ul>
  
          </div>
        </div>
      </div>
    )
}

export default () =>(
      <AuthConsumer>
        {(context) =>(
          <Navbar isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao} />
        )}
      </AuthConsumer>
)