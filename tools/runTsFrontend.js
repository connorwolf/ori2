"use strict";
exports.__esModule = true;
var KrystalClient_1 = require("../app/KrystalClient");
var client = new KrystalClient_1.KrystalClient(require("../app/config/krystal"));
client.start();
