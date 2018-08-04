import { KrystalClient } from "../app/KrystalClient";

const client = new KrystalClient(require("../app/config/krystal"));
client.start();