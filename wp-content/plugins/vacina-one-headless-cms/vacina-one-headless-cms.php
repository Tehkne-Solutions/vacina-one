<?php
/**
 * Plugin Name: Vacina One Headless CMS
 * Description: Registra CPTs, taxonomias, campos ACF e seeds do CMS Headless Vacina One.
 * Version: 1.0.0
 * Author: Tehkne Solutions
 * Text Domain: vacina-one-headless-cms
 */

if (!defined('ABSPATH')) {
    exit;
}

define('VACINA_ONE_HEADLESS_CMS_VERSION', '1.0.0');

add_action('init', 'vacina_one_register_post_types');
add_action('init', 'vacina_one_register_taxonomies');
add_action('acf/init', 'vacina_one_register_acf_fields');
add_action('admin_menu', 'vacina_one_register_seed_page');

/**
 * Register custom post types used by the headless CMS.
 */
function vacina_one_register_post_types()
{
    $post_types = [
        'vacinas' => [
            'singular' => 'Vacina',
            'plural' => 'Vacinas',
            'menu_icon' => 'dashicons-shield',
            'rewrite' => 'vacinas',
            'rest_base' => 'vacinas',
        ],
        'unidades' => [
            'singular' => 'Unidade',
            'plural' => 'Unidades',
            'menu_icon' => 'dashicons-location-alt',
            'rewrite' => 'unidades',
            'rest_base' => 'unidades',
        ],
        'calendario_vacinal' => [
            'singular' => 'Calendário Vacinal',
            'plural' => 'Calendários Vacinais',
            'menu_icon' => 'dashicons-calendar-alt',
            'rewrite' => 'calendario',
            'rest_base' => 'calendario_vacinal',
        ],
        'faq' => [
            'singular' => 'FAQ',
            'plural' => 'FAQs',
            'menu_icon' => 'dashicons-editor-help',
            'rewrite' => 'faq',
            'rest_base' => 'faq',
        ],
        'campanhas_empresas' => [
            'singular' => 'Campanha para Empresa',
            'plural' => 'Campanhas para Empresas',
            'menu_icon' => 'dashicons-building',
            'rewrite' => 'empresas',
            'rest_base' => 'campanhas_empresas',
        ],
    ];

    foreach ($post_types as $post_type => $config) {
        register_post_type($post_type, [
            'labels' => [
                'name' => $config['plural'],
                'singular_name' => $config['singular'],
                'menu_name' => $config['plural'],
                'name_admin_bar' => $config['singular'],
                'add_new' => 'Adicionar novo',
                'add_new_item' => 'Adicionar novo ' . $config['singular'],
                'new_item' => 'Novo ' . $config['singular'],
                'edit_item' => 'Editar ' . $config['singular'],
                'view_item' => 'Ver ' . $config['singular'],
                'all_items' => 'Todos',
                'search_items' => 'Buscar',
                'not_found' => 'Nenhum item encontrado',
                'not_found_in_trash' => 'Nenhum item encontrado na lixeira',
            ],
            'public' => true,
            'publicly_queryable' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'query_var' => true,
            'rewrite' => ['slug' => $config['rewrite']],
            'capability_type' => 'post',
            'has_archive' => true,
            'hierarchical' => false,
            'menu_position' => 20,
            'menu_icon' => $config['menu_icon'],
            'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'revisions'],
            'show_in_rest' => true,
            'rest_base' => $config['rest_base'],
        ]);
    }
}

/**
 * Register taxonomies for filtering and organizing CMS content.
 */
function vacina_one_register_taxonomies()
{
    vacina_one_register_taxonomy('publico', 'Públicos', 'Público', ['vacinas']);
    vacina_one_register_taxonomy('tipo_de_vacina', 'Tipos de vacina', 'Tipo de vacina', ['vacinas']);
    vacina_one_register_taxonomy('doenca_prevencao', 'Doenças / Prevenção', 'Doença / Prevenção', ['vacinas']);

    vacina_one_register_taxonomy('cidade_unidade', 'Cidades das unidades', 'Cidade da unidade', ['unidades']);
    vacina_one_register_taxonomy('tipo_de_atendimento', 'Tipos de atendimento', 'Tipo de atendimento', ['unidades']);
    vacina_one_register_taxonomy('status_unidade', 'Status das unidades', 'Status da unidade', ['unidades']);

    vacina_one_register_taxonomy('publico_calendario', 'Públicos do calendário', 'Público do calendário', ['calendario_vacinal']);
    vacina_one_register_taxonomy('fase_da_vida', 'Fases da vida', 'Fase da vida', ['calendario_vacinal']);
    vacina_one_register_taxonomy('tipo_calendario', 'Tipos de calendário', 'Tipo de calendário', ['calendario_vacinal']);

    vacina_one_register_taxonomy('categoria_faq', 'Categorias FAQ', 'Categoria FAQ', ['faq']);
    vacina_one_register_taxonomy('contexto_faq', 'Contextos FAQ', 'Contexto FAQ', ['faq']);

    vacina_one_register_taxonomy('tipo_campanha_empresa', 'Tipos de campanha empresarial', 'Tipo de campanha empresarial', ['campanhas_empresas']);
    vacina_one_register_taxonomy('segmento_empresa', 'Segmentos de empresa', 'Segmento de empresa', ['campanhas_empresas']);
    vacina_one_register_taxonomy('regiao_atendimento', 'Regiões de atendimento', 'Região de atendimento', ['campanhas_empresas']);
}

