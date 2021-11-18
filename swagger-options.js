const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "e-Test API",
            version: "0.1.0",
            description:
                "An electronic test api",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
        },
        servers: [
            {
            url: "http://localhost:5000",
            },
        ],
    },
    // apis: ["./routes/books.js"],
    apis: [
        './Routes/companyProfile',
        // './Routes/test',
        // './Routes/question',
        // './Routes/section',
        // './Routes/testScore',
        // './Routes/sectionScore',
        // './Routes/admin',
        // './Routes/candidate',
        // './Routes/authentication',
    ],
};

module.exports = options