class Cliente{
    constructor(nome,cpf,data){
        this.nome = nome;
        this.cpf = cpf;
        this.data = data;
    }
}
let tabela_dados = document.querySelector("#tabela");
let btnCadastrar = document.querySelector("#cadastrar");
btnCadastrar.addEventListener('click',Cadastrar);
var lista_clientes = [];
var posicao = '';
function Cadastrar(){
     let nome = document.querySelector("#nome");
     let cpf = document.querySelector("#cpf");
     let data = document.querySelector("#data");
     if(localStorage.getItem("listaClientes") !=null){
        lista_clientes = JSON.parse(localStorage.getItem("listaClientes"))
     }
    if(nome.value!='' && cpf.value !='' && data.value!=''){
         cliente = new Cliente(nome.value,cpf.value,data.value);
        if(posicao == ''){
            lista_clientes.push(cliente);
        }
        else{
            lista_clientes[posicao] = cliente; 
            posicao = '';
        }
        localStorage.setItem("listaClientes",JSON.stringify(lista_clientes));
        nome.value = '';
        cpf.value = '';
        data.value = '';
    }
    else{
        alert('Preencha os campos!');
    }
    carregar();
}
function Listar(lista){
    var auxHtml = '';
    lista.forEach((cliente,indice)=>{
        auxHtml += `
        <tr>
        <td> ${cliente.nome} </td>
        <td> ${cliente.cpf} </td>
        <td> ${cliente.data} </td>
        <td>  <a href="#" rel="${indice}" class="btn btn-warning btnAlterar"> Alterar  </td>
        <td>  <a href="#" rel="${indice}" class="btn btn-danger btnExcluir"> Excluir  </td>     
        </tr>
        `
    })
    return auxHtml;
}
tabela_dados.addEventListener('click',Acoes)
function Acoes(event){
    if(localStorage.getItem("listaClientes") !=null){
        lista_clientes = JSON.parse(localStorage.getItem("listaClientes"))
    posicao = event.target.rel;
    if(event.target.classList.contains('btnAlterar')){
        document.getElementById("nome").value = lista_clientes[posicao].nome;
        document.getElementById("cpf").value = lista_clientes[posicao].cpf;
        document.getElementById("data").value = lista_clientes[posicao].data;
    }
    else if(event.target.classList.contains("btnExcluir")){
        let confirmar = window.confirm("Deseja mesmo excluir?");
        if(confirmar == true){
            lista_clientes.splice(posicao,1);
            localStorage.setItem("listaClientes",JSON.stringify(lista_clientes));
            carregar();
        }
    }
}
}
function carregar(){
    tabela_dados.innerHTML = Listar(JSON.parse(localStorage.getItem("listaClientes")));
}
