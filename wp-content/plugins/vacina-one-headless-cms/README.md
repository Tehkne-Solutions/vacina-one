# Vacina One Headless CMS

Plugin WordPress para estruturar o CMS Headless da Vacina One.

## O que o plugin registra

- CPTs: `vacinas`, `unidades`, `calendario_vacinal`, `faq`, `campanhas_empresas`
- Taxonomias públicas via REST API para filtros e organização
- Campos ACF locais em código para cada CPT
- Tela em `Ferramentas > Vacina One Seed` para criar conteúdos iniciais

## Endpoints esperados

```txt
https://vacina-one-bkend.page.gd/wp-json/wp/v2/vacinas
https://vacina-one-bkend.page.gd/wp-json/wp/v2/unidades
https://vacina-one-bkend.page.gd/wp-json/wp/v2/calendario_vacinal
https://vacina-one-bkend.page.gd/wp-json/wp/v2/faq
https://vacina-one-bkend.page.gd/wp-json/wp/v2/campanhas_empresas
```

Exemplo por slug:

```txt
https://vacina-one-bkend.page.gd/wp-json/wp/v2/vacinas?slug=gripe-influenza&_embed=1
```

## Observação de validação

Em 2026-05-08, as URLs públicas do domínio retornaram HTML com script `/aes.js` em vez de JSON, indicando challenge/bloqueio da hospedagem antes da REST API. Para o Next.js consumir os dados em produção, o endpoint precisa responder com `Content-Type: application/json` diretamente para requisições server-side.
