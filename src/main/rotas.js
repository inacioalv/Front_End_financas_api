import React from 'react'

import {Route,Switch,HashRouter,Redirect} from 'react-router-dom'
import Login from '../views/Login'
import CadastroUsuario from '../views/cadastroUsuario'
import Home from '../views/Home'
import ConsultaLacamento from '../views/consulta-lacamento'
import CadastroLancamento from '../views/lancamentos/cadastroLancamento'
import {AuthConsumer} from '../main/provedorAuteticacao'




function RotaAutenticada({component:Component,isUsuarioAutenticado,...props}){
    return  (
        <Route {...props} render={ (componentProps)=>{
                    if(isUsuarioAutenticado){
                        return(
                            <Component {...componentProps} />
                        )
                    }else{
                                return(
                                    <Redirect  to={{pathname:'/Login', state:{from:componentProps.location}}} />
                                )
                    }
        }} />
    )
}

function Rotas (props){
    return(
        <HashRouter>
            <Switch>
                <Route path="/Login" component={Login}/>
                <Route path="/CadastroUsuario" component={CadastroUsuario} />

                <RotaAutenticada  isUsuarioAutenticado={props.isUsuarioAutenticado} path="/Home" component={Home} />
                <RotaAutenticada  isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lacamento" component={ConsultaLacamento} />
                <RotaAutenticada  isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lacamento/:id?" component={CadastroLancamento} />
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />) }
    </AuthConsumer>
)



// Utilizar o ? para ignorar o id