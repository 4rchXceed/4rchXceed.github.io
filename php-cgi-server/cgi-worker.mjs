import { PhpCgiWorker } from "./php-cgi-wasm/PhpCgiWorker.mjs";
const php = new PhpCgiWorker({
    prefix: '/php-cgi-server/webdevlearn/cgi',
    docroot: '/persist/www',
    types: {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        gif: 'image/gif',
        png: 'image/png',
        svg: 'image/svg+xml',
    }
});

// Set up the event handlers
self.addEventListener('install', event => php.handleInstallEvent(event));
self.addEventListener('activate', event => php.handleActivateEvent(event));
self.addEventListener('fetch', event => php.handleFetchEvent(event));
self.addEventListener('message', event => {
    console.log(event.data);
    if (event.data.action === "writeFile") {
        (async () => {
            const filePath = "/persist/www/" + event.data.params[0];
            console.log(filePath);
            const dirs = filePath.split('/').filter(Boolean);  // Split path into directories
            let currentPath = '';  // Start from the root
        
            console.log(dirs);
        
            // Check if '/persist' exists
            currentPath = '/persist';
            let files = await php.readdir(currentPath);
            if (!files.includes('www')) {
                await php.mkdir("/persist/www");
            }

            console.log(filePath);

            // Write the file at the given path
            await php.writeFile(filePath, `${event.data.params[1]}`, {encoding: 'utf8'});
            console.log(await php.readdir("/persist/www"));
        })();
    }
});