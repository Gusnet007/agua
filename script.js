// Variáveis
let consumoData = JSON.parse(localStorage.getItem('consumoData')) || { totalConsumido: 0, data: '' }; // Recupera os dados ou inicializa com 0
let capacidadeJarra = 2000; // 2 Litros = 2000ml
let historicoConsumo = JSON.parse(localStorage.getItem('historicoConsumo')) || []; // Recupera o histórico de consumo ou inicializa um array vazio

// Função para atualizar o consumo diário no localStorage
function atualizarLocalStorage() {
    // Salva o consumo atual e o histórico no localStorage
    localStorage.setItem('consumoData', JSON.stringify(consumoData));
    localStorage.setItem('historicoConsumo', JSON.stringify(historicoConsumo));
}

// Função para adicionar o consumo de água
function adicionarConsumo(quantidade) {
    // Adiciona o consumo
    consumoData.totalConsumido += quantidade;

    // Define a data atual no formato "YYYY-MM-DD"
    consumoData.data = new Date().toISOString().split('T')[0];

    // Atualiza o display do total consumido
    document.getElementById('total').textContent = `${consumoData.totalConsumido} ml`;

    // Calcula a altura da água baseada no consumo
    let alturaAgua = (consumoData.totalConsumido / capacidadeJarra) * 100; // Porcentagem da jarra cheia

    // Limita a altura da água a 100% (para que não ultrapasse 2L)
    if (alturaAgua > 100) {
        alturaAgua = 100;
    }

    // Atualiza a altura da água na jarra
    document.getElementById('agua').style.height = alturaAgua + '%';

    // Exibe a data do último consumo
    document.getElementById('data-consumo').textContent = `Última data de consumo: ${consumoData.data}`;

    // Alteração de classe de acordo com o consumo
    let statuSuficiente = document.getElementById('total');
    if (consumoData.totalConsumido >= 2000) {
        statuSuficiente.classList.remove("total");
        statuSuficiente.classList.add("suficiente");
    }

    // Atualiza o valor no localStorage
    atualizarLocalStorage();
}

// Função para verificar se mudou o dia e salvar o consumo diário
function verificarMudancaDeDia() {
    let dataAtual = new Date().toISOString().split('T')[0]; // Pega a data no formato "YYYY-MM-DD"
    let dataAnterior = consumoData.data; // A data está no formato "YYYY-MM-DD"

    if (dataAtual !== dataAnterior) {
        // Salva o consumo do dia anterior no histórico
        if (consumoData.totalConsumido > 0) {
            historicoConsumo.push({
                data: consumoData.data,
                totalConsumido: consumoData.totalConsumido
            });
        }

        // Reseta o consumo para o novo dia
        consumoData.totalConsumido = 0;
        consumoData.data = new Date().toISOString().split('T')[0]; // Atualiza a data para o novo dia

        // Atualiza o localStorage com o histórico e o consumo atual
        atualizarLocalStorage();
    }
}

// Função para recuperar o consumo e a data armazenada ao carregar a página
function recuperarConsumo() {
    // Atualiza a interface com o consumo recuperado
    document.getElementById('total').textContent = `${consumoData.totalConsumido} ml`;

    // Exibe a data do último consumo
    document.getElementById('data-consumo').textContent = consumoData.data ? `Última data de consumo: ${consumoData.data}` : 'Nenhuma ainda';

    // Atualiza a altura da água na jarra
    let alturaAgua = (consumoData.totalConsumido / capacidadeJarra) * 100;
    if (alturaAgua > 100) {
        alturaAgua = 100;
    }
    document.getElementById('agua').style.height = alturaAgua + '%';

    // Altera a classe de acordo com o consumo
    let statuSuficiente = document.getElementById('total');
    if (consumoData.totalConsumido >= 2000) {
        statuSuficiente.classList.remove("total");
        statuSuficiente.classList.add("suficiente");
    }
}

// Função para resetar o consumo e os dados no localStorage (salvando o histórico)
function resetarConsumo() {
    // Salva o consumo do dia atual no histórico antes de resetar
    if (consumoData.totalConsumido > 0) {
        historicoConsumo.push({
            data: consumoData.data,
            totalConsumido: consumoData.totalConsumido
        });
    }

    // Reseta os dados de consumo
    consumoData.totalConsumido = 0;
    consumoData.data = '';

    // Atualiza o display do total consumido
    document.getElementById('total').textContent = `${consumoData.totalConsumido} ml`;

    // Reseta a altura da água na jarra
    document.getElementById('agua').style.height = '0%';

    // Reseta a data do último consumo
    document.getElementById('data-consumo').textContent = 'Última data de consumo: Nenhuma ainda';

    // Remove a classe de "suficiente" se houver
    let statuSuficiente = document.getElementById('total');
    statuSuficiente.classList.remove("suficiente");
    statuSuficiente.classList.add("total");

    // Atualiza o localStorage com os dados resetados
    atualizarLocalStorage();
}

// Recupera o consumo e a data ao carregar a página
window.onload = function () {
    // Verifica se o dia mudou e atualiza os dados
    verificarMudancaDeDia();

    // Recupera o consumo armazenado
    recuperarConsumo();
};

console.log("Consumo recuperado:", consumoData);
console.log("Histórico recuperado:", historicoConsumo);

