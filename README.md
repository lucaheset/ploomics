# PLOOMICS
## Conteúdo:

- [Introdução](#getting_started)
- [Configurações e Utilidades](#config)
- [Desenvolvimento e Design](#usage)
- [Funcionalidades](#features)

## Introdução <a name = "about"></a>

Este documento serve como uma visão geral e documentação para a aplicação desenvolvida para interagir com a API da Marvel, focada na apresentação de quadrinhos, personagens e criadores. A interface gráfica foi desenvolvida por mim, com o objetivo de proporcionar uma experiência de usuário intuitiva e envolvente, utilizando React e TypeScript.

## Configurações e Utilitários<a name = "config"></a>

Componentes Principais

App.tsx: O componente raiz da aplicação, configurando o roteamento e a estrutura global.

main.tsx: O ponto de entrada da aplicação, responsável por renderizar o App.


Utilitários e Configurações

SetAPI.tsx: Configurações para conexão com a API externa da Marvel.
types.ts: Definições de tipos TypeScript para padronizar os dados manipulados.
useAuth.ts e useLoading.ts: Hooks personalizados para autenticação e gerenciamento do estado de carregamento.


## Desenvolvimento e Design <a name = "usage"></a>

A aplicação utiliza React e TypeScript, com uma abordagem de design que prioriza a usabilidade e a estética visual. O uso de styled-components permite a criação de componentes estilizados que contribuem para uma interface coesa e atraente.

Estilos
Arquivos como ApiInputButtonStyles.ts, FilterStyle.ts, HeaderStyle.ts, entre outros, definem os estilos específicos para componentes chave da aplicação, garantindo uma experiência visual consistente.

#Funcionalidades <a name = "features"></a>

A aplicação oferece diversas funcionalidades, projetadas para melhorar a experiência do usuário ao explorar conteúdos da Marvel:

Dentre elas estão:

Tela de Autenticação: Possibilita ao usuário adicionar manualmente as chaves de autenticação (public key e private key) para uso da API. As chaves inseridas são persistidas nos cookies do navegador.

Telas de Listagem: Existem 3 telas para listagem de itens: personagens, quadrinhos e criadores, todas com scroll infinito ou paginação.

Navegação e Filtragem: Possibilidade de navegar facilmente pela lista de personagens, quadrinhos e criadores, com filtros para refinar as buscas.

Tela do Item: Permite clicar nos itens listados e abrir uma tela contendo seus detalhes.

Filtros por Opções e Data de Lançamento: Inclui filtros detalhados nas listagens, como por criador e personagens, e filtros por data de lançamento.

Links entre Entidades: Apresenta itens relacionados ao final de cada entidade, com a possibilidade de visualizar a descrição desses itens clicando neles.

Tela de Itens Favoritos: Possibilita favoritar itens e visualizá-los em uma tela dedicada, com a opção de organizar em categorias personalizadas.

Detalhes e Favoritos: Visualização de detalhes específicos sobre cada item e adição de quadrinhos aos favoritos para acesso rápido.
Autenticação e Segurança: Sistema de autenticação robusto para uma experiência segura e personalizada.
