export const processes = [
  { processID: 'process1', description: 'Release new version' },
  { processID: 'process2', description: 'Run E2E tests' },
  { processID: 'process3', description: 'Run build' },
  { processID: 'process4', description: 'Update portinari-portal' },
  { processID: 'process5', description: 'Clear sample database' },
];

export const parameters = {
  process1: [
    {
      property: 'version',
      required: true,
      gridLgColumns: '6',
      gridXlColumns: '6',
      divider: 'Package information'
    },
    {
      property: 'packages',
      label: 'Packages to upgrade',
      optionsMulti: true,
      gridLgColumns: '6',
      gridXlColumns: '6',
      options: [
        { value: 'ui' },
        { value: 'templates' },
        { value: 'sync' },
        { value: 'storage' },
        { value: 'code-editor' },
      ]
    },
    {
      property: 'user',
      divider: 'NPM Credentials',
      gridXlColumns: '6',
      gridLgColumns: '6'
    },
    {
      property: 'password',
      secret: true,
      gridXlColumns: '6',
      gridLgColumns: '6'
    },
  ],
  process2: [
    {
      property: 'packages',
      label: 'Packages to validate',
      optionsMulti: true,
      gridLgColumns: '6',
      gridXlColumns: '6',
      options: [
        { value: 'ui' },
        { value: 'templates' },
        { value: 'sync' },
        { value: 'storage' },
        { value: 'code-editor' },
      ]
    },
  ],
  process3: [
    {
      property: 'options',
      label: 'Additional customization',
      gridLgColumns: '12', gridXlColumns: '12',
      optionsMulti: true,
      options: [
        { value: 'installDependencies', label: 'Install dependencies' },
        { value: 'unitTest', label: 'Run unit tests' },
        { value: 'lint', label: 'Run lint' }
      ]
    }
  ],
  process4: [
    {
      property: 'version',
      required: true,
      gridLgColumns: '6',
      gridXlColumns: '6'
    }
  ],
  process5: []
};
