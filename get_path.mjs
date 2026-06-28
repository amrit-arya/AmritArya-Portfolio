import TextToSVG from 'text-to-svg';
import fs from 'fs';

const textToSVG = TextToSVG.loadSync('./public/LacheyardScript.otf');
const svg = textToSVG.getD('Amrit Arya', {x: 0, y: 0, fontSize: 140, anchor: 'top baseline'});
fs.writeFileSync('path.txt', svg);
