import { onMessage, sendMessageFor } from './php-cgi-wasm/msg-bus.mjs';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);


const sendMessage = sendMessageFor("/php-cgi-server/");
sendMessage("writeFile", ["index.php", urlParams.get("code")]);

if (localStorage.getItem("code") === urlParams.get("code")) {
} else {
    localStorage.setItem("code", urlParams.get("code"));
    setTimeout(() => {
        location.reload();
    }, 2000);
}
