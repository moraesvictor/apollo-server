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
   * @param {*} urlParams filtragem
   * @returns Todos os usuários do sistema
   */
  async getUsers(urlParams = {}) {
    return this.get('', urlParams);
  }
  /**
   * Função que através do método GET e o ID do usuário retorna o usuário pedido.
   * @param {*} id
   * @returns
   */
  async getUser(id) {
    return this.get(id);
  }
}