function vacina_one_register_taxonomy($taxonomy, $plural, $singular, $post_types)
{
    register_taxonomy($taxonomy, $post_types, [
        'labels' => [
            'name' => $plural,
            'singular_name' => $singular,
            'search_items' => 'Buscar',
            'all_items' => 'Todos',
            'parent_item' => 'Item pai',
            'parent_item_colon' => 'Item pai:',
            'edit_item' => 'Editar',
            'update_item' => 'Atualizar',
            'add_new_item' => 'Adicionar novo',
            'new_item_name' => 'Novo nome',
            'menu_name' => $plural,
        ],
        'hierarchical' => true,
        'show_ui' => true,
        'show_admin_column' => true,
        'query_var' => true,
        'show_in_rest' => true,
        'rewrite' => ['slug' => $taxonomy],
    ]);
}

/**
 * Register ACF fields through code. Requires Advanced Custom Fields to be active.
 */
function vacina_one_register_acf_fields()
{
    if (!function_exists('acf_add_local_field_group')) {
        return;
    }

    acf_add_local_field_group([
        'key' => 'group_vacina_one_vacinas',
        'title' => 'Campos - Vacinas',
        'fields' => [
            vacina_one_acf_text('vacinas', 'nome_popular', 'Nome popular'),
            vacina_one_acf_textarea('vacinas', 'descricao_curta', 'Descrição curta'),
            vacina_one_acf_textarea('vacinas', 'indicacao', 'Indicação'),
            vacina_one_acf_text('vacinas', 'faixa_etaria', 'Faixa etária'),
            vacina_one_acf_text('vacinas', 'numero_de_doses', 'Número de doses'),
            vacina_one_acf_textarea('vacinas', 'esquema_vacinal', 'Esquema vacinal'),
            vacina_one_acf_textarea('vacinas', 'reforco', 'Reforço'),
            vacina_one_acf_textarea('vacinas', 'contraindicacoes', 'Contraindicações'),
            vacina_one_acf_textarea('vacinas', 'cuidados_antes', 'Cuidados antes'),
            vacina_one_acf_textarea('vacinas', 'cuidados_depois', 'Cuidados depois'),
            vacina_one_acf_true_false('vacinas', 'disponivel_para_agendamento', 'Disponível para agendamento'),
            vacina_one_acf_text('vacinas', 'cta_texto', 'Texto do CTA', 'Agendar Vacinação'),
        ],
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'vacinas']]],
        'show_in_rest' => 1,
    ]);

    acf_add_local_field_group([
        'key' => 'group_vacina_one_unidades',
        'title' => 'Campos - Unidades',
        'fields' => [
            vacina_one_acf_text('unidades', 'nome_da_unidade', 'Nome da unidade'),
            vacina_one_acf_textarea('unidades', 'endereco_completo', 'Endereço completo'),
            vacina_one_acf_text('unidades', 'cidade', 'Cidade'),
            vacina_one_acf_text('unidades', 'bairro', 'Bairro'),
            vacina_one_acf_text('unidades', 'estado', 'Estado'),
            vacina_one_acf_text('unidades', 'cep', 'CEP'),
            vacina_one_acf_text('unidades', 'telefone', 'Telefone'),
            vacina_one_acf_text('unidades', 'whatsapp', 'WhatsApp'),
            vacina_one_acf_email('unidades', 'email', 'E-mail'),
            vacina_one_acf_textarea('unidades', 'horario_de_funcionamento', 'Horário de funcionamento'),
            vacina_one_acf_url('unidades', 'google_maps_url', 'Google Maps URL'),
            vacina_one_acf_textarea('unidades', 'google_maps_embed', 'Google Maps Embed'),
            vacina_one_acf_true_false('unidades', 'unidade_ativa', 'Unidade ativa'),
            vacina_one_acf_text('unidades', 'cta_texto', 'Texto do CTA', 'Agendar Vacinação'),
        ],
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'unidades']]],
        'show_in_rest' => 1,
    ]);

    acf_add_local_field_group([
        'key' => 'group_vacina_one_calendario_vacinal',
        'title' => 'Campos - Calendário Vacinal',
        'fields' => [
            vacina_one_acf_text('calendario', 'titulo_publico', 'Título público'),
            vacina_one_acf_textarea('calendario', 'descricao_curta', 'Descrição curta'),
            vacina_one_acf_text('calendario', 'faixa_etaria', 'Faixa etária'),
            vacina_one_acf_text('calendario', 'publico_alvo', 'Público-alvo'),
            vacina_one_acf_relationship('calendario', 'vacinas_relacionadas', 'Vacinas relacionadas', ['vacinas']),
            vacina_one_acf_number('calendario', 'ordem_de_exibicao', 'Ordem de exibição'),
            vacina_one_acf_image('calendario', 'icone', 'Ícone'),
            vacina_one_acf_text('calendario', 'cta_texto', 'Texto do CTA', 'Acessar calendário'),
            vacina_one_acf_text('calendario', 'cta_url', 'URL do CTA', '/calendario'),
            vacina_one_acf_true_false('calendario', 'ativo_no_site', 'Ativo no site'),
            vacina_one_acf_textarea('calendario', 'observacoes_importantes', 'Observações importantes'),
        ],
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'calendario_vacinal']]],
        'show_in_rest' => 1,
    ]);

    acf_add_local_field_group([
        'key' => 'group_vacina_one_faq',
        'title' => 'Campos - FAQ',
        'fields' => [
            vacina_one_acf_text('faq', 'pergunta', 'Pergunta'),
            vacina_one_acf_textarea('faq', 'resposta_curta', 'Resposta curta'),
            vacina_one_acf_wysiwyg('faq', 'resposta_completa', 'Resposta completa'),
            vacina_one_acf_text('faq', 'categoria_faq', 'Categoria FAQ'),
            vacina_one_acf_number('faq', 'ordem_de_exibicao', 'Ordem de exibição'),
            vacina_one_acf_true_false('faq', 'exibir_na_home', 'Exibir na Home'),
            vacina_one_acf_true_false('faq', 'exibir_em_vacinas', 'Exibir em Vacinas'),
            vacina_one_acf_true_false('faq', 'exibir_em_calendario', 'Exibir em Calendário'),
            vacina_one_acf_true_false('faq', 'exibir_em_empresas', 'Exibir em Empresas'),
            vacina_one_acf_true_false('faq', 'exibir_em_contato', 'Exibir em Contato'),
            vacina_one_acf_true_false('faq', 'ativo_no_site', 'Ativo no site'),
        ],
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'faq']]],
        'show_in_rest' => 1,
    ]);

    acf_add_local_field_group([
        'key' => 'group_vacina_one_campanhas_empresas',
        'title' => 'Campos - Campanhas para Empresas',
        'fields' => [
            vacina_one_acf_text('campanhas', 'titulo_publico', 'Título público'),
            vacina_one_acf_textarea('campanhas', 'descricao_curta', 'Descrição curta'),
            vacina_one_acf_textarea('campanhas', 'beneficios', 'Benefícios'),
            vacina_one_acf_text('campanhas', 'publico_alvo', 'Público-alvo'),
            vacina_one_acf_relationship('campanhas', 'vacinas_disponiveis', 'Vacinas disponíveis', ['vacinas']),
            vacina_one_acf_text('campanhas', 'modelo_de_atendimento', 'Modelo de atendimento'),
            vacina_one_acf_textarea('campanhas', 'regioes_atendidas', 'Regiões atendidas'),
            vacina_one_acf_text('campanhas', 'quantidade_minima_colaboradores', 'Quantidade mínima de colaboradores'),
            vacina_one_acf_textarea('campanhas', 'prazo_para_agendamento', 'Prazo para agendamento'),
            vacina_one_acf_url('campanhas', 'whatsapp_cta', 'WhatsApp CTA'),
            vacina_one_acf_text('campanhas', 'cta_primario_texto', 'CTA primário - texto', 'Agendar Vacinação'),
            vacina_one_acf_text('campanhas', 'cta_primario_url', 'CTA primário - URL'),
            vacina_one_acf_text('campanhas', 'cta_secundario_texto', 'CTA secundário - texto', 'Falar no WhatsApp'),
            vacina_one_acf_text('campanhas', 'cta_secundario_url', 'CTA secundário - URL'),
            vacina_one_acf_relationship('campanhas', 'faq_relacionado', 'FAQ relacionado', ['faq']),
            vacina_one_acf_true_false('campanhas', 'ativo_no_site', 'Ativo no site'),
        ],
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'campanhas_empresas']]],
        'show_in_rest' => 1,
    ]);
}

