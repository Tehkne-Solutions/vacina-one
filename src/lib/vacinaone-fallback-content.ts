import {
  WordPressVaccine,
  WordPressCalendar,
  WordPressCorporateCampaign,
} from '@/types/wordpress';

export interface SiteCareBlock {
  number: number;
  title: string;
  description: string;
  text: string;
  items: string[];
  button: string;
  slug: string;
  kind: string;
}

type VaccineSeed = {
  title: string;
  slug: string;
  description: string;
};

const vaccineSeeds: VaccineSeed[] = [
  { title: 'Hexavalente', slug: 'hexavalente', description: 'Proteção infantil contra difteria, tétano, coqueluche, pólio, hepatite B e Haemophilus influenzae tipo b.' },
  { title: 'Rotavírus', slug: 'rotavirus', description: 'Vacina oral para bebês, indicada para reduzir risco de diarreia grave, vômitos e desidratação por rotavírus.' },
  { title: 'Pneumocócica conjugada 13, 15 e 20', slug: 'pneumococica-conjugada-13-15-e-20', description: 'Proteção contra doenças pneumocócicas, como pneumonia, otite, meningite e infecções invasivas.' },
  { title: 'Pneumocócica polissacarídica 23 (VPP23)', slug: 'pneumococica-polissacaridica-23-vpp23', description: 'Amplia a proteção contra 23 sorotipos do pneumococo, especialmente para idosos e grupos de maior risco.' },
  { title: 'Meningocócica B', slug: 'meningococica-b', description: 'Proteção contra doença meningocócica invasiva causada pelo meningococo do tipo B.' },
  { title: 'Meningocócica ACWY', slug: 'meningococica-acwy', description: 'Proteção contra meningites e infecções invasivas causadas pelos meningococos A, C, W e Y.' },
  { title: 'Tríplice Viral', slug: 'triplice-viral', description: 'Proteção contra sarampo, caxumba e rubéola para crianças, adolescentes e adultos não vacinados.' },
  { title: 'Varicela', slug: 'varicela', description: 'Ajuda a prevenir catapora e reduzir o risco de formas intensas e complicações da doença.' },
  { title: 'HPV 9', slug: 'hpv-9', description: 'Proteção contra 9 tipos de HPV associados a verrugas genitais, lesões precursoras e cânceres relacionados.' },
  { title: 'Hepatite A', slug: 'hepatite-a', description: 'Proteção contra a infecção pelo vírus da hepatite A, que atinge o fígado.' },
  { title: 'Hepatite A + B', slug: 'hepatite-a-e-b', description: 'Opção combinada para proteção contra hepatite A e hepatite B.' },
  { title: 'dTpa', slug: 'dtpa', description: 'Vacina tríplice bacteriana acelular do tipo adulto contra difteria, tétano e coqueluche.' },
  { title: 'Influenza', slug: 'influenza', description: 'Vacina anual contra gripe, indicada para crianças, adultos, idosos, gestantes e grupos de risco.' },
  { title: 'Herpes-zóster', slug: 'herpes-zoster', description: 'Ajuda a prevenir herpes-zóster e neuralgia pós-herpética, principalmente em adultos 50+.' },
  { title: 'Hepatite B', slug: 'hepatite-b', description: 'Proteção contra infecção aguda e crônica pelo vírus da hepatite B.' },
  { title: 'Dengue (Qdenga)', slug: 'dengue-qdenga', description: 'Vacina contra os quatro sorotipos do vírus da dengue, conforme faixa etária e avaliação individual.' },
  { title: 'VSR bebê (Beyfortus)', slug: 'vsr-bebe-beyfortus', description: 'Imunobiológico para ajudar a prevenir infecções respiratórias graves por VSR em bebês.' },
  { title: 'VSR gestante (Abrysvo)', slug: 'vsr-gestante-abrysvo', description: 'Vacina para gestantes com objetivo de proteger o bebê contra o VSR por anticorpos maternos.' },
  { title: 'Febre amarela', slug: 'febre-amarela', description: 'Proteção contra febre amarela, importante para áreas de risco e viagens.' },
  { title: 'Febre tifoide', slug: 'febre-tifoide', description: 'Indicada principalmente para viajantes com destino a áreas de maior risco.' },
  { title: 'Vacinas sob indicação específica', slug: 'vacinas-sob-indicacao-especifica', description: 'Avaliação personalizada conforme idade, histórico, viagens, comorbidades e situações de risco.' },
];

