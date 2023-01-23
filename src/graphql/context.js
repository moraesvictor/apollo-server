import fetch from 'node-fetch';
/**
 * Função que define qual rota será buscada pela pesquisa.
 * @param {*} path é o ID de cada usuário ou post
 * @param {*} param é a defininção de quem será selecionado: user ou post
 * @returns retorna uma Promise de Response do fetch de acordo com a busca realizada e definida pelos parâmetros da função.
 */
const getRoute = (path = '', param) =>
  fetch(`http://localhost:3000/${param}/${path}`);

export const context = () => {
  return {
    getRoute,
  };
};