function vacina_one_acf_key($group, $name)
{
    return 'field_vacina_one_' . sanitize_key($group) . '_' . sanitize_key($name);
}

function vacina_one_acf_text($group, $name, $label, $default_value = '')
{
    return [
        'key' => vacina_one_acf_key($group, $name),
        'label' => $label,
        'name' => $name,
        'type' => 'text',
        'default_value' => $default_value,
    ];
}

function vacina_one_acf_textarea($group, $name, $label, $default_value = '')
{
    return [
        'key' => vacina_one_acf_key($group, $name),
        'label' => $label,
        'name' => $name,
        'type' => 'textarea',
        'default_value' => $default_value,
        'rows' => 4,
        'new_lines' => 'br',
    ];
}

function vacina_one_acf_wysiwyg($group, $name, $label)
{
    return [
        'key' => vacina_one_acf_key($group, $name),
        'label' => $label,
        'name' => $name,
        'type' => 'wysiwyg',
        'tabs' => 'all',
        'toolbar' => 'basic',
        'media_upload' => 0,
    ];
}

function vacina_one_acf_true_false($group, $name, $label)
{
    return [
        'key' => vacina_one_acf_key($group, $name),
        'label' => $label,
        'name' => $name,
        'type' => 'true_false',
        'ui' => 1,
        'default_value' => 1,
    ];
}

