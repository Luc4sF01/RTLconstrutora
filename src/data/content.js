// ============================================================
// RTL Construção de Edifícios — Central Content Data
// Edit this file to update texts, images, and all content
// ============================================================

export const COMPANY = {
  name: 'RTL Construção de Edifícios Ltda',
  shortName: 'RTL',
  slogan: 'Construindo com excelência desde 2023',
  cnpj: '49.530.759/0001-75',
  founded: 'Fevereiro de 2023',
  phone: '(17) 99999-9999',
  whatsapp: '5517999999999',
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
  heroBg: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80',
  about: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80',
  blog1: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
  blog2: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  blog3: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
};

export const STATS = [
  { value: 50, prefix: '+', suffix: '', label: 'Obras Entregues' },
  { value: 30, prefix: '+', suffix: 'mil m²', label: 'Construídos' },
  { value: 80, prefix: '+', suffix: '', label: 'Clientes Atendidos' },
  { value: 2, prefix: '', suffix: '+', label: 'Anos de Mercado' },
];

export const SERVICES = [
  {
    id: 1,
    icon: 'Building2',
    title: 'Construção Civil',
    description: 'Edificações residenciais e comerciais do projeto à entrega com excelência e qualidade.',
  },
  {
    id: 2,
    icon: 'Factory',
    title: 'Obras Industriais',
    description: 'Galpões, plantas fabris e infraestrutura industrial com tecnologia de ponta.',
  },
  {
    id: 3,
    icon: 'Hammer',
    title: 'Reformas e Ampliações',
    description: 'Modernização e expansão de estruturas existentes com total segurança.',
  },
  {
    id: 4,
    icon: 'Building',
    title: 'Incorporação Imobiliária',
    description: 'Desenvolvimento e lançamento de empreendimentos com retorno garantido.',
  },
  {
    id: 5,
    icon: 'ClipboardList',
    title: 'Gerenciamento de Obras',
    description: 'Gestão completa de cronograma, equipe e qualidade em todas as fases.',
  },
  {
    id: 6,
    icon: 'Route',
    title: 'Infraestrutura Viária',
    description: 'Construção de rodovias, ruas, praças e calçadas com alto padrão técnico.',
  },
];

export const PORTFOLIO = [
  {
    id: 1,
    title: 'Residencial Parque das Flores',
    city: 'São José do Rio Preto',
    category: 'Residencial',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    description: 'Conjunto residencial de alto padrão com 48 unidades, áreas de lazer completas e acabamento premium.',
    year: '2024',
    area: '8.500 m²',
  },
  {
    id: 2,
    title: 'Galpão Industrial Zona Norte',
    city: 'São José do Rio Preto',
    category: 'Industrial',
    image: 'https://images.unsplash.com/photo-1541976590-713941681591?w=800&q=80',
    description: 'Galpão industrial de 5.000 m² com docas, piso industrial de alta resistência e estrutura metálica.',
    year: '2024',
    area: '5.000 m²',
  },
  {
    id: 3,
    title: 'Vila Contemporânea',
    city: 'Mirassol',
    category: 'Alto Padrão',
    image: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&q=80',
    description: 'Complexo de casas de alto padrão com arquitetura contemporânea, piscinas e paisagismo exclusivo.',
    year: '2023',
    area: '3.200 m²',
  },
  {
    id: 4,
    title: 'Condomínio Jardins',
    city: 'São José do Rio Preto',
    category: 'Residencial',
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80',
    description: 'Condomínio fechado com 120 lotes, infraestrutura completa, portaria 24h e área verde preservada.',
    year: '2023',
    area: '45.000 m²',
  },
  {
    id: 5,
    title: 'Complexo Fabril',
    city: 'Bady Bassitt',
    category: 'Industrial',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    description: 'Planta industrial completa com 12.000 m², incluindo área administrativa, refeitório e utilidades.',
    year: '2024',
    area: '12.000 m²',
  },
  {
    id: 6,
    title: 'Mansão Reserva Verde',
    city: 'Cedral',
    category: 'Alto Padrão',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    description: 'Residência de luxo com 1.200 m², piscina aquecida, adega climatizada e automação residencial completa.',
    year: '2024',
    area: '1.200 m²',
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    text: 'Empresa séria, entregou antes do prazo. Qualidade excelente, recomendo a todos que buscam confiança e profissionalismo!',
    name: 'João Silva',
    role: 'Empresário',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  },
  {
    id: 2,
    text: 'Profissionais dedicados e obra impecável. A RTL superou todas as expectativas. Parceria que pretendo manter por muitos anos.',
    name: 'Maria Santos',
    role: 'Arquiteta',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  },
  {
    id: 3,
    text: 'Transparência total em todo o processo. Melhor construtora da região, sem dúvidas. Entrega pontual e qualidade acima do esperado.',
    name: 'Carlos Mendes',
    role: 'Incorporador',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    id: 4,
    text: 'Galpão entregue no prazo e dentro do orçamento. Parceria de longo prazo garantida. Equipe técnica excepcional!',
    name: 'Roberto Alves',
    role: 'Industrial',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  },
];

export const DIFFERENTIALS = [
  {
    number: '01',
    icon: 'Users',
    title: 'Equipe Especializada',
    description: 'Engenheiros e mestres de obra com certificação CREA e vasta experiência no mercado.',
  },
  {
    number: '02',
    icon: 'Clock',
    title: 'Cumprimento de Prazos',
    description: 'Cronograma rigoroso com relatórios semanais de andamento enviados diretamente ao cliente.',
  },
  {
    number: '03',
    icon: 'Cpu',
    title: 'Tecnologia Moderna',
    description: 'Uso de BIM, drones para monitoramento e softwares avançados de gestão de obras.',
  },
  {
    number: '04',
    icon: 'Shield',
    title: 'Segurança no Trabalho',
    description: 'PCMAT completo, NR-18, equipamentos de proteção e treinamentos contínuos para toda equipe.',
  },
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: 'Quanto custa construir em 2026? Veja os valores por m²',
    category: 'Mercado',
    date: '15 Jan 2025',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    excerpt: 'O custo de construção no Brasil varia bastante por região. Conheça os valores atualizados do CUB e como planejar seu orçamento.',
    slug: 'custo-construcao-2026',
  },
  {
    id: 2,
    title: 'Como escolher uma construtora confiável: 7 critérios essenciais',
    category: 'Dicas',
    date: '28 Jan 2025',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    excerpt: 'Escolher a construtora certa pode fazer toda a diferença no sucesso do seu empreendimento. Veja os critérios que não podem faltar.',
    slug: 'como-escolher-construtora-confiavel',
  },
  {
    id: 3,
    title: 'Tipos de fundação na construção civil: qual usar em cada terreno',
    category: 'Técnico',
    date: '10 Fev 2025',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    excerpt: 'A fundação é a base de tudo. Entenda as diferenças entre sapatas, estacas, radier e quando cada tipo é mais indicado.',
    slug: 'tipos-fundacao-construcao-civil',
  },
];
