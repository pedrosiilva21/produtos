const tabela = document.getElementById("tabela_produtos")
const produtos = JSON.parse(localStorage.getItem("produtos"))

if (!produtos) {
    localStorage.setItem("produtos", JSON.stringify([]))
    location.reload()
}

for (let index = 0; index < produtos.length; index++) {
    const produto = produtos[index];
    const linha = `
        <tr>
            <td>${produto.id}</td>
            <td>${produto.lote}</td>
            <td>${produto.produto}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.descrição}</td>
            <td class="text-center">
                <div class="btn btn-warning" onClick="editarProduto(${produto.id})">Editar</div>
                <div class="btn btn-danger" onClick="apagarProduto(${produto.id})">Apagar</div>
            </td>
        </tr>
    `
    tabela.innerHTML += linha
}

function editarProduto(id) {
    const produto = procuraProdutoById(id)
    // abrir modal do id modal_cadastro
    var modal = new bootstrap.Modal(document.getElementById('modal_edicao'));
    const produtoeditar = document.getElementById("produto-editar")
    const loteeditar = document.getElementById("lote-editar")
    const quantidadeeditar = document.getElementById("quantidade-editar")
    const descriçãoeditar = document.getElementById("descrição-editar")
    

    produtoeditar.value = produto.produto
    loteeditar.value = produto.lote
    quantidadeeditar.value = quantidade.lote
    descriçãoeditar.value = descrição.lote

    modal.show(); // 
}

function apagarProduto(id) {
    Swal.fire({
        title: "Tem certeza?",
        text: "Você não poderá desfazer está ação",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, apagar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
            const produtoAremover = produtos.findIndex(produto => produto.id == id)
            produtos.splice(produtoAremover, 1)
            localStorage.setItem('produtos', JSON.stringify(produtos))
            location.reload()
        }
      });
}

const formulario_cadastro = document.getElementById("cadastro")

formulario_cadastro.addEventListener("submit", (event) => {
    event.preventDefault()
    
    const produtoDigitado = document.getElementById("produto-cadastro").value

    const loteDigitada = document.getElementById("lote-cadastro").value

    const quantidadeDigitada = document.getElementById("quantidade-cadastro").value

    const descriçãoDigitada = document.getElementById("descrição-cadastro").value
    

    let produtos = JSON.parse(localStorage.getItem("produtos"))
    const ultimoID = produtos[produtos.length -1]?.id || 0
    const produtoAdd = {
        id: ultimoID + 1,
        produto: produtoDigitado,
        lote: loteDigitada,
        quantidade: quantidadeDigitada,
        descrição: descriçãoDigitada
    }
    
    produtos.push(produtoAdd)
    localStorage.setItem('produtos', JSON.stringify(produtos))
    location.reload()
})

function procuraProdutoByProduto (produtoDigitado) {
    const produtos = JSON.parse(localStorage.getItem("produtos"))
    const found = produto.find((produto) => {
        return produto.produto == produtoDigitado 
    })
    return found
}

function procuraProdutoById(id) {
    const produtos = JSON.parse(localStorage.getItem("produtos"))
    const found = produtos.find((produto) => {
        return produto.id == id 
    })
    return found
}
