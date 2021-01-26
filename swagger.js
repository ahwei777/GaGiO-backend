const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json'; // 輸出的文件名稱
const endpointsFiles = ['./index.js']; // 要指向的 API，通常使用 Express 直接指向到 app.js 就可以

// Configuring
const doc = {
    info: {
        "description":
            "這是利用 `swagger-autogen` 搭配 `express` 建立的 RESTFUL API 文件，因採用 JWT 方式進行身分驗證，如需測試請於註冊後在 Authorize 內填入取得之 token 以進行需權限的操作",
        "version":"1.0",
        "title":"GaGiO Backend API Server",
        "contact":{
           "email":"puho999@hotmail.com.tw"
        },
        "license":{
           "name":"MIT",
           "url":"https://choosealicense.com/licenses/mit/"
        }
    },
    host: "",                         // by default: "localhost:3000"
    basePath: "",                     // by default: "/"
    schemes: [],                      // by default: ['http']
    consumes: [],                     // by default: ['application/json']
    produces: [],                     // by default: ['application/json']
    tags: [                           // by default: empty Array
        {
            "name": "Users",               // Tag name
            "description": "使用者相關"         // Tag description
        },
        {
            "name": "Courses",               // Tag name
            "description": "課程相關"         // Tag description
        },
        {
            "name": "Teachers",               // Tag name
            "description": "老師相關"         // Tag description
        },
        {
            "name": "Carts",               // Tag name
            "description": "購物車相關"         // Tag description
        },
        {
            "name": "Orders",               // Tag name
            "description": "訂單相關"         // Tag description
        },
        // { ... }
    ],
    securityDefinitions: {
        Bearer: {
            type: "apiKey",
            description: "Enter JWT Bearer Token **_only_**",
            name: "Authorization",
            in: "header"
        },
    },
    definitions: { }                  // by default: empty object
}

swaggerAutogen(outputFile, endpointsFiles, doc); // swaggerAutogen 的方法