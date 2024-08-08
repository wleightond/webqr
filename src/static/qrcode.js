"use strict";
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

var state = {ready: false};
(async () => {
    let pyodide = await loadPyodide();
    state.pyodide = pyodide;
    await state.pyodide.loadPackage("micropip");
    const micropip = await state.pyodide.pyimport("micropip");
    await micropip.install("segno");
    state.ready = true;
})()

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', { scope: './' });
}

async function makeCode() {
    // the setup is async, so wait until it's done before trying to generate
    while (!state.ready) {await sleep(100)};

    await state.pyodide.runPython(`
        import js, segno
        value = js.document.getElementsByClassName("source-text")[0].value

        datauri = segno.make(value).png_data_uri(scale=16)

        js.document.getElementsByClassName("download")[0].href=datauri
        js.document.getElementsByClassName("qr-code")[0].src=datauri
        js.document.getElementsByClassName("qr-code")[0].alt=value
        js.document.getElementsByClassName("qr-code")[0].hidden=False
    `);
}
