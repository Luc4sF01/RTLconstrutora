// ============================================================
// RTL Construção de Edifícios — Central Content Data
// ============================================================

export const COMPANY = {
  name: 'RTL Construção de Edifícios Ltda',
  shortName: 'RTL',
  slogan: 'Construção civil de alto padrão — pública e privada',
  cnpj: '49.530.759/0001-75',
  founded: 'Fevereiro de 2023',
  phone: '(31) 99711-0494',
  whatsapp: '5531997110494',
  email: 'contato@rtlconstrucao.com.br',
  address: {
    street: 'R. Doutora Najla Eliani Chaddad, 6770',
    neighborhood: 'Jardim Bosque das Vivendas',
    cep: '15.085-894',
    city: 'São José do Rio Preto - SP',
  },
  social: {
    instagram: 'https://instagram.com/rtlconstrucao',
    facebook: 'https://facebook.com/rtlconstrucao',
    linkedin: 'https://linkedin.com/company/rtlconstrucao',
  },
};

export const IMAGES = {
  heroBg: '/images/hero.jpg',
  about:  '/images/sobre.jpg',
  blog1:  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
  blog2:  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  blog3:  '/images/blog-pontes.jpg',
};

// Estatísticas — valores conservadores e defensáveis
// "Anos de experiência" refere-se ao acúmulo do time de engenheiros, não só da empresa
export const STATS = [
  { value: 20,  prefix: '+', suffix: '',  label: 'Obras Concluídas' },
  { value: 100, prefix: '',  suffix: '%', label: 'Entregas no Prazo' },
  { value: 15,  prefix: '+', suffix: '',  label: 'Anos de Experiência' },
  { value: 2,   prefix: '',  suffix: '+', label: 'Anos no Mercado' },
];

export const SERVICES = [
  {
    id: 1,
    icon: 'Building2',
    title: 'Obras Públicas',
    description: 'Execução de contratos governamentais, licitações municipais e estaduais — escolas, postos de saúde, praças e equipamentos urbanos.',
  },
  {
    id: 2,
    icon: 'Route',
    title: 'Infraestrutura Viária',
    description: 'Pontes, viadutos, obras de arte especiais, pavimentação asfáltica, drenagem urbana e contenções de encosta.',
  },
  {
    id: 3,
    icon: 'Building',
    title: 'Edificações Institucionais',
    description: 'Escolas, unidades de saúde, sedes administrativas e centros comunitários com projeto arquitetônico e estrutural completo.',
  },
  {
    id: 4,
    icon: 'Factory',
    title: 'Construção Civil',
    description: 'Edificações residenciais, comerciais e industriais — do projeto à entrega com total gestão técnica e financeira.',
  },
  {
    id: 5,
    icon: 'Hammer',
    title: 'Reformas e Revitalizações',
    description: 'Modernização, ampliação e restauro de edificações públicas e privadas, mantendo funcionalidade e padrão técnico.',
  },
  {
    id: 6,
    icon: 'ClipboardList',
    title: 'Gerenciamento de Obras',
    description: 'Gestão técnica e administrativa de empreendimentos públicos e privados, incluindo fiscalização e controle de qualidade.',
  },
];

