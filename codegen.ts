import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://localhost:443/gateway/graphql',
  documents: 'src/**/*.{ts,tsx}',
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