export const siteCareBlocks: SiteCareBlock[] = [
  { number: 1, kind: 'Bebês', slug: 'protecao-completa-para-bebes', title: 'Proteção Completa para Bebês', description: 'Proteção completa desde os primeiros meses de vida com vacinas essenciais do calendário infantil.', text: 'Cuidamos de todo o início da vida com um calendário vacinal organizado, seguro e acompanhado por profissionais.', items: ['Hexavalente', 'Rotavírus', 'Pneumocócica (13 / 15 / 20)', 'Meningocócica B', 'Meningocócica ACWY', 'Tríplice Viral', 'Varicela'], button: 'Agendar para meu bebê' },
  { number: 2, kind: 'Família', slug: 'vacinas-para-toda-a-familia', title: 'Vacinas para Toda a Família', description: 'Proteção para crianças, adolescentes e adultos com foco em prevenção e bem-estar.', text: 'Proteção para crianças, adolescentes e adultos, com foco em prevenção e bem-estar.', items: ['HPV 9', 'Hepatite A', 'Hepatite A + B', 'dTpa (tríplice bacteriana)', 'Influenza (gripe)'], button: 'Falar com especialista' },
  { number: 3, kind: '50+ e idosos', slug: 'protecao-para-50-e-idosos', title: 'Proteção para 50+ e Idosos', description: 'Vacinas essenciais para prevenir complicações e manter qualidade de vida.', text: 'Vacinas essenciais para manter a saúde, evitar complicações e garantir qualidade de vida.', items: ['Pneumocócica (13 / 15 / 20)', 'Pneumocócica polissacarídica 23 (VPP23)', 'Influenza (gripe)', 'dTpa (tríplice bacteriana)', 'Herpes-zóster'], button: 'Quero me proteger' },
  { number: 4, kind: 'Empresas', slug: 'vacinacao-para-empresas', title: 'Vacinação para Empresas', description: 'Programas personalizados para proteger colaboradores, reduzir afastamentos e aumentar produtividade.', text: 'Programas personalizados para proteger equipes, reduzir afastamentos e aumentar produtividade.', items: ['Influenza (gripe)', 'dTpa (tríplice bacteriana)', 'Hepatite B', 'Outras conforme necessidade'], button: 'Solicitar proposta' },
  { number: 5, kind: 'Casas de repouso', slug: 'vacinacao-para-casas-de-repouso', title: 'Vacinação para Casas de Repouso', description: 'Cuidado coletivo para prevenção de surtos e proteção da saúde dos residentes.', text: 'Cuidado coletivo com foco na prevenção de surtos e proteção da saúde dos residentes.', items: ['Influenza (gripe)', 'Pneumocócicas', 'dTpa (tríplice bacteriana)', 'Herpes-zóster'], button: 'Falar com nossa equipe' },
  { number: 6, kind: 'Premium', slug: 'vacinas-premium-e-inovadoras', title: 'Vacinas Premium e Inovadoras', description: 'Tecnologias modernas para uma proteção mais completa em diferentes fases da vida.', text: 'Tecnologias modernas para uma proteção mais completa em diferentes fases da vida.', items: ['Dengue (Qdenga)', 'VSR bebê (Beyfortus)', 'VSR gestante (Abrysvo)', 'Herpes-zóster'], button: 'Conhecer opções' },
  { number: 7, kind: 'Atletas', slug: 'vacinacao-para-atletas', title: 'Vacinação para Atletas', description: 'Proteção para quem busca manter desempenho, rotina ativa e alta performance.', text: 'Proteção para quem busca manter desempenho, rotina ativa e alta performance.', items: ['Influenza (gripe)', 'Hepatite A + B', 'dTpa (tríplice bacteriana)'], button: 'Montar meu plano' },
  { number: 8, kind: 'Gestante', slug: 'vacinacao-para-gestantes', title: 'Vacinação para Gestantes', description: 'Proteção para mãe e bebê desde a gravidez.', text: 'Proteção para você e para o bebê desde a gestação.', items: ['dTpa', 'Influenza', 'VSR gestante (Abrysvo)'], button: 'Proteção para você e para o bebê' },
  { number: 9, kind: 'Viagem internacional', slug: 'vacinacao-para-viagem-internacional', title: 'Vacinação para Viagem Internacional', description: 'Proteja-se antes de viajar com vacinas essenciais exigidas e recomendadas.', text: 'Atendimento rápido e seguro para garantir uma viagem tranquila.', items: ['Febre amarela', 'Febre tifoide', 'Hepatite A', 'Hepatite A + B'], button: 'Preparar minha viagem' },
  { number: 10, kind: 'Escolar', slug: 'vacinacao-escolar-para-criancas-e-adolescentes', title: 'Vacinação Escolar para Crianças e Adolescentes', description: 'Proteção para crianças e adolescentes na fase escolar.', text: 'Mantenha o calendário atualizado com atendimento seguro e próximo de você.', items: ['HPV 9', 'Meningocócica ACWY', 'dTpa'], button: 'Atualizar calendário escolar' },
  { number: 11, kind: 'Domiciliar', slug: 'vacinacao-domiciliar', title: 'Vacinação Domiciliar', description: 'Leve a vacinação até sua casa com conforto, segurança e atendimento especializado.', text: 'Ideal para bebês, idosos e rotinas corridas.', items: ['Qualquer vacina + aplicação em casa'], button: 'Vacinação em casa' },
  { number: 12, kind: 'Check-up', slug: 'vacinacao-para-imunidade-check-up', title: 'Vacinação para Imunidade / Check-up', description: 'Avaliação completa da carteira de vacinação com plano personalizado.', text: 'Analisamos sua carteira e montamos um plano completo.', items: ['Avaliação completa do cartão vacinal', 'Plano personalizado'], button: 'Montar plano vacinal' },
];

