"use strict";
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

// we need to keep a copy of pyodide around 
// so we don't have to keep reinstalling segno on every call
var state = {ready: false};
async function setup() {
    let pyodide = await loadPyodide();
    state.pyodide = pyodide;
    await state.pyodide.loadPackage("micropip");
    const micropip = await state.pyodide.pyimport("micropip");
    await micropip.install("segno");
    state.ready = true;
}
setup();

async function makeCode() {
    // the setup is async, so wait until it's done before trying to generate
    while (!state.ready) {await sleep(100)};

    await state.pyodide.runPython(`
        import js, segno
        value = js.document.getElementsByClassName("source-text")[0].value

        datauri = segno.make(value).png_data_uri(scale=16)

        js.document.getElementsByClassName("download")[0].href=datauri
        js.document.getElementsByClassName("qr-code")[0].src=datauri
    `);
}
