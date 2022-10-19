import * as dotenv from "dotenv";
import * as net from "../src/lib/net.js";
import QrCode from "qrcode";

dotenv.config({ path: '.env.local' });

const pad = (str) => '    '.concat(str);
const url = net.createNetFrom(process.env);
const qr = await QrCode.toString(url.web.addr);

console.log(pad(url.web.addr));
console.log(qr);
