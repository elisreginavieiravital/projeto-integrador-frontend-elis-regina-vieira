# Sistema de Avaliação de Competências

Projeto Integrador da disciplina de Desenvolvimento Front-end para Web.

Sistema web demonstrativo para avaliação de competências técnicas e comportamentais de colaboradores administrativos de escritórios de advocacia.

O projeto permitirá apresentar questionários e visualizar resultados fictícios. Desenvolvido inicialmente com HTML, CSS e JavaScript.

## Aula 02 — estrutura HTML base

Página em `index.html`, com objetivo, lista de seis competências, tabela de resultados fictícios, link externo para a documentação de HTML da MDN e imagem PNG original em `assets/images/competencias.png`.

As pastas `css/` e `js/` estão reservadas para as próximas aulas. Seus arquivos `.gitkeep` são marcadores vazios para que o Git preserve essas pastas; não são CSS nem JavaScript.

Todos os códigos e notas são fictícios. A página desta aula não coleta dados nem calcula resultados.

## Como visualizar

Na pasta do repositório, execute `python -m http.server 8000` (ou `python3 -m http.server 8000`) e abra http://localhost:8000/index.html no navegador. Também é possível usar o Live Server do VS Code.

## Verificações da Aula 02

- Estrutura criada pelo terminal, com conferência de localização por `pwd` e pastas por `mkdir`.
- Verificação programática de abertura/fechamento das tags, HTML5, idioma, título, parágrafos, seis itens de lista e seis linhas de três colunas de dados na tabela.
- Conferência dos atributos `target`, `rel`, `alt` e caminho relativo da imagem.
- Verificação da integridade do PNG e inspeção visual da imagem.
- Servidor HTTP local: `index.html` e `assets/images/competencias.png` retornaram status 200.
- Sem CSS, JavaScript ou formulário nesta etapa.

## Limites do projeto acadêmico

Dados exclusivamente fictícios; sem backend, banco de dados, autenticação ou integrações externas. O link de referência apenas abre a documentação, sem integração com o sistema.

