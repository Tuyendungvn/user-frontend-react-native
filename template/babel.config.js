module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@assets': './src/assets',
          '@common': './src/common',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@layouts': './src/layouts',
          '@redux': './src/redux',
          '@routes': './src/routes',
          '@screens': './src/screens',
          '@services': './src/services',
          '@typings': './src/typings',
          '@designs': './src/designs',
          '@navigator': './src/navigator',
          '@fragments': './src/fragments',
          '@apiCaller': './src/apiCaller.ts',
          '@components': './src/components',
         

        },
      },
    ],
    ['module:react-native-dotenv'],
    'react-native-reanimated/plugin',
  ],
};
