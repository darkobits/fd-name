import { nr } from '@darkobits/ts';

export default nr(({ command, script }) => {
  // script('docs', {
  //   description: 'Start a local Docsify server that serves our documentation.',
  //   run: [
  //     command('docsify', ['docsify', ['serve', 'docs']])
  //   ]
  // });

  // script('publish', {
  //   group: 'Release',
  //   description: 'Publish the package using re-pack.',
  //   run: [
  //     command('re-pack', ['re-pack', ['publish']])
  //   ]
  // });

  // // N.B. nr will automatically run this for us after the 'build' script is run.
  // script('postBuild', {
  //   group: 'Build',
  //   description: 'Re-pack the project after building.',
  //   run: [
  //     // Remove the 'documentation' folder created by Docsify's postinstall
  //     // script on fresh installs.
  //     command('rm.docsify', ['del', ['documentation']]),
  //     command('re-pack', ['re-pack'])
  //   ]
  // });
});

// module.exports = require('@darkobits/ts').nr(({ createScript }) => {
//   createScript('prepare', {
//     description: 'No-op.',
//     run: [
//       ['lint', 'test']
//     ]
//   });
// });