function vacina_one_acf_number($group, $name, $label)
{
    return [
        'key' => vacina_one_acf_key($group, $name),
        'label' => $label,
        'name' => $name,
        'type' => 'number',
        'default_value' => 0,
    ];
}

function vacina_one_acf_email($group, $name, $label)
{
    return [
        'key' => vacina_one_acf_key($group, $name),
        'label' => $label,
        'name' => $name,
        'type' => 'email',
    ];
}

function vacina_one_acf_url($group, $name, $label)
{
    return [
        'key' => vacina_one_acf_key($group, $name),
        'label' => $label,
        'name' => $name,
        'type' => 'url',
    ];
}

function vacina_one_acf_image($group, $name, $label)
{
    return [
        'key' => vacina_one_acf_key($group, $name),
        'label' => $label,
        'name' => $name,
        'type' => 'image',
        'return_format' => 'array',
        'preview_size' => 'medium',
        'library' => 'all',
    ];
}

function vacina_one_acf_relationship($group, $name, $label, $post_types = [])
{
    return [
        'key' => vacina_one_acf_key($group, $name),
        'label' => $label,
        'name' => $name,
        'type' => 'relationship',
        'post_type' => $post_types,
        'return_format' => 'id',
        'filters' => ['search', 'post_type', 'taxonomy'],
    ];
}

function vacina_one_register_seed_page()
{
    add_management_page(
        'Vacina One Seed',
        'Vacina One Seed',
        'manage_options',
        'vacina-one-seed',
        'vacina_one_render_seed_page'
    );
}

function vacina_one_render_seed_page()
{
    if (!current_user_can('manage_options')) {
        wp_die('Você não tem permissão para acessar esta página.');
    }

    $messages = [];

    if (isset($_POST['vacina_one_seed_submit'])) {
        check_admin_referer('vacina_one_seed_content');
        $messages = vacina_one_seed_all_content();
    }
    ?>
    <div class="wrap">
        <h1>Vacina One Seed</h1>
        <p>Crie ou verifique os conteúdos iniciais do CMS Headless Vacina One.</p>

        <?php foreach ($messages as $message) : ?>
            <div class="notice notice-success is-dismissible">
                <p><?php echo esc_html($message); ?></p>
            </div>
        <?php endforeach; ?>

        <form method="post">
            <?php wp_nonce_field('vacina_one_seed_content'); ?>
            <p>
                <button type="submit" name="vacina_one_seed_submit" class="button button-primary">
                    Criar conteúdos iniciais do Vacina One
                </button>
            </p>
        </form>
    </div>
    <?php
}

function vacina_one_seed_all_content()
{
    return [
        vacina_one_seed_taxonomies(),
        vacina_one_seed_vacinas(),
        vacina_one_seed_unidades(),
        vacina_one_seed_calendario_vacinal(),
        vacina_one_seed_faqs(),
        vacina_one_seed_campanhas_empresas(),
    ];
}

