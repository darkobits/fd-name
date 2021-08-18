import path from 'path';

import execa from 'execa';
import fs from 'fs-extra';
import tempy from 'tempy';

const pathToDirnameCjs = require.resolve('./cjs/index');
const pathToDirnameMjs = require.resolve('./mjs/index');
const pathToEsm = require.resolve('esm');

function createScript(path: string, contents: string) {
  fs.writeFileSync(path, contents);

  return () => {
    fs.removeSync(path);
  };
}

describe('dirname', () => {
  describe('in CJS environments', () => {
    it('should equal __dirname', () => {
      const tempFile = tempy.file({ extension: 'cjs' });

      const remove = createScript(tempFile, `
        const { dirname } = require("${pathToDirnameCjs}");
        if (dirname() !== __dirname) process.exit(1);
      `);

      expect(() => {
        try {
          execa.sync('node', [tempFile]);
        } finally {
          remove();
        }
      }).not.toThrow();
    });

    it('should equal the path to itself', () => {
      const tempFile = tempy.file({ extension: 'cjs' });

      const remove = createScript(tempFile, `
        const { dirname } = require("${pathToDirnameCjs}");
        if (dirname() !== "${path.dirname(tempFile)}") process.exit(1);
      `);

      expect(() => {
        try {
          execa.sync('node', [tempFile]);
        } finally {
          remove();
        }
      }).not.toThrow();
    });
  });

  describe('in "esm" environments', () => {
    it('should equal the path to itself', () => {
      const tempFile = tempy.file({ extension: 'js' });

      const remove = createScript(tempFile, `
        import { dirname } from "${pathToDirnameCjs}";
        if (dirname() !== "${path.dirname(tempFile)}") process.exit(1);
      `);

      expect(() => {
        try {
          execa.sync('node', ['--require', pathToEsm, tempFile]);
        } finally {
          remove();
        }
      }).not.toThrow();
    });
  });

  describe('in Node ESM environments', () => {
    it('should equal the path to itself', () => {
      const tempFile = tempy.file({ extension: 'mjs' });

      const remove = createScript(tempFile, `
        import { dirname } from "${pathToDirnameMjs}";
        if (dirname() !== "${path.dirname(tempFile)}") {
          console.log('IN TEST', dirname(), "${path.dirname(tempFile)}");
          process.exit(1);
        }
      `);

      expect(() => {
        try {
          execa.sync('node', [tempFile], { stdio: 'inherit' });
        } finally {
          remove();
        }
      }).not.toThrow();
    });
  });
});
