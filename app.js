// ===== VARIÁVEIS FIXAS DO MODAL =====
const btnCriar = document.getElementById('btn-criar-duvida'); // Botão principal para criar dúvida
const modal = document.getElementById('modal-duvida'); // O modal inteiro
const duvidasSalvas = document.getElementById('duvidas-salvas'); // Área das dúvidas salvas
const textoFundo = document.getElementById('texto-fundo'); // Texto de fundo quando não há dúvidas

// ===== FUNÇÃO PARA FECHAR O MODAL =====
function fecharModal() {
    modal.style.display = 'none'; // Esconde o modal

    // Remove links e botões temporários se existirem
    const containerLinks = document.getElementById('container-links');
    if (containerLinks) containerLinks.remove();
    const btnSalvarExistente = document.getElementById('btn-salvar-duvida');
    if (btnSalvarExistente) btnSalvarExistente.remove();
}

// ===== FUNÇÃO PARA CRIAR O FORMULÁRIO DE NOVA DÚVIDA =====
function criarFormularioNovaDuvida() {
    const modalConteudo = modal.querySelector('.modal-conteudo'); // Conteúdo interno do modal

    // Cria o HTML do formulário novamente do zero
    modalConteudo.innerHTML = `
        <h3>Criar Nova Dúvida</h3>
        <label for="materia">Matéria:</label>
        <select id="materia">
            <option value="">Selecione a matéria</option>
            <option value="Matemática">Matemática</option>
                <option value="Português">Português</option>
                <option value="Ciências">Ciências</option>
                <option value="História">História</option>
                <option value="Geografia">Geografia</option>
                <option value="Biologia">Biologia</option>
                <option value="Quimica">Química</option>
                <option value="Fisica">Física</option>
                <option value="Sociologia">Sociologia</option>
                <option value="Filosofia">Filosofia</option>
                <option value="Ingles">Inglês</option>
        </select>
        <label for="detalhes">Detalhes da dúvida:</label>
        <textarea id="detalhes" placeholder="Descreva sua dúvida..."></textarea>
        <div class="modal-botoes">
            <button id="btn-enviar">Enviar</button>
            <button id="btn-voltar">Voltar</button>
        </div>
    `;

    // Reatribui as referências (porque o conteúdo foi recriado)
    const materiaSelect = document.getElementById('materia');
    const detalhesInput = document.getElementById('detalhes');
    const btnVoltar = document.getElementById('btn-voltar');
    const btnEnviar = document.getElementById('btn-enviar');

    // === EVENTO DO BOTÃO VOLTAR ===
    btnVoltar.addEventListener('click', fecharModal);

    // === EVENTO DO BOTÃO ENVIAR ===
    btnEnviar.addEventListener('click', () => {
        const materia = materiaSelect.value;
        const detalhes = detalhesInput.value.trim();

        // Validação dos campos
        if (!materia || !detalhes) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        // Lista base de sites confiáveis (sempre aparecem)
const sitesConfiaveis = [
    { nome: "YouTube", url: `https://www.youtube.com/results?search_query=${encodeURIComponent(detalhes)}` },
    { nome: "Brasil Escola", url: `https://brasilescola.uol.com.br/busca/?q=${encodeURIComponent(detalhes)}` },
    { nome: "Mundo Educação", url: `https://mundoeducacao.uol.com.br/busca/?q=${encodeURIComponent(detalhes)}` },
];

    // Adiciona o Khan Academy somente se for Matemática ou Português
if (materia === "Matemática" || materia === "Português") {
    sitesConfiaveis.push({
        nome: "Khan Academy",
        url: `https://pt.khanacademy.org/search?page_search_query=${encodeURIComponent(detalhes)}`
    });
}

        // Cria ou limpa o container de links
        let containerLinks = document.getElementById('container-links');
        if (!containerLinks) {
            containerLinks = document.createElement('div');
            containerLinks.id = 'container-links';
            containerLinks.style.marginTop = '10px';
            modalConteudo.appendChild(containerLinks);
        }
        containerLinks.innerHTML = '';

        // Mostra os links confiáveis
        sitesConfiaveis.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.target = "_blank";
            a.textContent = link.nome;
            a.style.display = "block";
            containerLinks.appendChild(a);
        });

        // Cria o botão de salvar
        let btnSalvar = document.getElementById('btn-salvar-duvida');
        if (!btnSalvar) {
            btnSalvar = document.createElement('button');
            btnSalvar.id = 'btn-salvar-duvida';
            btnSalvar.textContent = "Salvar Dúvida";
            btnSalvar.style.marginTop = "10px";
            modalConteudo.appendChild(btnSalvar);
        }

        // === EVENTO DE SALVAR DÚVIDA ===
        btnSalvar.onclick = () => {
            // Pega os valores fixos no momento do clique
            const materiaFix = materiaSelect.value;
            const detalhesFix = detalhesInput.value.trim();

            // Cria a div da dúvida salva
            const divDuvida = document.createElement('div');
            divDuvida.className = 'duvida-salva';
            divDuvida.dataset.links = JSON.stringify(sitesConfiaveis);
            divDuvida.innerHTML = `
                <h4>${materiaFix}</h4>
                <p>${detalhesFix}</p>
            `;
            duvidasSalvas.appendChild(divDuvida);

            // Esconde o texto de fundo
            textoFundo.style.display = 'none';

            // Fecha o modal e limpa o conteúdo
            fecharModal();

            // === PERMITE ABRIR DÚVIDAS SALVAS ===
            divDuvida.addEventListener('click', () => {
                modal.style.display = 'flex';
                const modalConteudo = modal.querySelector('.modal-conteudo');
                modalConteudo.innerHTML = '';

                // Exibe o conteúdo salvo
                const h4 = document.createElement('h4');
                h4.textContent = materiaFix;
                const p = document.createElement('p');
                p.textContent = detalhesFix;
                modalConteudo.appendChild(h4);
                modalConteudo.appendChild(p);

                // Recria os links
                const containerLinks = document.createElement('div');
                containerLinks.id = 'container-links';
                containerLinks.style.marginTop = '10px';
                modalConteudo.appendChild(containerLinks);

                const linksSalvos = JSON.parse(divDuvida.dataset.links);
                linksSalvos.forEach(link => {
                    const a = document.createElement('a');
                    a.href = link.url;
                    a.target = "_blank";
                    a.textContent = link.nome;
                    a.style.display = "block";
                    containerLinks.appendChild(a);
                });

                // Botão "Voltar" no modo de visualização
                const btnVoltarClone = document.createElement('button');
                btnVoltarClone.textContent = "Voltar";
                btnVoltarClone.classList.add('btn-voltar-clone');
                btnVoltarClone.style.cssText = `
                    padding: 8px 16px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    background-color: #7248e8;
                    color: white;
                    font-weight: bold;
                    transition: 0.3s;
                    margin-top: 10px;
                `;
                btnVoltarClone.onmouseover = () => btnVoltarClone.style.backgroundColor = "#875ae0";
                btnVoltarClone.onmouseout = () => btnVoltarClone.style.backgroundColor = "#7248e8";
                btnVoltarClone.addEventListener('click', fecharModal);
                modalConteudo.appendChild(btnVoltarClone);
            });
        };
    });
}

// ===== EVENTO DO BOTÃO PRINCIPAL "CRIAR NOVA DÚVIDA" =====
btnCriar.addEventListener('click', () => {
    criarFormularioNovaDuvida(); // Cria o formulário do zero
    modal.style.display = 'flex'; // Exibe o modal
});
