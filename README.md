# Web QR: Segno in the browser
At the moment, this exists because the web has way too many scammy QR code generators, and sometimes I just want to make a QR code without hitting a terminal. 

[Segno](https://github.com/heuer/segno/) is awesome (it makes properly spec-compliant QR codes with tons of configurability), and we used it on [canarytokens.org](https://canarytokens.org), but you can only use it from Python or the CLI. 

As an MVP, this project uses none of that configurability, but gives you a static page that can produce QR codes on the client-side with reasonable defaults in <100 LoC.

To keep it dead simple, I used [PicoCSS](https://picocss.com/) and [_Hyperscript](https://hyperscript.org/). To get Segno running in the browser I used [Pyodide](https://pyodide.org/).

If you would like to run it yourself, you can host a copy of `src/index.html` by whatever means you like.
