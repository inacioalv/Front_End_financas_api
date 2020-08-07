import React from 'react'
import {withRouter} from 'react-router-dom'
import Card from '../components/Card'
import FormGroup from '../components/form-group'
import SelectMenu from '../components/selectMenu'
import LançamentoTable from '../views/lancamentos/lacamentoTables.js'
import  LancamentoService from '../app/service/lancamentoService'
import LocalStorageService from '../app/service/localStorageService'
import * as mensagem from '../components/toastr'
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';

class ConsultaLacamento  extends React.Component{

        state={
            ano:'',
            mes:'',
            tipo:'',
            descricao:'',
            showConfirmDialog:false,
            lancamentoDeletar:{},
            lancamentos:[]

        }

        constructor(){
            super();
            this.service=new LancamentoService();
        }

      

        buscar =()=>{
                    if(!this.state.ano){
                        mensagem.mensagemErro('O preenchimeento ano e obrigatorio')

                        return false
                    }

                    const usuarioLogado =LocalStorageService.obterItem('_usuario_logado')

            const lancamentoFiltro ={
                ano: this.state.ano,
                mes:this.state.mes,
                tipo:this.state.tipo,
                descricao:this.state.descricao,
                usuario : usuarioLogado.id
            }

            this.service
                             .consultar(lancamentoFiltro)
                             .then(response =>{
                                 if(response.data.length < 1){
                                     mensagem.mensagemAlert('Nenhum resultado encontrado.')

                                 }
                                 this.setState({lancamentos: response.data})
                             }).catch(error =>{
                                 console.log(error);
                             })
        }

        editar = (id)=>{
          this.props.history.push(`/cadastro-lacamento/${id}`)
          
        }

        abrirConfirmacao =(lancamento)=>{
            this.setState({showConfirmDialog: true ,lancamentoDeletar: lancamento})
        }

        cancelarDelecao =(lancamento)=>{
            this.setState({showConfirmDialog: false ,lancamentoDeletar: lancamento})
        }

        deletar=()=>{
               this.service
                    .deletar(this.state.lancamentoDeletar.id)
                    .then(response =>{
                        const lancamentos = this.state.lancamentos;
                        const index = lancamentos.indexOf(this.state.lancamentoDeletar);
                        lancamentos.splice(index,1);
                        this.setState({lancamentos:lancamentos,showConfirmDialog:false})
                        mensagem.mensagemSucesso('Deletado com sucesso!')
                    }).catch(error =>{
                        mensagem.mensagemErro('Erro ao deletar')
                    })
        }

        prepararFormularioCadastro = ()=>{
            this.props.history.push('/cadastro-lacamento')
        }

        alterarStatus =(lancamento,status)=>{
            this.service.alterarStatus(lancamento.id,status)
                              .then(response =>{
                                const lancamentos = this.state.lancamentos;
                                 const index = lancamentos.indexOf(lancamento)
                                 if(index !== -1){
                                 lancamento['status']=status
                                 lancamentos[index]=lancamento
                                 this.setState({lancamentos})
                        }
                        mensagem.mensagemSucesso('Status atualizado com sucesso.')
                 })
        }


        render(){
                const messes = this.service.obterListaMeses()
                const tipos = this.service.obterListaTipo()

                const confirmDialogFooter = (
                    <div>
                        <Button label="Confirma" icon="pi pi-check" onClick={this.deletar} />
                        <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
                    </div>
                );
               

            return(
                <Card title="Consulta Lançamento">
                    <div className="row">
                            <div className="col-lg-6">
                                <div className="bs-component">
                                         <FormGroup  htmlFor="inputAno" label="Ano: *">
                                         <input type="text" 
                                                    className="form-control"
                                                     id="inputAno"
                                                     value={this.state.ano}
                                                     onChange={e => this.setState({ano: e.target.value})}
                                                    placeholder="Digite o Ano"/>

                                         </FormGroup>

                                         <FormGroup  htmlFor="inputMes" label="Mes: ">
                                            <SelectMenu  
                                                                id="inputMes"  
                                                                className="form-control" 
                                                                value={this.state.mes}
                                                                onChange={e => this.setState({mes: e.target.value})}
                                                                lista={messes} />
                                          </FormGroup>

                                          <FormGroup  htmlFor="inputDescricao" label="Descrição:">
                                         <input type="text" 
                                                    className="form-control"
                                                     id="inputDescricao"
                                                     value={this.state.descricao}
                                                     onChange={e => this.setState({descricao: e.target.value})}
                                                    placeholder="Digite a decrição"/>

                                         </FormGroup>


                                          <FormGroup  htmlFor="inputTipo" label="Tipo: ">
                                            <SelectMenu  
                                                                id="inputTipo" 
                                                                 className="form-control"
                                                                 value={this.state.tipo}
                                                                 onChange={e => this.setState({tipo: e.target.value})}
                                                                  lista={tipos} />
                                          </FormGroup>

                                          <button onClick={this.buscar} type="button" className="btn btn-success">
                                                 <i className="pi pi-search"></i>Buscar
                                         </button>

                                          <button onClick={this.prepararFormularioCadastro}  type="button" className="btn btn-danger">
                                                <i className="pi pi-plus"></i> Cadastrar
                                         </button>


                                               </div>
                                     </div>
                          </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="bs-component">
                                                <LançamentoTable  lancamentos={this.state.lancamentos}
                                                                                editarAction={this.editar} 
                                                                                alterarStatus={this.alterarStatus}
                                                                                deleteAction={this.abrirConfirmacao} />
                                            </div>

                                 </div>
                          </div>

                          <div>
                          <Dialog header="Confirmação" 
                                        visible={this.state.showConfirmDialog}
                                        style={{width: '50vw'}}
                                        footer={confirmDialogFooter}
                                        modal={true} 
                                        onHide={() => this.setState({showConfirmDialog: false})}>
                                                Confirma a exclusão deste Lançamento?
                                                
                           </Dialog>
                           
                          </div>


                </Card>

            )
        }


}
export default withRouter(ConsultaLacamento)