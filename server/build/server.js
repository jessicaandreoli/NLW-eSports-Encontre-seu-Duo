"use strict";
//const express required ('express') - posso importar assim - não preciso mudar nd no código
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Dessa forma aqui de baixo vou no package json e acrescento type module abaixo do name
//e muda o nome do arquivo para mjs(module js)
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
//www.minhaapi.com/ o que vem depois dessa barra é o que preciso passar de caminho no get
app.get('/ads', (request, response) => {
    return response.json([
        { id: 1, name: 'Anúncio 1' },
        { id: 2, name: 'Anúncio 2' },
        { id: 3, name: 'Anúncio 3' },
        { id: 4, name: 'Anúncio 4' },
        { id: 5, name: 'Anúncio 5' },
    ]);
});
//está rodando na porta 3333- localhost
app.listen(3333);
