import React from 'react'
import Card from '../components/Card'
import FormGroup from '../components/form-group'
import {withRouter} from 'react-router-dom'
import UsuarioService from '../app/service/usuarioService'
import {mensagemSucesso,mensagemErro} from '../components/toastr'


class CadastroUsuario  extends React.Component{

    state={
        nome:'',
        email:'',
        senha:'',
        senhaRepetida:''

    }
        constructor(){
            super();
            this.service=new UsuarioService()
        }


    cadastrar = () =>{

                const {nome,email,senha,senhaRepetida}=this.state
                const usuario ={ nome, email, senha, senhaRepetida }

                try {
                    this.service.validar(usuario);
                } catch (error) {
                    const msg = error.mensagens;
                    msg.forEach(msg => mensagemErro(msg))
                    return false
                    
                }

        this.service.salvar(usuario)
        .then( response =>{
            mensagemSucesso('Cadastrado com Sucesso.')
            this.props.history.push('/Login');
        }).catch(error =>{
            mensagemErro(error.response.data)
        })

    }

    Cancelar = () =>{
        this.props.history.push('/Login');
    }

    render(){
        return(
            <Card title="Cadstro de Usuário">
                      <div className="row">
                                 <div className="col-lg-12">
                                         <div className="bs-component">

                                        <FormGroup label="Nome: *" htmlFor="inputNome">

                                                <input  type="text" 
                                                            className="form-control"
                                                             id="inputNome" 
                                                             name="nome"
                                                             onChange={e => this.setState({nome: e.target.value})} />

                                        </FormGroup>

                                        <FormGroup label="Email: *" htmlFor="inputEmail">
                                                    <input type="email"
                                                                className="form-control"
                                                                id="inputEmail"
                                                                nome="email"
                                                                onChange={e => this.setState({email: e.target.value})}/>
                                        </FormGroup>

                                        <FormGroup label="Senha: *" htmlFor="inputSenha">
                                                    <input type="password"
                                                                className="form-control"
                                                                id="inputSenha"
                                                                nome="senha"
                                                                onChange={e => this.setState({senha: e.target.value})}/>
                                        </FormGroup>

                                        <FormGroup label="Repita Senha: *" htmlFor="inputRepitaSenha">
                                                    <input type="password"
                                                                className="form-control"
                                                                id="inputRepitaSenha"
                                                                nome="senha"
                                                                onChange={e => this.setState({senhaRepetida: e.target.value})}/>
                                        </FormGroup>
                                        <button onClick={this.cadastrar}  type="button" className="btn btn-success">
                                        <i className="pi pi-save"></i>Salvar
                                            </button>
                                        <button  onClick={this.Cancelar} type="button" className="btn btn-danger">
                                        <i className="pi pi-times"></i> Cancelar
                                            </button>

                                      </div>
                                 </div>
                      </div>
                   
            </Card>

        )
    }
}
export default  withRouter (CadastroUsuario)