function vacina_one_seed_taxonomies()
{
    $taxonomies = [
        'publico' => ['bebê', 'crianças', 'adultos', 'gestante', '60+', 'empresas'],
        'tipo_de_vacina' => ['Rotina', 'Viagem', 'Campanha', 'Sazonal', 'Empresarial'],
        'doenca_prevencao' => ['Influenza', 'Febre Amarela', 'Meningite', 'Hepatite', 'Pneumonia', 'HPV'],
        'cidade_unidade' => ['Campinas'],
        'tipo_de_atendimento' => ['Clínica', 'In company', 'Domiciliar'],
        'status_unidade' => ['Ativa', 'Em breve', 'Inativa'],
        'publico_calendario' => ['bebê', 'crianças', 'adultos', 'gestante', '60+'],
        'fase_da_vida' => ['primeira infância', 'infância', 'vida adulta', 'gestação', 'idosos'],
        'tipo_calendario' => ['Rotina', 'Viagem', 'Campanha'],
        'categoria_faq' => ['Atendimento', 'Vacinas', 'Agendamento', 'Empresas', 'Viagem'],
        'contexto_faq' => ['Home', 'Vacinas', 'Calendário', 'Empresas', 'Contato', 'Blog'],
        'tipo_campanha_empresa' => ['Gripe', 'Rotina', 'Sazonal', 'In company', 'Corporativa', 'Escolar'],
        'segmento_empresa' => ['Escritórios', 'Indústrias', 'Escolas', 'Clínicas', 'Comércios', 'Equipes externas'],
        'regiao_atendimento' => ['Campinas', 'Hortolândia', 'Sumaré', 'Valinhos', 'Indaiatuba', 'Região Metropolitana de Campinas'],
    ];

    foreach ($taxonomies as $taxonomy => $terms) {
        if (!taxonomy_exists($taxonomy)) {
            continue;
        }

        foreach ($terms as $term) {
            if (!term_exists($term, $taxonomy)) {
                wp_insert_term($term, $taxonomy);
            }
        }
    }

    return 'Taxonomias iniciais verificadas/criadas.';
}

function vacina_one_seed_post($post_type, $title, $slug, $content = '', $excerpt = '')
{
    $existing = get_page_by_path($slug, OBJECT, $post_type);

    if ($existing) {
        return $existing->ID;
    }

    return wp_insert_post([
        'post_type' => $post_type,
        'post_title' => $title,
        'post_name' => $slug,
        'post_status' => 'publish',
        'post_content' => $content,
        'post_excerpt' => $excerpt,
    ]);
}

function vacina_one_seed_field($post_id, $field_name, $value)
{
    if (function_exists('update_field')) {
        update_field($field_name, $value, $post_id);
        return;
    }

    update_post_meta($post_id, $field_name, $value);
}

