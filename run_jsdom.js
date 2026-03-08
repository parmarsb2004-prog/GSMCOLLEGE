import { JSDOM } from 'jsdom';

(async () => {
  try {
    const dom = await JSDOM.fromURL('http://localhost:8080', {
      runScripts: "dangerously",
      resources: "usable",
      pretendToBeVisual: true
    });
    dom.window.console.log = (...args) => console.log("LOG:", ...args);
    dom.window.console.error = (...args) => console.log("ERR:", ...args);
    dom.window.addEventListener("error", (event) => {
      console.log("JSDOM UNCAUGHT ERROR:", event.error);
    });
    console.log("JSDOM launched... waiting 5 seconds for React to mount.");
    setTimeout(() => {
      console.log("JSDOM DONE. Body HTML:", dom.window.document.body.innerHTML.substring(0, 300));
      process.exit(0);
    }, 5000);
  } catch (err) {
    console.error("Failed to load JSDOM:", err);
  }
})();
