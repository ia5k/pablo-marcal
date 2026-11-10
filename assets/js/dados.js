/* ============================================================
   DADOS SEMENTE — imutáveis. O que o membro produz vive em estado.js
   ============================================================ */

export const LEGIONARIOS = [
  { numero: '505058', nome: 'Kayan Lopes', nascimento: '12/03/1996', telefone: '11987650001', cidade: 'Camboriú', uf: 'SC', igreja: 'Assembleia de Deus', area: 'Comunicação', entrada: '2021-03-12', pais: 'Brasil' },
  { numero: '505100', nome: 'Fernando Alves', nascimento: '05/07/1990', telefone: '11987650002', cidade: 'Balneário Camboriú', uf: 'SC', igreja: 'Igreja Batista Central', area: 'Gestão', entrada: '2020-08-02', pais: 'Brasil' },
  { numero: '505101', nome: 'Fernandes Rocha', nascimento: '23/11/1988', telefone: '11987650003', cidade: 'Itajaí', uf: 'SC', igreja: 'Assembleia de Deus', area: 'Vendas', entrada: '2019-05-19', pais: 'Brasil' },
  { numero: '505102', nome: 'Mariana Prado', nascimento: '17/01/1994', telefone: '11987650004', cidade: 'São Paulo', uf: 'SP', igreja: 'Igreja Videira', area: 'Marketing', entrada: '2022-01-10', pais: 'Brasil' },
  { numero: '505103', nome: 'Rafael Nunes', nascimento: '09/09/1992', telefone: '11987650005', cidade: 'São Paulo', uf: 'SP', igreja: 'Igreja Videira', area: 'Tecnologia', entrada: '2021-07-04', pais: 'Brasil' },
  { numero: '505104', nome: 'Camila Ferraz', nascimento: '30/04/1997', telefone: '11987650006', cidade: 'Curitiba', uf: 'PR', igreja: 'Igreja Batista Central', area: 'Design', entrada: '2023-02-14', pais: 'Brasil' },
  { numero: '505105', nome: 'Diego Martins', nascimento: '14/06/1991', telefone: '11987650007', cidade: 'Curitiba', uf: 'PR', igreja: 'Assembleia de Deus', area: 'Logística', entrada: '2020-11-30', pais: 'Brasil' },
  { numero: '505106', nome: 'Bianca Souza', nascimento: '02/12/1995', telefone: '11987650008', cidade: 'Belo Horizonte', uf: 'MG', igreja: 'Igreja da Cidade', area: 'Jurídico', entrada: '2022-09-08', pais: 'Brasil' },
  { numero: '505107', nome: 'Thiago Barreto', nascimento: '21/08/1989', telefone: '11987650009', cidade: 'Belo Horizonte', uf: 'MG', igreja: 'Igreja da Cidade', area: 'Finanças', entrada: '2019-12-01', pais: 'Brasil' },
  { numero: '505108', nome: 'Larissa Mendes', nascimento: '11/10/1998', telefone: '11987650010', cidade: 'Brasília', uf: 'DF', igreja: 'Igreja Nova Vida', area: 'Comunicação', entrada: '2023-06-20', pais: 'Brasil' }
];

/* Base extra só para o sorteio de conversa — sem senha cadastrada */
export const CONTATOS = [
  { numero: '700112', nome: 'Brasil I BC', tipo: 'grupo', pais: 'Brasil' },
  { numero: '700113', nome: 'Argentina I TL', tipo: 'grupo', pais: 'Argentina' },
  { numero: '700114', nome: 'Colômbia I TL', tipo: 'grupo', pais: 'Colômbia' },
  { numero: '505101', nome: 'Fernandes Rocha', tipo: 'pessoa', pais: 'Brasil' },
  { numero: '505100', nome: 'Fernando Alves', tipo: 'pessoa', pais: 'Brasil' },
  { numero: '505104', nome: 'Camila Ferraz', tipo: 'pessoa', pais: 'Brasil' }
];

