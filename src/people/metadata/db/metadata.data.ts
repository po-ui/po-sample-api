export const metadata = [
  {
    version: 1, type: 'list', title: '(M) Lista de clientes v1',
    fields: [
      { property: 'id', key: true },
      { property: 'name' },
      { property: 'birthdate' },
      { property: 'genre' },
      { property: 'city' }
    ]
  }, {
    version: 2, type: 'list', title: '(M) Lista de clientes v2', breadcrumb: { items: [ { label: 'Início', link: '/' }, { label: 'Cliente' } ] },
    actions: { detail: 'detail/:id', edit: 'edit/:id', new: 'new', remove: true },
    fields: [
      { property: 'id', key: true, visible: false },
      { property: 'name', filter: true, gridColumns: 6 },
      { property: 'birthdate', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'genre' },
      { property: 'city' }
    ]
  }, {
    version: 3, type: 'list', autoRouter: true, title: '(M) Lista de clientes v3', breadcrumb: { items: [ { label: 'Início', link: '/' }, { label: 'Cliente' } ] },
    actions: {
      detail: 'detail/:id',
      duplicate: 'new',
      edit: 'edit/:id',
      new: 'new',
      remove: true,
      removeAll: true
    },
    fields: [
      { property: 'id', visible: false, key: true },
      { property: 'name', label: 'Nome', filter: true, gridColumns: 6 },
      { property: 'nickname', label: 'Apelido' },
      { property: 'email', label: 'E-mail' },
      { property: 'birthdate', label: 'Nascimento', type: 'date', format: 'dd/MM/yyyy', width: '100px' },
      { property: 'city', label: 'Cidade', filter: true, gridColumns: 6,
        optionsService: this.cityService, params: { transform: true } },
      { property: 'genre', label: 'Gênero', type: 'subtitle', width: '80px', filter: true, gridColumns: 7,
        options: [
          { value: 'female', label: 'Feminino' },
          { value: 'male', label: 'Masculino' },
          { value: 'other', label: 'Outros' },
        ],
        subtitles: [
          { value: 'female', color: 'color-05', content: 'F', label: 'Feminino' },
          { value: 'male', color: 'color-02', content: 'M', label: 'Masculino' },
          { value: 'other', color: 'color-08', content: 'O', label: 'Outros' },
        ]
      },
      { property: 'status', type: 'label', optionsMulti: true, filter: true, gridColumns: 5,
        options: [
          { value: 'active', label: 'Ativo' },
          { value: 'inactive', label: 'Inativo' }
        ],
        labels: [
          { value: 'active', color: 'color-10', label: 'Ativo' },
          { value: 'inactive', color: 'color-07', label: 'Inativo' }
        ]
      }
    ]
  }, {
    version: 1, type: 'detail', title: '(M) Detalhes do cliente v1',
    fields: [
      { property: 'id', key: true },
      { property: 'status' },
      { property: 'name' },
      { property: 'nickname' },
      { property: 'birthdate', label: 'Birth date' },
      { property: 'genre' },
      { property: 'city' },
      { property: 'country' }
    ]
  }, {
    version: 2, type: 'detail', title: '(M) Detalhes do cliente v2',
    actions: { back: false, edit: 'detail/:id' },
    breadcrumb: { items: [ { label: 'Início', link: '/' }, { label: 'Clientes', link: '/' }, { label: 'Detalhes' } ] },
    fields: [
      { property: 'id', key: true },
      { property: 'status', tag: true },
      { property: 'name' },
      { property: 'nickname' },
      { property: 'email', label: 'E-mail' },
      { property: 'birthdate', label: 'Birth date', type: 'date' },
      { property: 'genre' },
      { property: 'nationality' },
      { property: 'father', label: 'Nome do pai' },
      { property: 'mother', label: 'Nome da mãe' },
      { property: 'street' },
      { property: 'city' },
      { property: 'country' },
    ]
  }, {
    version: 3, type: 'detail', title: '(M) Detalhes do cliente v3',
    actions: { back: '/',  edit: 'edit/:id', remove: '/' },
    breadcrumb: { items: [ { label: 'Início', link: '/' }, { label: 'Clientes', link: '/' }, { label: 'Detalhes' } ] },
    fields: [
      { property: 'id', visible: false, key: true },
      { property: 'name', label: 'Nome', divider: 'Dados pessoais', gridColumns: 5 },
      { property: 'email', label: 'E-mail', gridColumns: 5 },
      { property: 'statusDescription', label: 'Status', tag: true, gridColumns: 2, color: 'color-10' },
      { property: 'nickname', label: 'Apelido', gridColumns: 3 },
      { property: 'birthdate', label: 'Nascimento', type: 'date', format: 'dd/MM/yyyy', gridColumns: 3 },
      { property: 'genreDescription', label: 'Gênero', gridColumns: 3 },
      { property: 'nationality', label: 'Nacionalidade', gridColumns: 3 },
      { property: 'street', label: 'Rua', divider: 'Endereço', gridColumns: 6 },
      { property: 'cityName', label: 'Cidade', gridColumns: 3 },
      { property: 'country', label: 'País', gridColumns: 3 },
      { property: 'mother', label: 'Nome da mãe', divider: 'Filiação', gridColumns: 5 },
      { property: 'father', label: 'Nome do pai', gridColumns: 5 },
    ]
  }, {
    version: 1, type: 'create', title: '(M) Novo cliente v1',
    fields: [
      { property: 'id', key: true },
      { property: 'status' },
      { property: 'name' },
      { property: 'nickname' },
      { property: 'birthdate', label: 'Nascimento' },
      { property: 'genre' },
      { property: 'city' },
      { property: 'country' }
    ]
  }, {
    version: 2, type: 'create', title: '(M) Novo cliente v2',
    actions: { save: '/', cancel: '/' },
    breadcrumb: { items: [ { label: 'Início', link: '/' }, { label: 'Clientes', link: '/' }, { label: 'Novo' } ] },
    fields: [
      { property: 'id', key: true },
      { property: 'status', options: ['active', 'inactive'] },
      { property: 'name', required: true },
      { property: 'nickname' },
      { property: 'email', label: 'E-mail', required: true },
      { property: 'birthdate', label: 'Nascimento', type: 'date' },
      { property: 'genre', options: ['female', 'male', 'others'] },
      { property: 'nationality' },
      { property: 'father', label: 'Nome do pai' },
      { property: 'mother', label: 'Nome da mãe' },
      { property: 'street' },
      { property: 'city' },
      { property: 'country' },
    ]
  }, {
    version: 3, type: 'create', title: '(M) Novo cliente v3',
    actions: { save: '/', saveNew: true, cancel: '/' },
    breadcrumb: { items: [ { label: 'Início', link: '/' }, { label: 'Clientes', link: '/' }, { label: 'Novo' } ] },
    fields: [
      { property: 'name', label: 'Nome completo', divider: 'Dados pessoais', required: true, gridColumns: 5 },
      { property: 'email', label: 'E-mail', required: true, gridColumns: 5 },
      { property: 'status', type: 'boolean', booleanFalse: 'Inativo', booleanTrue: 'Ativo', required: true, gridColumns: 2 },
      { property: 'nickname', label: 'Apelido', optional: true, gridColumns: 3 },
      { property: 'birthdate', label: 'Nascimento', type: 'date', optional: true, gridColumns: 2 },
      { property: 'genre', label: 'Gênero', optional: true, gridColumns: 4, options: [
        { value: 'female', label: 'Feminino' },
        { value: 'male', label: 'Masculino' },
        { value: 'other', label: 'Outros' },
      ] },
      { property: 'nationality', label: 'Nacionalidade', optional: true, gridColumns: 3 },
      { property: 'street', label: 'Rua', divider: 'Endereço', required: true, gridColumns: 4 },
      {
        property: 'city',
        label: 'Cidade',
        required: true,
        gridColumns: 3,
        optionsService: 'https://po-sample-api.herokuapp.com/v1/cities',
        params: { transform: true }
      },
      { property: 'country', label: 'País', optional: true, gridColumns: 3 },
      { property: 'mother', label: 'Nome da mãe', optional: true, divider: 'Filiação', gridColumns: 5 },
      { property: 'father', label: 'Nome do pai', optional: true, gridColumns: 5 },
    ]
  }, {
    version: 1, type: 'edit', title: '(M) Editando cliente v1',
    fields: [
      { property: 'id', key: true, disabled: true },
      { property: 'status' },
      { property: 'name' },
      { property: 'nickname' },
      { property: 'birthdate', label: 'Birth date' },
      { property: 'genre' },
      { property: 'city' },
      { property: 'country' }
    ]
  }, {
    version: 2, type: 'edit', title: '(M) Editando cliente v2',
    actions: { save: '/', cancel: '/' },
    breadcrumb: { items: [ { label: 'Início', link: '/' }, { label: 'Clientes', link: '/' }, { label: 'Editando' } ] },
    fields: [
      { property: 'id', label: 'User ID', key: true, disabled: true },
      { property: 'status', options: ['active', 'inactive'] },
      { property: 'name', required: true },
      { property: 'nickname' },
      { property: 'email', label: 'E-mail', required: true },
      { property: 'birthdate', label: 'Birth date', type: 'date' },
      { property: 'genre', options: ['female', 'male', 'others'] },
      { property: 'nationality' },
      { property: 'birthPlace', label: 'Place of birth' },
      { property: 'graduation' },
      { property: 'father', label: 'Father`s name' },
      { property: 'mother', label: 'Mother`s name' },
      { property: 'dependents' },
      { property: 'street' },
      { property: 'city' },
      { property: 'country' },
    ]
  }, {
    version: 3, type: 'edit', title: '(M) Editando cliente v3',
    actions: { save: '/', saveNew: 'metadata-new/', cancel: '/' },
    breadcrumb: { items: [ { label: 'Início', link: '/' }, { label: 'Clientes', link: '/' }, { label: 'Editando' } ] },
    fields: [
      { property: 'name', label: 'Nome completo', divider: 'Dados pessoais', disabled: true, gridColumns: 5 },
      { property: 'email', label: 'E-mail', disabled: true, gridColumns: 5 },
      { property: 'status', type: 'boolean', booleanFalse: 'Inativo', booleanTrue: 'Ativo', disabled: true, gridColumns: 2 },
      { property: 'nickname', label: 'Apelido', optional: true, gridColumns: 3 },
      { property: 'birthdate', label: 'Nascimento', type: 'date', optional: true, gridColumns: 2 },
      { property: 'genre', label: 'Gênero', optional: true, gridColumns: 4, options: [
        { value: 'female', label: 'Feminino' },
        { value: 'male', label: 'Masculino' },
        { value: 'other', label: 'Outros' },
      ] },
      { property: 'nationality', label: 'Nacionalidade', optional: true, gridColumns: 3 },
      { property: 'street', label: 'Rua', divider: 'Endereço', required: true, gridColumns: 4 },
      {
        property: 'city',
        label: 'Cidade',
        required: true,
        gridColumns: 3,
        optionsService: 'https://po-sample-api.herokuapp.com/v1/cities',
        params: { transform: true }
      },
      { property: 'country', label: 'País', optional: true, gridColumns: 3 },
      { property: 'mother', label: 'Nome da mãe', optional: true, divider: 'Filiação', gridColumns: 5 },
      { property: 'father', label: 'Nome do pai', optional: true, gridColumns: 5 },
    ]
  }
];
