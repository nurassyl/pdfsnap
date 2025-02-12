# pdfsnap

**pdfsnap** is a simple Node.js utility to convert the first page of a PDF into an image using `pdftoppm` from Poppler.

## Features
- Extracts the **first page** of a PDF and converts it to an image.
- Supports **PNG** and **JPEG** formats.
- Uses `pdftoppm` for fast and accurate conversion.
- Simple API for easy integration.

## Installation

Ensure you have **Poppler** installed on your system:

### Ubuntu/Debian
```sh
sudo apt update && sudo apt install poppler-utils -y
```

### macOS (via Homebrew)
```sh
brew install poppler
```

Then, install **pdfsnap** via npm or yarn:

```sh
npm install pdfsnap
```

```sh
yarn add pdfsnap
```

## Usage

```js
const { pdfsnap } = require('pdfsnap');

pdfsnap({
  pdfPath: 'sample.pdf',
  outputPath: 'output.png',
  format: 'png',
  dpi: 300,
})
  .then(filePath => console.log('Image saved at:', filePath))
  .catch(error => console.error('Error:', error));
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