export const IGREJAS = [
  { id: 'ig1', nome: 'Assembleia de Deus', endereco: 'R. das Palmeiras, 340 — Centro', cidade: 'Camboriú', uf: 'SC', km: 5.1, horarios: 'Sáb. 19h até 21h30', pais: 'Brasil' },
  { id: 'ig2', nome: 'Igreja Batista Central', endereco: 'Av. Brasil, 1200 — Centro', cidade: 'Balneário Camboriú', uf: 'SC', km: 7.4, horarios: 'Dom. 9h e 18h', pais: 'Brasil' },
  { id: 'ig3', nome: 'Igreja Videira', endereco: 'R. Sete de Setembro, 88', cidade: 'Itajaí', uf: 'SC', km: 12.8, horarios: 'Dom. 10h e 19h', pais: 'Brasil' },
  { id: 'ig4', nome: 'Igreja da Cidade', endereco: 'R. XV de Novembro, 450', cidade: 'Camboriú', uf: 'SC', km: 3.2, horarios: 'Qua. 20h · Dom. 18h', pais: 'Brasil' },
  { id: 'ig5', nome: 'Comunidade Nova Vida', endereco: 'Av. Atlântica, 2100', cidade: 'Balneário Camboriú', uf: 'SC', km: 9.6, horarios: 'Sáb. 20h', pais: 'Brasil' },
  { id: 'ig6', nome: 'Igreja Presbiteriana Central', endereco: 'R. Blumenau, 77', cidade: 'Itajaí', uf: 'SC', km: 15.3, horarios: 'Dom. 9h30 e 19h', pais: 'Brasil' },
  { id: 'ig7', nome: 'Assembleia de Deus — Missão', endereco: 'R. Bento Gonçalves, 512', cidade: 'Camboriú', uf: 'SC', km: 4.7, horarios: 'Ter. 19h30 · Dom. 18h', pais: 'Brasil' },
  { id: 'ig8', nome: 'Igreja Batista Renovada', endereco: 'Av. do Estado, 3001', cidade: 'Itajaí', uf: 'SC', km: 18.2, horarios: 'Dom. 18h30', pais: 'Brasil' },
  { id: 'ig9', nome: 'Igreja O Brasil para Cristo', endereco: 'R. das Acácias, 15', cidade: 'Camboriú', uf: 'SC', km: 6.9, horarios: 'Qui. 20h', pais: 'Brasil' },
  { id: 'ig10', nome: 'Igreja Universal', endereco: 'R. São João, 220', cidade: 'Balneário Camboriú', uf: 'SC', km: 8.1, horarios: 'Seg. a Sex. 19h', pais: 'Brasil' },
  { id: 'ig11', nome: 'Igreja Metodista', endereco: 'R. Paraná, 940', cidade: 'Itajaí', uf: 'SC', km: 14.0, horarios: 'Dom. 10h', pais: 'Brasil' },
  { id: 'ig12', nome: 'Comunidade Cristã Vida', endereco: 'R. Ipê Amarelo, 61', cidade: 'Camboriú', uf: 'SC', km: 5.8, horarios: 'Sáb. 19h', pais: 'Brasil' }
];

export const CATEGORIAS = ['Camisetas', 'Bonés', 'Pulseiras', 'Bandana', 'Copo'];

