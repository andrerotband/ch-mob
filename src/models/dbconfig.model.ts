import { DBOptions } from "./item-config";

export const dbAptos: DBOptions = {
   path: '/aptos',
   orderBy: 'apelido',
   key: 'id',
   value: 'apelido'
};

export const dbEquipes: DBOptions = {
   path: '/equipes',
   orderBy: 'nome',
   orderDir: 'asc',
   key: 'id',
   value: 'nome'
};

export const dbProps: DBOptions = {
   path: '/proprietarios',
   orderBy: 'nome',
   key: 'id',
   value: 'nome'
};

export const dbReservas: DBOptions = {
   path: '/reservas',
   orderBy: 'checkin',
   orderDir: 'desc',
   key: 'id',
   value: 'obs'
};

export const dbTiposdeDespesas: DBOptions = {
   path: '/tiposdedespesas',
   orderBy: 'nome',
   orderDir: 'asc',
   key: 'id',
   value: 'nome'
};
