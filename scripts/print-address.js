import * as dotenv from "dotenv";
import * as net from "../src/lib/net.js";
import QrCode from "qrcode";

dotenv.config({ path: '.env.local' });

const pad = (str) => '    '.concat(str);
const url = net.from(process.env);
const qr = await QrCode.toString(url.web);

console.log(pad(url.web));
console.log(qr);
