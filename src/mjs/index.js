import callsites from 'callsites';

/**
 * @private
 *
 * Returns the absolute path to the file that called the function, excluding
 * `excludedFile`, if provided.
 */
function _filename(excludeFile) {
  const stack = callsites();

  for (const callSite of stack) {
    const fileName = callSite.getFileName();
    if (fileName && (excludeFile ? fileName !== excludeFile : true)) return fileName;
  }
}

/**
 * @private
 *
 * Absolute path to this file, used to filer call stacks.
 */
const thisFile = _filename();

/**
 * Returns the absolute path of the file from which the function was called.
 */
export function filename() {
  return _filename(thisFile)?.replace(/^file:\/\//, '');
}

/**
 * Returns the absolute path of the directory from which the function was
 * called.
 */
export function dirname() {
  return filename()?.replace(/\/[^/]*$/, '');
}

export default {
  filename,
  dirname
};
