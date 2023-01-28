/**
 * Função que define qual rota será buscada pela pesquisa.
 * @param {*} path é o ID de cada usuário ou post
 * @param {*} param é a defininção de quem será selecionado: users ou posts
 * @returns retorna uma Promise de Response do fetch de acordo com a busca realizada e definida pelos parâmetros da função.
 */
export const getRoute =
  (fetch) =>
  (path = '', param) =>
    fetch(`${process.env.API_URL}/${param}/${path}`);
