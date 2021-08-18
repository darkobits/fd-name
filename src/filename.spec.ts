import execa from 'execa';
import fs from 'fs-extra';
import tempy from 'tempy';

const pathToFilenameCjs = require.resolve('./cjs/index');
const pathToFilenameMjs = require.resolve('./mjs/index');
const pathToEsm = require.resolve('esm');

function createScript(path: string, contents: string) {
  fs.writeFileSync(path, contents);

  return () => {
    fs.removeSync(path);
  };
}

describe('filename', () => {
  describe('in CJS environments', () => {
    it('should equal __filename', () => {
      const tempFile = tempy.file({ extension: 'cjs' });

      const remove = createScript(tempFile, `
        const { filename } = require("${pathToFilenameCjs}");
        if (filename() !== __filename) process.exit(1);
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
        const { filename } = require("${pathToFilenameCjs}");
        if (filename() !== "${tempFile}") process.exit(1);
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
        import { filename } from "${pathToFilenameCjs}";
        if (filename() !== "${tempFile}") process.exit(1);
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
        import { filename } from "${pathToFilenameMjs}";
        if (filename() !== "${tempFile}") process.exit(1);
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
});
