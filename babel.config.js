export default {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
    // Add the allowDeclareFields option to the TypeScript preset
    ['@babel/preset-typescript', { allowDeclareFields: true }],
  ],
};
