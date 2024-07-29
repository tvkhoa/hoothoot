import swc from '@rollup/plugin-swc';

export default {
  input: 'src/index.js',
  output: [{
    file: 'es/index.js',
    format: 'es',
  }, {
    file: 'lib/index.cjs',
    format: 'cjs',
  }],
  plugins: [swc({
    env: {
      targets: [
        '>0.2%',
        'not dead',
        'not ie <= 8',
        'not op_mini all',
      ],
    },
  })],
  external: /lodash\/.*/,
};
