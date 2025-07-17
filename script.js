class WikipediaComparator {
    constructor() {
        this.modalOverlay = document.getElementById('modal-overlay');
        this.modalTitulo = document.getElementById('modal-titulo');
        this.modalCorpo = document.getElementById('modal-corpo');
        this.botaoFechar = document.getElementById('botao-fechar');
        
        this.assuntos = {
            historia: {
                titulo: 'Segunda Guerra Mundial',
                subtitulo: 'História - Conflito Global'
            }
        };
        
        this.inicializar();
    }
    
    inicializar() {
        this.configurarEventos();
        this.criarAnimacoes();
    }
    
    configurarEventos() {
        const botoesOpcao = document.querySelectorAll('.botao-opcao');
        
        botoesOpcao.forEach(botao => {
            botao.addEventListener('click', (e) => {
                e.preventDefault();
                const cardAssunto = botao.closest('.card-assunto');
                const assunto = cardAssunto.dataset.assunto;
                const tipo = botao.dataset.tipo;
                
                this.abrirModal(assunto, tipo);
            });
        });
        
        this.botaoFechar.addEventListener('click', () => {
            this.fecharModal();
        });
        
        this.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.modalOverlay) {
                this.fecharModal();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.fecharModal();
            }
        });
    }
    
    abrirModal(assunto, tipo) {
        const dadosAssunto = this.assuntos[assunto];
        
        if (tipo === 'atual') {
            this.modalTitulo.textContent = `${dadosAssunto.titulo} - Layout Atual`;
            this.modalCorpo.innerHTML = this.criarLayoutAtual(assunto);
        } else {
            this.modalTitulo.textContent = `${dadosAssunto.titulo} - Layout Moderno`;
            this.modalCorpo.innerHTML = this.criarLayoutModerno(assunto);
        }
        
        this.modalOverlay.classList.add('ativo');
        document.body.style.overflow = 'hidden';
        
        this.configurarInteracoesModal();
    }
    
    fecharModal() {
        this.modalOverlay.classList.remove('ativo');
        document.body.style.overflow = 'auto';
    }
    
    criarLayoutAtual(assunto) {
        const dados = this.obterDadosAssunto(assunto);
        
        return `
            <div class="wikipedia-atual">
                <div class="barra-superior-atual">
                    <div class="logo-atual">
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiNmZmYiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjx0ZXh0IHg9IjEyIiB5PSIxNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzAwMCI+VzwvdGV4dD4KPC9zdmc+" alt="Wikipedia">
                        <span>Wikipedia</span>
                    </div>
                    <div class="navegacao-atual">
                        <a href="#" class="link-atual">Página principal</a>
                        <a href="#" class="link-atual">Mudanças recentes</a>
                        <a href="#" class="link-atual">Página aleatória</a>
                    </div>
                </div>
                
                <div class="corpo-atual">
                    <div class="sidebar-atual">
                        <div class="caixa-busca-atual">
                            <input type="text" placeholder="Pesquisar Wikipedia" class="input-busca-atual">
                            <button class="botao-busca-atual">Ir</button>
                        </div>
                        
                        <div class="menu-lateral-atual">
                            <h3>Navegação</h3>
                            <ul>
                                <li><a href="#">Página principal</a></li>
                                <li><a href="#">Conteúdo destacado</a></li>
                                <li><a href="#">Eventos atuais</a></li>
                                <li><a href="#">Página aleatória</a></li>
                            </ul>
                            
                            <h3>Participação</h3>
                            <ul>
                                <li><a href="#">Ajuda</a></li>
                                <li><a href="#">Café</a></li>
                                <li><a href="#">Portal comunitário</a></li>
                                <li><a href="#">Mudanças recentes</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="conteudo-atual">
                        <div class="titulo-artigo-atual">
                            <h1>${dados.titulo}</h1>
                        </div>
                        
                        <div class="tabs-atual">
                            <a href="#" class="tab-ativa">Artigo</a>
                            <a href="#" class="tab-inativa">Discussão</a>
                        </div>
                        
                        <div class="artigo-atual">
                            <div class="infobox-atual">
                                <div class="titulo-infobox">${dados.titulo}</div>
                                <div class="conteudo-infobox">
                                    ${dados.infobox.map(item => `<p><strong>${item.label}:</strong> ${item.valor}</p>`).join('')}
                                </div>
                            </div>
                            
                            <p><strong>${dados.titulo}</strong> ${dados.introducao}</p>
                            
                            ${dados.secoes.map(secao => `
                                <h2>${secao.titulo}</h2>
                                <p>${secao.conteudo}</p>
                                ${secao.lista ? `<ul>${secao.lista.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    criarLayoutModerno(assunto) {
        const dados = this.obterDadosAssunto(assunto);
        
        return `
            <div class="wikipedia-moderno">
                <div class="barra-superior-moderno">
                    <div class="logo-moderno">
                        <div class="icone-logo-moderno">
                            <i class="fas fa-globe"></i>
                        </div>
                        <span>Wikipedia</span>
                    </div>
                    
                    <div class="busca-moderno">
                        <div class="input-container-moderno">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Pesquisar em mais de 6 milhões de artigos..." class="input-busca-moderno">
                        </div>
                    </div>
                    
                    <div class="acoes-moderno">
                        <button class="botao-moderno">
                            <i class="fas fa-plus"></i>
                            Criar
                        </button>
                        <button class="botao-moderno secundario">
                            <i class="fas fa-user"></i>
                            Entrar
                        </button>
                    </div>
                </div>
                
                <div class="navegacao-moderno">
                    <nav class="nav-links-moderno">
                        <a href="#" class="nav-link-ativo">Página Principal</a>
                        <a href="#" class="nav-link">Explorar</a>
                        <a href="#" class="nav-link">Recentes</a>
                        <a href="#" class="nav-link">Comunidade</a>
                    </nav>
                </div>
                
                <div class="corpo-moderno">
                    <div class="container-conteudo-moderno">
                        <div class="breadcrumb-moderno">
                            <span>Início</span>
                            <i class="fas fa-chevron-right"></i>
                            <span>${dados.categoria}</span>
                            <i class="fas fa-chevron-right"></i>
                            <span>${dados.titulo}</span>
                        </div>
                        
                        <div class="artigo-moderno">
                            <div class="cabecalho-artigo-moderno">
                                <h1>${dados.titulo}</h1>
                                <div class="meta-artigo-moderno">
                                    <span class="tag-categoria">${dados.categoria}</span>
                                    <span class="status-artigo">Artigo em destaque</span>
                                </div>
                            </div>
                            
                            <div class="conteudo-artigo-moderno">
                                <div class="resumo-moderno">
                                    <div class="card-resumo">
                                        <div class="icone-resumo">
                                            <i class="${dados.icone}"></i>
                                        </div>
                                        <div class="texto-resumo">
                                            <h3>${dados.resumo.titulo}</h3>
                                            <p>${dados.resumo.texto}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="secao-moderno">
                                    <h2>Introdução</h2>
                                    <p>${dados.introducao}</p>
                                </div>
                                
                                <div class="grid-conteudo">
                                    ${dados.cards.map(card => `
                                        <div class="card-conteudo">
                                            <h3>${card.titulo}</h3>
                                            <p>${card.conteudo}</p>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    obterDadosAssunto(assunto) {
    const dadosAssuntos = {
        historia: {
            titulo: 'Segunda Guerra Mundial',
            categoria: 'História',
            icone: 'fas fa-globe',
            introducao: 'foi um conflito militar global que durou de 1939 a 1945, envolvendo a maioria das nações do mundo — incluindo todas as grandes potências — organizadas em duas alianças militares opostas: os Aliados e o Eixo.',
            resumo: {
                titulo: 'Conflito Global',
                texto: 'O maior conflito militar da história humana que moldou o mundo moderno'
            },
            infobox: [
                { label: 'Período', valor: '1939-1945' },
                { label: 'Participantes', valor: 'Mais de 70 países' },
                { label: 'Resultado', valor: 'Vitória dos Aliados' }
            ],
            secoes: [
                {
                    titulo: 'Causas',
                    conteudo: 'As causas da guerra incluem o expansionismo alemão, o fracasso da Liga das Nações, a Grande Depressão e o crescimento de regimes totalitários.'
                },
                {
                    titulo: 'Principais Eventos',
                    conteudo: 'Eventos marcantes incluem:',
                    lista: [
                        'Invasão da Polônia (1939)',
                        'Batalha da Grã-Bretanha (1940)',
                        'Ataque a Pearl Harbor (1941)',
                        'Operação Overlord (1944)'
                    ]
                }
            ],
            cards: [
                {
                    titulo: 'Frentes de Batalha',
                    conteudo: 'Combates simultâneos na Europa, África, Ásia e Pacífico criaram um conflito verdadeiramente global.'
                },
                {
                    titulo: 'Tecnologia Militar',
                    conteudo: 'Avanços em aviação, radar, comunicações e armas nucleares mudaram a natureza da guerra.'
                },
                {
                    titulo: 'Impacto Social',
                    conteudo: 'A guerra transformou sociedades inteiras, alterando papéis sociais e impulsionando mudanças econômicas.'
                }
            ]
        }
    };

    return dadosAssuntos[assunto];
}
    
    configurarInteracoesModal() {
        const inputBusca = this.modalCorpo.querySelector('.input-busca-atual, .input-busca-moderno');
        const links = this.modalCorpo.querySelectorAll('a');
        const botoes = this.modalCorpo.querySelectorAll('button');
        
        if (inputBusca) {
            inputBusca.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.mostrarNotificacao('Busca simulada: ' + inputBusca.value);
                }
            });
        }
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.mostrarNotificacao('Navegação simulada: ' + link.textContent);
            });
        });
        
        botoes.forEach(botao => {
            if (!botao.classList.contains('botao-fechar')) {
                botao.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.mostrarNotificacao('Ação simulada: ' + botao.textContent);
                });
            }
        });
    }
    
   
    
    criarAnimacoes() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .notificacao-temp {
                animation: slideIn 0.3s ease;
            }
            
            .conteudo-notificacao {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .conteudo-notificacao i {
                font-size: 1rem;
            }
            
            .card-assunto {
                cursor: pointer;
            }
            
            .botao-opcao {
                cursor: pointer;
            }
        `;
        
        document.head.appendChild(style);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WikipediaComparator();
});
