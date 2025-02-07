const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

/**
 * Convert a PDF file to a single image (first page only) using pdftoppm
 * @param {Object} options - Configuration object
 * @param {string} options.pdfPath - Path to the PDF file
 * @param {string} options.outputPath - Output file path
 * @param {string} [options.format='png'] - Output image format (png, jpeg)
 * @param {number} [options.dpi=300] - Resolution in DPI (default: 300)
 * @returns {Promise<string>} - Path of the generated image
 */
function pdfsnap({ pdfPath, outputPath, format = 'png', dpi = 300 }) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(pdfPath)) {
      return reject(new Error('PDF file does not exist'));
    }

    const outputPrefix = outputPath.replace(`.${format}`, '');
    const command = `pdftoppm -${format} -r ${dpi} -f 1 -l 1 "${pdfPath}" "${outputPrefix}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }

      const generatedFile = `${outputPrefix}-1.${format}`;
      if (!fs.existsSync(generatedFile)) {
        return reject(new Error('No image was generated'));
      }

      fs.renameSync(generatedFile, outputPath);
      resolve(outputPath);
    });
  });
}

module.exports = { pdfsnap };