function vacina_one_seed_vacinas()
{
    $vacinas = [
        [
            'title' => 'Gripe (Influenza)',
            'slug' => 'gripe-influenza',
            'doencas' => ['Influenza'],
            'publicos' => ['crianças', 'adultos', 'gestante', '60+', 'empresas'],
            'descricao' => 'Vacina indicada para prevenção contra os principais vírus da gripe em circulação.',
            'faixa' => 'A partir de 6 meses',
            'doses' => 'Dose anual',
        ],
        [
            'title' => 'Febre Amarela',
            'slug' => 'febre-amarela',
            'doencas' => ['Febre Amarela'],
            'publicos' => ['crianças', 'adultos', 'gestante'],
            'descricao' => 'Vacina indicada para proteção contra a febre amarela, especialmente em regiões ou viagens com recomendação vacinal.',
            'faixa' => 'Conforme orientação profissional',
            'doses' => 'Conforme calendário vacinal',
        ],
        [
            'title' => 'Meningocócica B',
            'slug' => 'meningococica-b',
            'doencas' => ['Meningite'],
            'publicos' => ['bebê', 'crianças', 'adultos'],
            'descricao' => 'Vacina indicada para proteção contra doença meningocócica causada pelo sorogrupo B.',
            'faixa' => 'Conforme calendário vacinal',
            'doses' => 'Esquema conforme idade',
        ],
        [
            'title' => 'Hexavalente',
            'slug' => 'hexavalente',
            'doencas' => ['Hepatite'],
            'publicos' => ['bebê', 'crianças'],
            'descricao' => 'Vacina combinada indicada para proteção contra múltiplas doenças na infância.',
            'faixa' => 'Bebês e crianças',
            'doses' => 'Esquema conforme calendário infantil',
        ],
        [
            'title' => 'Pneumocócica 13',
            'slug' => 'pneumococica-13',
            'doencas' => ['Pneumonia'],
            'publicos' => ['bebê', 'crianças', 'adultos', '60+'],
            'descricao' => 'Vacina indicada para proteção contra doenças causadas por sorotipos do pneumococo.',
            'faixa' => 'Conforme calendário vacinal',
            'doses' => 'Esquema conforme idade e indicação',
        ],
        [
            'title' => 'HPV',
            'slug' => 'hpv',
            'doencas' => ['HPV'],
            'publicos' => ['crianças', 'adultos'],
            'descricao' => 'Vacina indicada para proteção contra tipos de HPV associados a diferentes doenças.',
            'faixa' => 'Conforme indicação por idade',
            'doses' => 'Esquema conforme idade e orientação profissional',
        ],
    ];

    foreach ($vacinas as $vacina) {
        $post_id = vacina_one_seed_post('vacinas', $vacina['title'], $vacina['slug'], $vacina['descricao'], $vacina['descricao']);

        if (is_wp_error($post_id)) {
            continue;
        }

        vacina_one_seed_field($post_id, 'nome_popular', $vacina['title']);
        vacina_one_seed_field($post_id, 'descricao_curta', $vacina['descricao']);
        vacina_one_seed_field($post_id, 'indicacao', 'Indicada conforme idade, histórico vacinal e orientação profissional.');
        vacina_one_seed_field($post_id, 'faixa_etaria', $vacina['faixa']);
        vacina_one_seed_field($post_id, 'numero_de_doses', $vacina['doses']);
        vacina_one_seed_field($post_id, 'esquema_vacinal', 'O esquema vacinal deve ser definido conforme calendário vigente e orientação profissional.');
        vacina_one_seed_field($post_id, 'reforco', 'Reforços podem ser recomendados conforme idade, histórico vacinal e indicação.');
        vacina_one_seed_field($post_id, 'contraindicacoes', 'Pessoas com histórico de reação alérgica grave a componentes da vacina devem buscar orientação profissional.');
        vacina_one_seed_field($post_id, 'cuidados_antes', 'Informe à equipe sobre alergias, febre, gestação, uso de medicamentos ou reações anteriores.');
        vacina_one_seed_field($post_id, 'cuidados_depois', 'Após a vacinação, observe possíveis reações locais e siga as orientações da equipe.');
        vacina_one_seed_field($post_id, 'disponivel_para_agendamento', 1);
        vacina_one_seed_field($post_id, 'cta_texto', 'Agendar Vacinação');

        wp_set_object_terms($post_id, $vacina['publicos'], 'publico');
        wp_set_object_terms($post_id, ['Rotina'], 'tipo_de_vacina');
        wp_set_object_terms($post_id, $vacina['doencas'], 'doenca_prevencao');
    }

    return 'Vacinas iniciais verificadas/criadas.';
}

function vacina_one_seed_unidades()
{
    $post_id = vacina_one_seed_post(
        'unidades',
        'Vacina One Campinas',
        'vacina-one-campinas',
        'Unidade de atendimento Vacina One em Campinas.',
        'Atendimento humanizado para vacinação em Campinas.'
    );

    if (!is_wp_error($post_id)) {
        vacina_one_seed_field($post_id, 'nome_da_unidade', 'Vacina One Campinas');
        vacina_one_seed_field($post_id, 'endereco_completo', 'Endereço a definir - Campinas - SP');
        vacina_one_seed_field($post_id, 'cidade', 'Campinas');
        vacina_one_seed_field($post_id, 'bairro', 'A definir');
        vacina_one_seed_field($post_id, 'estado', 'SP');
        vacina_one_seed_field($post_id, 'cep', '');
        vacina_one_seed_field($post_id, 'telefone', '');
        vacina_one_seed_field($post_id, 'whatsapp', '');
        vacina_one_seed_field($post_id, 'email', '');
        vacina_one_seed_field($post_id, 'horario_de_funcionamento', 'Horário de funcionamento a definir.');
        vacina_one_seed_field($post_id, 'google_maps_url', '');
        vacina_one_seed_field($post_id, 'google_maps_embed', '');
        vacina_one_seed_field($post_id, 'unidade_ativa', 1);
        vacina_one_seed_field($post_id, 'cta_texto', 'Agendar Vacinação');

        wp_set_object_terms($post_id, ['Campinas'], 'cidade_unidade');
        wp_set_object_terms($post_id, ['Clínica'], 'tipo_de_atendimento');
        wp_set_object_terms($post_id, ['Ativa'], 'status_unidade');
    }

    return 'Unidades iniciais verificadas/criadas.';
}

