import { generateStandaloneHtml } from '../src/utils/exportHtml';
import fs from 'fs';
import path from 'path';

const html = generateStandaloneHtml();
const publicDir = path.resolve(import.meta.dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
fs.writeFileSync(path.join(publicDir, 'tower_blocks_game.html'), html, 'utf-8');
console.log('Successfully generated public/tower_blocks_game.html');
