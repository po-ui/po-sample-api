import { Injectable } from '@nestjs/common';

@Injectable()
export class BatchDeleteService {
  async receiveGridData(body: any) {
    console.log('Dados recebidos da grid:', body);
    return {
      message: 'Dados recebidos com sucesso!',
      total: body.items.length,
      keys: body.keys || [],
      paramDelete: body.paramDelete || false,
    };
  }

  async deleteItem(key: string) {
    console.log('DELETE - Requisição para deletar:', key);
    return {
      message: `Item ${key} deletado com sucesso!`,
      keys: key.split('|'),
    };
  }

  async deleteItemQuery(query: any) {
    console.log('DELETE - Requisição para deletar via query:', query);
    return {
      message: `Itens deletados com sucesso!`,
      keys: Object.values(query),
      query,
    };
  }
}