export const PRODUTOS = [
  { id: 'p1', nome: 'Camiseta Militar Preta', preco: 129.9, categoria: 'Camisetas', variacoes: ['P', 'M', 'G', 'GG'], tag: 'Novo', destaque: 1, vendidos: 320 },
  { id: 'p2', nome: 'Camiseta Branca Essencial', preco: 119.9, categoria: 'Camisetas', variacoes: ['P', 'M', 'G'], tag: '', destaque: 4, vendidos: 210 },
  { id: 'p3', nome: 'Camiseta Laranja Operação', preco: 139.9, categoria: 'Camisetas', variacoes: ['M', 'G', 'GG'], tag: 'Exclusivo', destaque: 0, vendidos: 480 },
  { id: 'p4', nome: 'Boné Preto Aba Reta', preco: 89.9, categoria: 'Bonés', variacoes: ['Único'], tag: '', destaque: 3, vendidos: 190 },
  { id: 'p5', nome: 'Boné Trucker Laranja', preco: 99.9, categoria: 'Bonés', variacoes: ['Único'], tag: 'Novo', destaque: 5, vendidos: 140 },
  { id: 'p6', nome: 'Pulseira Couro Legionário', preco: 49.9, categoria: 'Pulseiras', variacoes: ['Único'], tag: '', destaque: 6, vendidos: 610 },
  { id: 'p7', nome: 'Pulseira Silicone Marca', preco: 29.9, categoria: 'Pulseiras', variacoes: ['Único'], tag: '', destaque: 8, vendidos: 720 },
  { id: 'p8', nome: 'Bandana Mar Honra', preco: 59.9, categoria: 'Bandana', variacoes: ['Único'], tag: 'Exclusivo', destaque: 2, vendidos: 260 },
  { id: 'p9', nome: 'Bandana Preta Logo', preco: 54.9, categoria: 'Bandana', variacoes: ['Único'], tag: '', destaque: 7, vendidos: 175 },
  { id: 'p10', nome: 'Copo Térmico 500ml', preco: 109.9, categoria: 'Copo', variacoes: ['Preto', 'Laranja'], tag: 'Novo', destaque: 9, vendidos: 130 },
  { id: 'p11', nome: 'Camiseta Regata Treino', preco: 99.9, categoria: 'Camisetas', variacoes: ['P', 'M', 'G'], tag: '', destaque: 10, vendidos: 95 },
  { id: 'p12', nome: 'Boné Cinza Logo Bordado', preco: 94.9, categoria: 'Bonés', variacoes: ['Único'], tag: '', destaque: 11, vendidos: 88 }
];

export const EVENTOS = [
  { id: 'e1', titulo: 'Baileiro, Camboriú', kicker: 'Evento do Consulado', data: '2026-12-05', hora: '20:00', local: 'Camboriú, SC', descricao: 'Três dias de imersão com a liderança, música e formação. Traga sua bandeira e seu número.', status: 'Disponível', destaque: true },
  { id: 'e2', titulo: 'Encontro Nacional de Igrejas', kicker: 'Comunidade', data: '2026-11-22', hora: '09:00', local: 'São Paulo, SP', descricao: 'Um dia inteiro com pastores e líderes das igrejas parceiras. Vagas abertas para todos os legionários.', status: 'Disponível', destaque: false },
  { id: 'e3', titulo: 'Imersão Legionários 2027', kicker: 'Formação', data: '2027-01-15', hora: '18:30', local: 'Balneário Camboriú, SC', descricao: 'A imersão anual. Quatro dias de formação intensiva, com hospedagem e alimentação incluídas.', status: 'Em breve', destaque: false },
  { id: 'e4', titulo: 'Culto de Ação de Graças', kicker: 'Igrejas', data: '2026-11-30', hora: '19:00', local: 'Itajaí, SC', descricao: 'Celebração aberta a toda a comunidade, com participação dos grupos de louvor das igrejas parceiras.', status: 'Disponível', destaque: false },
  { id: 'e5', titulo: 'Encontro de Negócios', kicker: 'Networking', data: '2026-12-18', hora: '19:30', local: 'Curitiba, PR', descricao: 'Rodada de conexões entre legionários que empreendem. Traga seu pitch de dois minutos.', status: 'Encerrado', destaque: false }
];

