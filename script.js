// Seleção de elementos do DOM
const form = document.getElementById('vendaForm');
const previewDiv = document.getElementById('preview');
const tabelaCorpo = document.querySelector('#tabelaVendas tbody');

// --- 1. LÓGICA DE CÁLCULO AUTOMÁTICO (UX) ---
function atualizarCalculo() {
    const qtd = parseFloat(document.getElementById('quantidade').value) || 0;
    const valor = parseFloat(document.getElementById('valor_unitario').value) || 0;
    const parcelas = parseInt(document.getElementById('parcelas').value) || 1;

    const total = qtd * valor;
    const valorParcela = total / parcelas;

    previewDiv.innerHTML = `
        <strong>Total:</strong> R$ ${total.toLocaleString('pt-BR', {minimumFractionDigits: 2})} | 
        <strong>Parcelas:</strong> ${parcelas > 1 ? parcelas + 'x de R$ ' + valorParcela.toLocaleString('pt-BR', {minimumFractionDigits: 2}) : 'À vista'}
    `;
}

// Ouvintes para atualizar o cálculo em tempo real
document.getElementById('quantidade').addEventListener('input', atualizarCalculo);
document.getElementById('valor_unitario').addEventListener('input', atualizarCalculo);
document.getElementById('parcelas').addEventListener('change', atualizarCalculo);


// --- 2. FUNÇÃO PARA SALVAR NO SUPABASE ---
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = document.getElementById('btnSalvar');
    btn.innerText = "Salvando...";
    btn.disabled = true;

    const dadosVenda = {
        cliente: document.getElementById('cliente').value,
        produto: document.getElementById('produto').value,
        quantidade: parseInt(document.getElementById('quantidade').value),
        valor_unitario: parseFloat(document.getElementById('valor_unitario').value),
        parcelas: parseInt(document.getElementById('parcelas').value)
    };

    const { data, error } = await su
        .from('vendas')
        .insert([dadosVenda]);

    if (error) {
        alert("Erro ao salvar: " + error.message);
        btn.innerText = "Salvar Venda";
        btn.disabled = false;
    } else {
        alert("Venda registrada com sucesso!");
        form.reset();
        atualizarCalculo();
        
        // Redireciona para a página de vendas após salvar
        window.location.href = 'vendas.html';
    }
});


// --- 3. FUNÇÃO PARA LISTAR VENDAS (Na index, caso ainda queira mostrar lá) ---
async function carregarVendas() {
    if(!tabelaCorpo) return; // Evita erro se a tabela não existir na index.html

    const { data, error } = await su
        .from('vendas')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5); // Mostra apenas as últimas 5 na página inicial

    if (error) {
        console.error("Erro ao buscar dados:", error);
        return;
    }

    tabelaCorpo.innerHTML = '';

    data.forEach(venda => {
        const total = venda.quantidade * venda.valor_unitario;
        const dataFormatada = new Date(venda.created_at).toLocaleDateString('pt-BR');
        const detalheParcela = venda.parcelas > 1 ? `${venda.parcelas}x` : 'À vista';

        const linha = `
            <tr>
                <td data-label="Data">${dataFormatada}</td>
                <td data-label="Cliente">${venda.cliente}</td>
                <td data-label="Produto">${venda.produto}</td>
                <td data-label="Parcelas">${detalheParcela}</td>
                <td data-label="Total">R$ ${total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
            </tr>
        `;
        tabelaCorpo.innerHTML += linha;
    });
}

// Iniciar carregando os dados ao abrir a página
carregarVendas();