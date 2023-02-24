import * as fs from 'fs';

/**
 * Generate a new TIL template.
 *
 * @param {string} path - The path to the folder where the TIL will be created.
 * @returns {string} The path to the TIL.
 */
export function generateTIL(path) {
	const BASE_PATH = path;
	const id = getNextTILId(BASE_PATH);
	const fileName = zeroPad(id, 4);

	const frontmatter = {
		id,
		datetime: new Date().toISOString()
	};

	fs.mkdirSync(`${BASE_PATH}/${fileName}/`);

	const writeStream = fs.createWriteStream(`${BASE_PATH}/${fileName}.md`);

	writeStream.write('---\n');
	for (const [key, value] of Object.entries(frontmatter)) {
		writeStream.write(`${key}: ${value}\n`);
	}
	writeStream.write('---\n');
	writeStream.write('\n');
	writeStream.write('{/* Happy writing! */}');
	writeStream.write('\n');
	writeStream.end();

	return `${BASE_PATH}/${fileName}.md`;
}

/**
 * Get the next TIL id.
 *
 * @param {string} path - The path to the TILs folder.
 * @returns {number} The next TIL id.
 */
function getNextTILId(path) {
	const files = fs.readdirSync(path);
	return files.length + 1;
}

/**
 * Pad a number with leading zeros.
 *
 * @param {number} num - The number to pad.
 * @param {number} places - The number of places to pad.
 * @returns {string} The padded number.
 */
function zeroPad(num, places) {
	return String(num).padStart(places, '0');
}
