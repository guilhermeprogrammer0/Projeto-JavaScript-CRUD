class Cliente{
    constructor(nome,cpf,data){
        this.nome = nome;
        this.cpf = cpf;
        this.data = data;
    }
}
let tabela_dados = document.querySelector("#tabela");
let btnCadastrar = document.querySelector("#cadastrar");
var lista_clientes = [];
var posicao = '';
var nome = document.querySelector("#nome");
var cpf = document.querySelector("#cpf");
var data = document.querySelector("#data");
var campos = document.querySelectorAll(".campos");
btnCadastrar.addEventListener("click",()=>{
    btnCadastrar.innerHTML = 'Cadastrar';
    btnCadastrar.classList.remove("btn-warning");
    campos.forEach((campo)=>{
        if(campo.value ==''){
            campo.classList.add("campoVazio");
        }
        else{
            campo.classList.remove("campoVazio");
        }
    })
        if(nome.value ==='' || cpf.value ==='' || data.value ===''){
            alert("Preencha todos os campos!")
        }
        else{
        cliente = new Cliente(nome.value,cpf.value,data.value);
        if(localStorage.getItem("ListaClientes")!=null){
            lista_clientes = JSON.parse(localStorage.getItem("ListaClientes"));
        }
        if(posicao==''){
            lista_clientes.push(cliente);
        }
        else{
            lista_clientes[posicao] = cliente;
            posicao = '';
        }
        nome.value = '';
        cpf.value = '';
        data.value = '';
        localStorage.setItem("ListaClientes",JSON.stringify(lista_clientes));
        carregar();
    }
});
function listar(lista){
    let auxHtml = '';
    lista.forEach((c,indice)=>{
        auxHtml +=`
        <tr>
            <td> ${c.nome} </td>
            <td> ${c.cpf} </td>
            <td> ${c.data} </td>
            <td> <a href="#" class="btn btn-warning btnAlterar" rel="${indice}"> Alterar </a></td>
            <td> <a href="#" class="btn btn-danger btnExcluir" rel="${indice}"> Excluir </a></td>
        </tr>
        `   
    });
    return auxHtml;
}
tabela_dados.addEventListener("click",Acoes);
function Acoes(event){
    posicao = event.target.rel;
    if(localStorage.getItem("ListaClientes")!=null){
        lista_clientes = JSON.parse(localStorage.getItem("ListaClientes"));
    }
    if(event.target.classList.contains("btnAlterar")){
        btnCadastrar.innerHTML = 'Editar';
        btnCadastrar.classList.add("btn-warning");
        nome.value = lista_clientes[posicao].nome;
        cpf.value = lista_clientes[posicao].cpf;
        data.value = lista_clientes[posicao].data;
    }
    else if(event.target.classList.contains("btnExcluir")){
        let confirmar = confirm("Deseja mesmo excluir?");
        if(confirmar == true){
            lista_clientes.splice(posicao,1);
            localStorage.setItem("ListaClientes",JSON.stringify(lista_clientes));
            carregar();
        }  
    }
}
function carregar(){
    tabela_dados.innerHTML = listar(JSON.parse(localStorage.getItem("ListaClientes")))
}
