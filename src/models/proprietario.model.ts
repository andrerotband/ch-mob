export interface Proprietario {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  endereco?: string;
  obs?: string;
}

export const ProprietarioConfig = [
  { fieldName: 'nome', label: 'Nome', visible: true, type: 'string', required: true },
  { fieldName: 'telefone', label: 'Telefone', visible: true, type: 'phone', required: true },
  { fieldName: 'endereco', label: 'Endereço', visible: true, type: 'string', required: false },
  { fieldName: 'email', label: 'Email', visible: true, type: 'email', required: false },
  { fieldName: 'obs', label: "Observação", visible: true, type: 'string', required: false },
];