export const FAQ = [
  { id: 'f1', pergunta: 'Qual a importância do trabalho em equipe?', resposta: 'O trabalho em equipe é essencial para o sucesso de qualquer empreendimento. Além de potencializar as habilidades individuais, ele promove a colaboração, a comunicação e a sinergia entre os membros.' },
  { id: 'f2', pergunta: 'Qual a importância da inovação?', resposta: 'A inovação é fundamental para o crescimento e a sustentabilidade das organizações. Ela permite a criação de novos produtos, serviços e processos que atendam às necessidades em constante evolução do mercado.' },
  { id: 'f3', pergunta: 'O que significa ser um Legionário?', resposta: 'Ser Legionário é pertencer a uma comunidade que se reconhece pelo número, pela conduta e pelo serviço. Não é um título — é um compromisso com as pessoas ao redor.' },
  { id: 'f4', pergunta: 'Como funciona o número de legionário?', resposta: 'O número é único, vem do cadastro oficial da comunidade e acompanha você em tudo dentro do app. Ele identifica, não classifica: não existem níveis nem hierarquia.' },
  { id: 'f5', pergunta: 'Por que a comunhão entre igrejas importa?', resposta: 'Porque nenhuma igreja é forte sozinha. O diretório existe para que um legionário encontre uma casa perto de onde está, em qualquer cidade do país.' },
  { id: 'f6', pergunta: 'Como participo dos encontros?', resposta: 'Todo encontro aparece na aba Início. Abra o evento e toque em "Vou participar" — sua presença fica registrada e você pode adicionar à sua agenda na hora.' },
  { id: 'f7', pergunta: 'Como entro em contato com a liderança?', resposta: 'Pela aba de conversas, procurando a equipe pelo nome, ou pelo canal oficial indicado no rodapé do app.' },
  { id: 'f8', pergunta: 'O app guarda meus dados?', resposta: 'Só o necessário para você usar a comunidade: identificação, contato e preferências. Nada é compartilhado com terceiros, e você pode falar com a equipe a qualquer momento.' }
];

export const CONVERSAS = [
  { id: 'c1', contato: '700112', nome: 'Brasil I BC', tipo: 'grupo', pais: 'Brasil', mensagens: [{ de: 'outro', autor: 'Kayan Lopes', texto: 'Como foi o evento?', em: '2026-11-09T18:22:00' }] },
  { id: 'c2', contato: '700113', nome: 'Argentina I TL', tipo: 'grupo', pais: 'Argentina', mensagens: [{ de: 'outro', autor: 'Kayan Lopes', texto: 'Como foi o evento?', em: '2026-11-09T15:10:00' }] },
  { id: 'c3', contato: '505101', nome: 'Fernandes Rocha', tipo: 'pessoa', pais: 'Brasil', mensagens: [{ de: 'outro', autor: 'Fernandes', texto: 'Como foi o evento?', em: '2026-11-08T21:04:00' }] },
  { id: 'c4', contato: '700114', nome: 'Colômbia I TL', tipo: 'grupo', pais: 'Colômbia', mensagens: [{ de: 'outro', autor: 'Kayan Lopes', texto: 'Como foi o evento?', em: '2026-11-08T11:35:00' }] },
  { id: 'c5', contato: '505100', nome: 'Fernando Alves', tipo: 'pessoa', pais: 'Brasil', mensagens: [{ de: 'outro', autor: 'Fernando', texto: 'Como foi o evento?', em: '2026-11-07T09:12:00' }] },
  { id: 'c6', contato: '505104', nome: 'Camila Ferraz', tipo: 'pessoa', pais: 'Brasil', mensagens: [{ de: 'eu', autor: 'Você', texto: 'Como foi o evento?', em: '2026-11-06T19:47:00' }] }
];

export const MENSAGEM_DESTAQUE = {
  titulo: 'Amor, Honra, Unidade',
  kicker: 'Chefe Putzu',
  youtube: ''
};

export const ATALHOS = [
  { id: 'sobre', rotulo: 'Sobre', icone: 'flag', rota: '#/sobre' },
  { id: 'loja', rotulo: 'Loja', icone: 'bag', rota: '#/loja' },
  { id: 'networking', rotulo: 'Networking', icone: 'users', rota: '#/em-breve/networking' },
  { id: 'social', rotulo: 'Social', icone: 'message', rota: '#/em-breve/social' },
  { id: 'igrejas', rotulo: 'Igrejas', icone: 'shield', rota: '#/igrejas' },
  { id: 'ranking', rotulo: 'Ranking', icone: 'sparkle', rota: '#/em-breve/ranking' }
];

export const PROMESSAS = { networking: 'Um diretório de legionários por cidade e área, com conversa direta.', social: 'O mural oficial da liderança, com avisos e conteúdos.', ranking: 'O pódio de engajamento por país e por igreja.' };
