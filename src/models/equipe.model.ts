export interface Equipe {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  cpf_cnpj: string;
  endereco: string;
  obs?: string;
}

export const EquipeConfig = [
  { fieldName: 'nome', label: 'Nome', visible: true, type: 'string', required: true },
  { fieldName: 'cpf_cnpj', label: 'CPF/CNPJ', visible: false, type: 'string', required: false },
  { fieldName: 'telefone', label: 'Telefone', visible: true, type: 'phone', required: true },
  { fieldName: 'endereco', label: 'Endereço', visible: true, type: 'string', required: false },
  { fieldName: 'email', label: 'Email', visible: true, type: 'email', required: false },
  { fieldName: 'obs', label: "Observação", visible: true, type: 'string', required: false },
];