const corporateBlockSlugs = new Set(['vacinacao-para-empresas', 'vacinacao-para-casas-de-repouso', 'vacinacao-domiciliar', 'vacinacao-para-imunidade-check-up']);

function toRendered(rendered: string) {
  return { rendered };
}

function toParagraph(text: string) {
  return `<p>${text}</p>`;
}

function blockContent(block: SiteCareBlock) {
  const text = block.text ? `<h2>Sobre</h2><p>${block.text}</p>` : '';
  const list = block.items.length
    ? `<h2>Inclui</h2><ul>${block.items.map((item) => `<li>${item}</li>`).join('')}</ul>`
    : '';
  return [toParagraph(block.description), text, list].filter(Boolean).join('\n');
}

export const fallbackVaccines: WordPressVaccine[] = vaccineSeeds.map((seed, index) => ({
  id: 9001 + index,
  date: '2026-07-07T00:00:00',
  slug: seed.slug,
  status: 'publish',
  title: toRendered(seed.title),
  content: toRendered(`${toParagraph(seed.description)}\n<h2>Orientação VacinaOne</h2><p>Consulte a equipe para confirmar indicação, esquema de doses e cuidados conforme idade, histórico vacinal e objetivo de proteção.</p>`),
  excerpt: toRendered(seed.description),
  featured_media: 0,
  acf: {
    nome_popular: seed.title,
    descricao_curta: seed.description,
    indicacao: 'Consulte a equipe VacinaOne para avaliação do calendário, idade e histórico vacinal.',
    disponivel_para_agendamento: true,
    cta_texto: 'Agendar vacinação',
  },
}));

export const fallbackVaccineCalendar: WordPressCalendar[] = siteCareBlocks.map((block) => ({
  id: 9500 + block.number,
  date: '2026-07-07T00:00:00',
  slug: block.slug,
  status: 'publish',
  title: toRendered(block.title),
  content: toRendered(blockContent(block)),
  excerpt: toRendered(block.description),
  featured_media: 0,
  acf: {
    titulo_publico: block.title,
    descricao_curta: block.description,
    faixa_etaria: block.kind,
    publico_alvo: block.title,
    vacinas_relacionadas: block.items,
    ordem_de_exibicao: block.number,
    cta_texto: block.button,
    ativo_no_site: true,
    observacoes_importantes: block.text || block.description,
  },
}));

export const fallbackCorporateCampaigns: WordPressCorporateCampaign[] = siteCareBlocks
  .filter((block) => corporateBlockSlugs.has(block.slug))
  .map((block) => ({
    id: 9700 + block.number,
    date: '2026-07-07T00:00:00',
    slug: block.slug,
    status: 'publish',
    title: toRendered(block.title),
    content: toRendered(blockContent(block)),
    excerpt: toRendered(block.description),
    featured_media: 0,
    acf: {
      titulo_publico: block.title,
      descricao_curta: block.description,
      beneficios: block.text || block.description,
      publico_alvo: block.kind,
      vacinas_disponiveis: block.items,
      modelo_de_atendimento: 'Atendimento na clínica, em domicílio ou no local da instituição, conforme necessidade.',
      regioes_atendidas: 'Campinas e região',
      cta_primario_texto: block.button || 'Solicitar proposta',
      cta_secundario_texto: 'Falar no WhatsApp',
      ativo_no_site: true,
    },
  }));

export const popularVaccineLinks = vaccineSeeds.slice(0, 14).map(({ title, slug }) => ({
  name: title,
  slug,
}));