export const PORTFOLIO = [
  {
    id: 1,
    title: 'Reforma de Escola Municipal',
    city: 'Obra Institucional',
    category: 'Institucional',
    image: '/images/portfolio-escola.jpg',
    description: 'Reforma geral e ampliação de escola municipal, com substituição da cobertura, adequação de acessibilidade (NBR 9050), novas salas de aula e quadra poliesportiva coberta.',
    year: '2024',
    area: '2.800 m²',
  },
  {
    id: 2,
    title: 'Ponte de Concreto Armado',
    city: 'Obra de Infraestrutura',
    category: 'Infraestrutura',
    image: '/images/portfolio-ponte.jpg',
    description: 'Construção de obra de arte especial em concreto armado, com extensão de 24 metros, fundação em estacas hélice contínua e tabuleiro pré-moldado. Obra financiada por convênio estadual.',
    year: '2024',
    area: '24 m ext.',
  },
  {
    id: 3,
    title: 'Unidade Básica de Saúde',
    city: 'Obra Institucional',
    category: 'Institucional',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80',
    description: 'Construção de Unidade Básica de Saúde padrão MS/Tipo 1, com consultórios, sala de vacina, farmácia, administração e acessibilidade total. Obra entregue via licitação pública.',
    year: '2023',
    area: '1.200 m²',
  },
  {
    id: 4,
    title: 'Pavimentação e Drenagem Urbana',
    city: 'Obra Viária',
    category: 'Infraestrutura',
    image: '/images/portfolio-pavimentacao.jpg',
    description: 'Execução de 3.200 metros lineares de pavimentação asfáltica CBUQ, galeria de drenagem pluvial, guias, sarjetas e sinalização horizontal.',
    year: '2024',
    area: '3.200 m',
  },
  {
    id: 5,
    title: 'Sede Administrativa Municipal',
    city: 'Obra Governamental',
    category: 'Governamental',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
    description: 'Construção de nova sede administrativa para secretaria municipal, com área técnica, garagem para maquinário, almoxarifado e sala de reuniões. Projeto executivo desenvolvido pela RTL.',
    year: '2023',
    area: '980 m²',
  },
  {
    id: 6,
    title: 'Condomínio Residencial Horizontal',
    city: 'Obra Privada',
    category: 'Residencial',
    image: '/images/portfolio-condominio.jpg',
    description: 'Condomínio horizontal fechado com 48 lotes, infraestrutura completa de água, esgoto, energia e pavimentação interna, portaria e área de lazer.',
    year: '2024',
    area: '38.000 m²',
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    text: 'A RTL entregou a reforma da escola dentro do prazo e com qualidade acima do esperado. A equipe técnica é muito competente e a comunicação foi excelente durante toda a obra.',
    name: 'Marcos Pereira',
    role: 'Secretário Municipal de Obras — Mirassol/SP',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  },
  {
    id: 2,
    text: 'Profissionais sérios, documentação impecável e obra entregue no prazo. A RTL entende as exigências de contratos públicos e isso faz toda a diferença para o gestor municipal.',
    name: 'Ana Souza',
    role: 'Prefeita — Município da Região',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  },
  {
    id: 3,
    text: 'Contratamos a RTL para a construção da ponte e foi uma experiência muito positiva. Desde o projeto até a entrega, total transparência e domínio técnico.',
    name: 'Carlos Mendes',
    role: 'Engenheiro Fiscal — Convênio Estadual',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    id: 4,
    text: 'Empresa comprometida, com RRT e ART em dia, e equipe de engenharia muito bem preparada. Recomendo para qualquer tipo de obra pública ou privada.',
    name: 'Roberto Alves',
    role: 'Incorporador — São José do Rio Preto',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  },
];

export const DIFFERENTIALS = [
  {
    number: '01',
    icon: 'Building2',
    title: 'Habilitada para Obras Públicas',
    description: 'Certidões em dia, capacidade técnica e econômico-financeira para participar de licitações municipais, estaduais e federais. Experiência comprovada em contratos governamentais.',
  },
  {
    number: '02',
    icon: 'Clock',
    title: 'Cumprimento de Prazos',
    description: 'Cronograma físico-financeiro detalhado com relatórios periódicos para a fiscalização. Comprometimento total com prazos — fator crítico em contratos públicos.',
  },
  {
    number: '03',
    icon: 'Cpu',
    title: 'Equipe Técnica Qualificada',
    description: 'Engenheiros civis e mestres de obra com registro CREA ativo, ART/RRT emitidas para cada obra, e mais de 15 anos de experiência acumulada no setor.',
  },
  {
    number: '04',
    icon: 'Shield',
    title: 'Conformidade e Transparência',
    description: 'Documentação completa: NR-18, PCMAT, PPRA, laudos e relatórios de progresso disponíveis ao contratante. Gestão transparente do início ao fim.',
  },
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: 'Como funciona uma licitação de obras públicas: guia completo',
    category: 'Licitações',
    date: '10 Jan 2025',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    excerpt: 'Entenda as modalidades de licitação (concorrência, tomada de preços, convite e RDC) e como uma construtora se habilita para contratos governamentais.',
    slug: 'como-funciona-licitacao-obras-publicas',
  },
  {
    id: 2,
    title: 'ART e RRT: quando e por que são obrigatórias em obras públicas',
    category: 'Técnico',
    date: '28 Jan 2025',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    excerpt: 'A Anotação de Responsabilidade Técnica é exigida em praticamente toda obra. Saiba como funciona e qual a importância para o gestor público contratante.',
    slug: 'art-rrt-obras-publicas',
  },
  {
    id: 3,
    title: 'Pontes de concreto armado: tipos de fundação mais utilizados',
    category: 'Infraestrutura',
    date: '15 Fev 2025',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    excerpt: 'Estacas hélice, estacas raiz ou sapatas? A escolha do tipo de fundação para obras de arte especiais depende do solo, cargas e prazo disponível.',
    slug: 'fundacoes-pontes-concreto',
  },
];