function vacina_one_seed_calendario_vacinal()
{
    $calendarios = [
        ['title' => 'bebê', 'slug' => 'bebe', 'faixa' => '0 a 12 meses', 'fase' => 'primeira infância'],
        ['title' => 'crianças', 'slug' => 'criancas', 'faixa' => '1 a 10 anos', 'fase' => 'infância'],
        ['title' => '60+', 'slug' => '60-mais', 'faixa' => '60+', 'fase' => 'idosos'],
        ['title' => 'adultos', 'slug' => 'adultos', 'faixa' => 'Adultos', 'fase' => 'vida adulta'],
        ['title' => 'gestante', 'slug' => 'gestante', 'faixa' => 'Gestantes', 'fase' => 'gestação'],
    ];

    $order = 1;

    foreach ($calendarios as $calendario) {
        $descricao = 'Confira as principais vacinas recomendadas para este público, conforme calendário vacinal e orientação profissional.';
        $post_id = vacina_one_seed_post('calendario_vacinal', $calendario['title'], $calendario['slug'], $descricao, $descricao);

        if (is_wp_error($post_id)) {
            continue;
        }

        vacina_one_seed_field($post_id, 'titulo_publico', $calendario['title']);
        vacina_one_seed_field($post_id, 'descricao_curta', $descricao);
        vacina_one_seed_field($post_id, 'faixa_etaria', $calendario['faixa']);
        vacina_one_seed_field($post_id, 'publico_alvo', $calendario['title']);
        vacina_one_seed_field($post_id, 'ordem_de_exibicao', $order);
        vacina_one_seed_field($post_id, 'cta_texto', 'Acessar calendário');
        vacina_one_seed_field($post_id, 'cta_url', '/calendario');
        vacina_one_seed_field($post_id, 'ativo_no_site', 1);
        vacina_one_seed_field($post_id, 'observacoes_importantes', 'As recomendações podem variar conforme idade, histórico vacinal e orientação profissional.');

        wp_set_object_terms($post_id, [$calendario['title']], 'publico_calendario');
        wp_set_object_terms($post_id, [$calendario['fase']], 'fase_da_vida');
        wp_set_object_terms($post_id, ['Rotina'], 'tipo_calendario');

        $order++;
    }

    return 'Calendários vacinais iniciais verificados/criados.';
}

function vacina_one_seed_faqs()
{
    $faqs = [
        [
            'title' => 'Vocês atendem crianças de qual idade?',
            'slug' => 'voces-atendem-criancas-de-qual-idade',
            'answer' => 'Atendemos desde os primeiros meses de vida. Seguimos o calendário vacinal da Sociedade Brasileira de Pediatria e orientamos os pais sobre cada etapa com muita atenção e calma.',
            'category' => 'Atendimento',
        ],
        [
            'title' => 'Preciso de receita médica para tomar uma vacina?',
            'slug' => 'preciso-de-receita-medica-para-tomar-uma-vacina',
            'answer' => 'Na maioria dos casos, não é necessário apresentar receita médica. Nossa equipe avalia o calendário vacinal, a idade, o histórico de saúde e orienta sobre a melhor conduta. Quando alguma vacina exigir indicação ou cuidado específico, avisamos antes da aplicação.',
            'category' => 'Vacinas',
        ],
        [
            'title' => 'Como funciona a vacinação para empresas?',
            'slug' => 'como-funciona-a-vacinacao-para-empresas',
            'answer' => 'Organizamos campanhas de vacinação para empresas, escolas, condomínios e instituições. A equipe da Vacina One pode ir até o local ou receber os colaboradores na clínica, com agendamento, controle das doses e emissão dos comprovantes de vacinação.',
            'category' => 'Empresas',
        ],
        [
            'title' => 'As vacinas são seguras e registradas?',
            'slug' => 'as-vacinas-sao-seguras-e-registradas',
            'answer' => 'Sim. Trabalhamos apenas com vacinas de laboratórios reconhecidos, registradas e aprovadas pelos órgãos competentes. Também seguimos protocolos rigorosos de conservação, armazenamento e aplicação para garantir segurança em todas as etapas.',
            'category' => 'Vacinas',
        ],
        [
            'title' => 'Preciso agendar ou posso chegar sem hora marcada?',
            'slug' => 'preciso-agendar-ou-posso-chegar-sem-hora-marcada',
            'answer' => 'Recomendamos o agendamento para garantir mais conforto, organização e menor tempo de espera. Assim, nossa equipe consegue preparar o atendimento com antecedência e confirmar a disponibilidade da vacina desejada.',
            'category' => 'Agendamento',
        ],
        [
            'title' => 'Vocês têm vacinas para viagem internacional?',
            'slug' => 'voces-tem-vacinas-para-viagem-internacional',
            'answer' => 'Sim. A Vacina One orienta sobre vacinas importantes para viagens nacionais e internacionais, de acordo com o destino, idade e histórico vacinal. Nossa equipe ajuda você a revisar o calendário antes da viagem para embarcar com mais segurança.',
            'category' => 'Vacinas',
        ],
        [
            'title' => 'Vocês emitem carteirinha ou comprovante de vacinação?',
            'slug' => 'voces-emitem-carteirinha-ou-comprovante-de-vacinacao',
            'answer' => 'Sim. Após a aplicação, emitimos o comprovante de vacinação com as informações necessárias sobre a dose aplicada. Também orientamos sobre o registro no calendário vacinal e próximos reforços, quando houver necessidade.',
            'category' => 'Atendimento',
        ],
    ];

    $order = 1;

    foreach ($faqs as $faq) {
        $post_id = vacina_one_seed_post('faq', $faq['title'], $faq['slug'], $faq['answer'], $faq['answer']);

        if (is_wp_error($post_id)) {
            continue;
        }

        vacina_one_seed_field($post_id, 'pergunta', $faq['title']);
        vacina_one_seed_field($post_id, 'resposta_curta', $faq['answer']);
        vacina_one_seed_field($post_id, 'resposta_completa', $faq['answer']);
        vacina_one_seed_field($post_id, 'categoria_faq', $faq['category']);
        vacina_one_seed_field($post_id, 'ordem_de_exibicao', $order);
        vacina_one_seed_field($post_id, 'exibir_na_home', 1);
        vacina_one_seed_field($post_id, 'exibir_em_vacinas', 1);
        vacina_one_seed_field($post_id, 'exibir_em_calendario', 1);
        vacina_one_seed_field($post_id, 'exibir_em_empresas', 1);
        vacina_one_seed_field($post_id, 'exibir_em_contato', 1);
        vacina_one_seed_field($post_id, 'ativo_no_site', 1);

        wp_set_object_terms($post_id, [$faq['category']], 'categoria_faq');
        wp_set_object_terms($post_id, ['Home', 'Vacinas', 'Calendário', 'Empresas', 'Contato'], 'contexto_faq');

        $order++;
    }

    return 'FAQs iniciais verificadas/criadas.';
}

