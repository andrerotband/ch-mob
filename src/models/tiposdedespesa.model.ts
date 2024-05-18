export interface TiposdeDespesa {
  id: string;
  nome: string;
  descricao: string;
}

export const TiposdeDespesaConfig = [
  { fieldName: 'nome', label: 'Nome', visible: true, type: 'string', required: true },
  { fieldName: 'descricao', label: 'Descrição', visible: true, type: 'string', required: true },
];
