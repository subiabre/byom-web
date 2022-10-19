import ioClient from "socket.io-client";
import { createNetFrom } from "../net";

export const io = ioClient(createNetFrom(import.meta.env).web.addr);
