import { RESTDataSource } from '@apollo/datasource-rest';
import { makeDataLoader } from '../utils/dataloader.js';

/**
 * Classe que extende a classe RESTdataSource do Apollo
 * para realizar os métodos HTTP de uma API Rest e fazer o CRUD de usuários
 */
export class UserDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.API_URL}/users/`;
    // O Bind é utilizado para assegurar que a função a qual estamos trabalhando
    // faz referência exatamente a função getUsers. Pois ele cria uma Bound Function
    // que tem o mesmo corpo da função associada ao objeto especificado e seus parâmetros iniciais.
    this.dataLoader = makeDataLoader(this.getUsers.bind(this), 'users');
  }

  /**
   * Função que utiliza o método GET para retornar todos os usuários do sistema.
   * Todos os dados da requisição são salvos por 60s no cache conforme especificado em { ttl }.
   * Dessa forma, se a requisição for realizada antes do minuto consequente,
   * não será feito um fetch desnecessário.
   * @param {*} urlParams filtragem ASC e DESC
   * @returns Todos os usuários do sistema
   */
  async getUsers(urlParams = {}) {
    return this.get('', {
      params: urlParams,
      cacheOptions: { ttl: 60 },
    });
  }
  /**
   * Função que através do método GET e o ID do usuário retorna o usuário pedido.
   * Todos os dados da requisição são salvos por 60s no cache. Dessa forma, se a requisição
   * for realizada antes do minuto consequente, não será feito um fetch desnecessário.
   * @param {*} id
   * @returns O usuário que possui o ID passado.
   */
  async getUser(id) {
    return this.get(id, {
      cacheOptions: { ttl: 60 },
    });
  }
}
