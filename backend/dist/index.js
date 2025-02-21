"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const z = __importStar(require("zod"));
const cors_1 = __importDefault(require("cors"));
const dataSchema = z.object({
    "data": z.array(z.string())
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.listen(4001, () => {
    console.log("Server is running on port 4001");
});
app.get("/bfhl", (req, res) => {
    res.json({ "operation_code": 1 });
});
app.post("/bfhl", (req, res) => {
    const reqData = req.body;
    console.log(reqData);
    const validataData = dataSchema.safeParse(reqData);
    if (!validataData.success) {
        res.status(400).json({ error: "Invalid data", is_success: false });
        return;
    }
    const incomingData = validataData.data.data;
    let numbers = [];
    let strings = [];
    let stringAsNumber = [];
    incomingData.forEach((item) => {
        if (isNaN(Number(item))) {
            strings.push(item);
            console.log("String: ", item);
        }
        else {
            numbers.push(Number(item));
            console.log("Number: ", item);
        }
    });
    strings.forEach((data) => {
        stringAsNumber.push(data.charCodeAt(0));
    });
    const max = Math.max(...stringAsNumber);
    res.json({
        is_success: true,
        "numbers": numbers,
        "strings": strings,
        "user_id": "john_doe_17091999",
        "email": "john@xyz.com",
        "roll_number": "ABCD123",
        "highest_alphabet": String.fromCharCode(max)
    });
});
