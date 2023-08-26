import * as fs from "fs";

/**
 * Generate a new Bit template.
 *
 * @param {string} path - The path to the folder where the Bit will be created.
 * @returns {string} The path to the Bit.
 */
export function generateBit(path) {
	const BASE_PATH = path;
	const id = getNextBitId(BASE_PATH);
	const fileName = zeroPad(id, 4);
	const FILE_PATH = `${BASE_PATH}/${fileName}.md`;

	const frontmatter = {
		datetime: new Date().toISOString(),
	};

	const writeStream = fs.createWriteStream(FILE_PATH);

	writeStream.write("---\n");
	for (const [key, value] of Object.entries(frontmatter)) {
		writeStream.write(`${key}: ${value}\n`);
	}
	writeStream.write("---\n");
	writeStream.write("\n");
	writeStream.write("{/* Happy writing! */}");
	writeStream.write("\n");
	writeStream.end();

	return FILE_PATH;
}

/**
 * Get the next Bit id.
 *
 * @param {string} path - The path to the Bits folder.
 * @returns {number} The next Bit id.
 */
function getNextBitId(path) {
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
	return String(num).padStart(places, "0");
}
