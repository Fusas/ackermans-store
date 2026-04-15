let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function atualizarContador() {
    let contador = document.getElementById("contador");
    if (contador) {
        contador.innerText = carrinho.length;
    }
}

function adicionar(nome, preco) {
    carrinho.push({ nome, preco });
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    mostrarToast("✔ Produto adicionado!");
    atualizarContador();
}

function renderizarCarrinho() {
    let lista = document.getElementById("lista");
    let totalElemento = document.getElementById("total");

    // 🔴 proteção contra erro
    if (!lista || !totalElemento) return;

    let total = 0;
    lista.innerHTML = "";

    // 🔴 recarrega do localStorage SEMPRE
    carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (carrinho.length === 0) {
        lista.innerHTML = "<p>Seu carrinho está vazio 😢</p>";
        totalElemento.innerText = "";
        return;
    }

    carrinho.forEach((item, index) => {
        total += item.preco;

        lista.innerHTML += `
            <p>
                ${item.nome} - R$ ${item.preco.toFixed(2)}
                <button onclick="remover(${index})">❌</button>
            </p>
        `;
    });

    totalElemento.innerText = "Total: R$ " + total.toFixed(2);

    atualizarContador();
}

function remover(index) {
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    renderizarCarrinho();
    mostrarToast("❌ Item removido");
}

function mostrarToast(msg) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = msg;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

window.onload = function () {
    atualizarContador();
    renderizarCarrinho();
};