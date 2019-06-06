var CACHE_NAME = 'v1';

// This file is cached only because we are using this library in this sample
var localforage = '/localforage.min.js';

var assets = [
  '/',
  '/style.css',
  '/index.js',
];

// The following files are required to load WebViewer with the default UI
var externalFiles = [
  '/public/lib/core/external/decode.min.js',
  '/public/lib/core/external/rawinflate.js',
  '/public/lib/core/external/pako_inflate.min.js',
  '/public/lib/core/external/jquery-3.2.1.min.js',
  '/public/lib/core/external/html2canvas.min.js',
  '/public/lib/core/external/Promise.js',
];

var uiFiles = [
  '/public/lib/ui/build/index.html',
  '/public/lib/ui/build/style.css',
  '/public/lib/ui/build/webviewer-ui.min.js',
  '/public/lib/ui/build/i18n/translation-en.json',
];

var webViewerFiles = [
  '/public/lib/core/CoreControls.js',
  '/public/lib/core/CoreWorker.js',
  '/public/lib/webviewer.min.js',
];

// The following files are optional

// If you want to load a PDF file
var PDFWorkerFiles = [
  '/public/lib/core/pdf/pdfnet.res',
  '/public/lib/core/pdf/PDFworker.js',
  '/public/lib/core/pdf/lean/PDFNetC.gz.js.mem',
  '/public/lib/core/pdf/lean/PDFNetC.gz.mem',
  '/public/lib/core/pdf/lean/PDFNetCWasm.br.js.mem',
  '/public/lib/core/pdf/lean/PDFNetCWasm.br.wasm',
];
// If you want to load an Office file
var OfficeWorkerFiles = [
  '/public/lib/core/office/OfficeWorker.js',
  '/public/lib/core/office/WebOfficeWorker.gz.js.mem',
  '/public/lib/core/office/WebOfficeWorker.gz.mem',
  '/public/lib/core/office/WebOfficeWorkerWasm.br.js.mem',
  '/public/lib/core/office/WebOfficeWorkerWasm.br.wasm',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll([localforage].concat(
          assets,
          externalFiles,
          uiFiles,
          webViewerFiles,
          PDFWorkerFiles,
          OfficeWorkerFiles,
        ));
      }),
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true })
      .then(function(response) {
        if (response) {
          return response;
        }

        return fetch(event.request);
      }),
  );
});
