import app from './app.js';

async function main() {
    await app.listen(process.env.SERVER_PORT);
    console.log(`SERVER ON PORT ${process.env.SERVER_PORT}`)
}

main();