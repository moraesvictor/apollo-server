import { RESTDataSource } from '@apollo/datasource-rest';

/**
 * Classe que extende o a classe RESTdataSource do Apollo
 * para realizar os métodos HTTP de uma API Rest e fazer o CRUD de usuários
 */
export class UserDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.API_URL}/users/`;
  }

  /**
   * Função que utiliza o método GET para retornar todos os usuários do sistema.
   * Todos os dados da requisição são salvos por 60s no cache. Dessa forma, se a requisição
   * for realizada antes do minuto consequente, não será feito um fetch desnecessário.
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
