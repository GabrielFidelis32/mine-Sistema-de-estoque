let produtos = JSON.parse(localStorage.getItem("estoque")) || [];

function salvar() {
    localStorage.setItem("estoque", JSON.stringify(produtos));
}

function listarProdutos(){
    const tbody = document.querySelector("tbody")
    tbody.innerHTML = "";

    produtos.forEach((p, index)=>{
        tbody.innerHTML += `
        <tr>
        <td>${p.nome}</td>
        <td>${p.quantidade}</td>
        <td>${p.preco.toFixed(2)}</td>
        <td class="action">
        
        <button class="edit" onclick="editarProduto(${index})">Editar</button>

        <button class="delete" onclick="excluirProduto(${index})">Excluir</button>

        </td>
        </tr>
        `;
    });
}


function adicionarProduto(){
    const nome = document.getElementById("nome").value;
    const quantidade = document.getElementById("quantidade").value;
    const preco = document.getElementById("preco").value;

    if(!nome || !quantidade || !preco){
        alert("Preencha Todos os campos!");
        return;
    }

    produtos.push({
        nome,
        quantidade: Number(quantidade),
        preco: Number(preco)});
    salvar();
    listarProdutos();

    document.getElementById("nome").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("preco").value = "";

}

function editarProduto(index){
    const novoNome = prompt("Novo nome:", produtos[index].nome);
    const novaQtd = prompt("Nova quantidade:", produtos[index].quantidade);
    const novoPreco = prompt("Novo preço:", produtos[index].preco);

    if(novoNome && novaQtd && novoPreco){
        produtos[index].nome = novoNome;
        produtos[index].quantidade = Number(novaQtd);
        produtos[index].preco = Number(novoPreco);

        salvar();
        listarProdutos();
    }
}

function excluirProduto(index){
    if(confirm("Deseja  realmente excluir este Produto?")){
        produtos.splice(index,1);

        salvar();
        listarProdutos();

    }
}

listarProdutos();