function vacina_one_seed_campanhas_empresas()
{
    $post_id = vacina_one_seed_post(
        'campanhas_empresas',
        'Vacinação para empresas',
        'vacinacao-para-empresas',
        'Organize a vacinação da sua equipe com atendimento humanizado, rápido e seguro.',
        'Vacinação corporativa com agendamento, controle de doses e atendimento especializado.'
    );

    if (!is_wp_error($post_id)) {
        vacina_one_seed_field($post_id, 'titulo_publico', 'Vacinação para empresas');
        vacina_one_seed_field($post_id, 'descricao_curta', 'Organize a vacinação da sua equipe com atendimento humanizado, rápido e seguro.');
        vacina_one_seed_field($post_id, 'beneficios', "Redução de faltas\nMais comodidade para colaboradores\nAtendimento organizado\nEquipe especializada\nCampanhas personalizadas");
        vacina_one_seed_field($post_id, 'publico_alvo', 'empresas');
        vacina_one_seed_field($post_id, 'modelo_de_atendimento', 'Na empresa ou na unidade Vacina One');
        vacina_one_seed_field($post_id, 'regioes_atendidas', 'Campinas e região');
        vacina_one_seed_field($post_id, 'quantidade_minima_colaboradores', 'A definir conforme campanha');
        vacina_one_seed_field($post_id, 'prazo_para_agendamento', 'Agendamento sujeito à disponibilidade da equipe.');
        vacina_one_seed_field($post_id, 'whatsapp_cta', '');
        vacina_one_seed_field($post_id, 'cta_primario_texto', 'Agendar Vacinação');
        vacina_one_seed_field($post_id, 'cta_primario_url', '/contato');
        vacina_one_seed_field($post_id, 'cta_secundario_texto', 'Falar no WhatsApp');
        vacina_one_seed_field($post_id, 'cta_secundario_url', '');
        vacina_one_seed_field($post_id, 'ativo_no_site', 1);

        wp_set_object_terms($post_id, ['Corporativa', 'In company'], 'tipo_campanha_empresa');
        wp_set_object_terms($post_id, ['Escritórios', 'Indústrias', 'Escolas', 'Clínicas', 'Comércios'], 'segmento_empresa');
        wp_set_object_terms($post_id, ['Campinas', 'Região Metropolitana de Campinas'], 'regiao_atendimento');
    }

    return 'Campanhas para empresas iniciais verificadas/criadas.';
}

function vacina_one_activate_headless_cms()
{
    vacina_one_register_post_types();
    vacina_one_register_taxonomies();
    flush_rewrite_rules();
}

function vacina_one_deactivate_headless_cms()
{
    flush_rewrite_rules();
}

register_activation_hook(__FILE__, 'vacina_one_activate_headless_cms');
register_deactivation_hook(__FILE__, 'vacina_one_deactivate_headless_cms');
