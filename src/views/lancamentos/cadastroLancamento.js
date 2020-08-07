import React from 'react'
import {withRouter} from 'react-router-dom'
import Card from '../../components/Card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentoService from '../../app/service/lancamentoService'
import * as mensagem from '../../components/toastr'
import LocalStorageService from '../../app/service/localStorageService'

class CadastroLancamento extends React.Component{

        constructor(){
            super();
            this.service=new LancamentoService();
        }

        

        state ={ 
            id:null,
            descricao:'',
            valor:'',
            mes:'',
            ano:'',
            tipo:'',
            status:'',
            usuario:null,
            atualizado:false
           
        }
    
            handeleChange=(event)=>{
                const value=event.target.value;
                const name=event.target.name;

                this.setState({[name]:value})
            }

            submit =()=>{

                const usuarioLogado =LocalStorageService.obterItem('_usuario_logado');

                //destruturação
                const {descricao,valor,mes,ano,tipo}=this.state
                const lancamento ={descricao,valor, mes, ano,tipo,usuario:usuarioLogado.id}

                    try {
                        this.service.validar(lancamento)
                    } catch (error) {
                        const mensagens=error.mensagens;
                        mensagens.forEach(msg => mensagem.mensagemErro(msg));
                        return false
                    }

                           this.service
                                .salvar(lancamento)
                                .then(response =>{
                                    this.props.history.push('/consulta-lacamento')
                                    mensagem.mensagemSucesso('Cadastrado com sucesso.')
                                }).catch(error =>{
                                    mensagem.mensagemErro(error.response.data)
                                })
            }

            componentDidMount(){
                const params = this.props.match.params
                if(params.id){
                    this.service.obterPorId(params.id)
                                      .then(response =>{
                                          this.setState({...response.data,atualizado:true})
                                      }).catch(error =>{
                                          mensagem.mensagemErro(error.response.data)
                                      })
                }
            }


            atualizar = () =>{
                const {descricao,valor,mes,ano,tipo,id,usuario,status}=this.state
                const lacamento ={descricao,valor, mes, ano,tipo,id,usuario,status}

                this.service
                      .atualizar(lacamento)
                      .then(response =>{
                    this.props.history.push('/consulta-lacamento')
                    mensagem.mensagemSucesso('Atualizado com sucesso.')
                }).catch(error =>{
                    mensagem.mensagemErro(error.response.data)
                })

            }
        

        render(){

            const tipos =this.service.obterListaTipo();
            const messes= this.service.obterListaMeses();
            return(
         <Card title={this.state.atualizado ? 'Atualizando Lancamento':'Cadastrado Lancamento'}>
                     <div className="row">
                     <div className="col-md-12">
                              <FormGroup id="inputdescricao" label="Descrição *">
                                        <input id="inputdescricao"
                                                    type="text"  
                                                    name="descricao"
                                                    value={this.state.descricao}
                                                    onChange={this.handeleChange}
                                                    className="form-control" />
                              </FormGroup>

                           </div>
                     </div>
                  <div className="row">
                                            <div className="col-md-6">
                                                   <FormGroup id="inputAno" label="Ano *">
                                                         <input id="inputAno"  
                                                                    type="text"  
                                                                    value={this.state.ano}
                                                                    name="ano"
                                                                    onChange={this.handeleChange}
                                                                    className="form-control" />
                                                </FormGroup>
                                             </div>
                                             <div className="col-md-6">
                                                     <FormGroup id="inputMes" label="Mês *">
                                                     <SelectMenu  id="inputMes"  
                                                                            lista={messes} 
                                                                            name="mes"
                                                                            value={this.state.mes}
                                                                            onChange={this.handeleChange}
                                                                            className="form-control" />
                                                   </FormGroup>
                                          </div>
                          </div>
                          <div className="row">
                                            <div className="col-md-4">
                                                   <FormGroup id="inputValor" label="Valor *">
                                                         <input id="inputValor"  
                                                                    type="text"  
                                                                    name="valor"
                                                                    value={this.state.valor}
                                                                    onChange={this.handeleChange}
                                                                    className="form-control" />
                                                </FormGroup>
                                             </div>
                                             <div className="col-md-4">
                                                     <FormGroup id="inputTipo" label="Tipo *">
                                                                     <SelectMenu  id="inputTipo" 
                                                                                            lista={tipos} 
                                                                                            name="tipo"
                                                                                            value={this.state.tipo}
                                                                                            onChange={this.handeleChange}
                                                                                            className="form-control"  />
                                                   </FormGroup>
                                          </div>
                                          <div className="col-md-4">
                                                     <FormGroup id="inputStatus" label="Status ">
                                                     <input id="inputStatus"  
                                                                type="text" 
                                                                name="status"
                                                                value={this.state.status}
                                                                
                                                                className="form-control" disabled  />
                                                   </FormGroup>
                                          </div>

                                         
                          </div>
                              <div className="row">
                                             <div className="col-md-4">
                                                                                                    
                                                 {this.state.atualizado ?
                                                  (
                                                     <button onClick={this.atualizar}  type="button"  className="btn btn-primary">
                                                         <i class="pi pi-undo"></i>Atualizar
                                                    </button>   
                                                  )  :(
                                                     <button onClick={this.submit}    type="button" className="btn btn-success"> 
                                                            <i className="pi pi-refresh"></i>Salvar
                                                      </button>
                                                     )}

                                                     <button onClick={e => this.props.history.push('/consulta-lacamento')}  type="button" 
                                                                  className="btn btn-danger"> 
                                                           <i className="pi pi-times"></i> Cancelar
                                                    </button>
                                                     </div>
                                             </div>
                                            
     </Card>
            )
        }

}
export default withRouter(CadastroLancamento)
