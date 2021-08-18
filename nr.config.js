module.exports = require('@darkobits/ts').nr(({ createScript }) => {
  createScript('prepare', {
    description: 'No-op.',
    run: [
      ['lint', 'test']
    ]
  });
});
