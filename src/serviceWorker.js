var CACHE_NAME = 'v2';

// This file is cached only because we are using this library in this sample
var localforage = '/scripts/localforage.min.js';

var assets = [
  '/',
  '/style.css',
  '/index.js',
  `/scripts/pwacompat.min.js`,
  `/manifest.json`,
  '/images/ic_launcher-48.png',
  '/images/ic_launcher-72.png',
  '/images/ic_launcher-96.png',
  '/images/ic_launcher-144.png',
  '/images/ic_launcher-192.png',
  '/images/ic_launcher-512.png',
  'https://fonts.googleapis.com/css?family=Roboto',
  'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600',
  'https://fonts.gstatic.com/s/roboto/v19/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
];

// The following files are required to load WebViewer with the default UI
var externalFiles = [
  '/public/lib/core/external/decode.min.js',
  '/public/lib/core/external/pako_inflate.min.js',
  '/public/lib/core/external/Promise.js',
  '/public/lib/core/external/model-viewer-1.3.0.min.js',
  '/public/lib/core/external/model-viewer-legacy-1.3.0.min.js',
  '/public/lib/core/external/pikaday.css',
  '/public/lib/core/external/quill.css',
];

var uiFiles = [
  '/public/lib/ui/index.html',
  '/public/lib/ui/style.css',
  '/public/lib/ui/webviewer-ui.min.js',
  '/public/lib/ui/i18n/translation-en.json',
  '/public/lib/ui/assets/fonts/Lato-Regular.woff',
  '/public/lib/ui/assets/fonts/Lato-Bold.woff',
  '/public/lib/ui/assets/fonts/GreatVibes-Regular.woff2',
];

var webViewerFiles = [
  '/public/lib/core/webviewer-core.min.js',
  '/public/lib/core/Worker.js',
  '/public/lib/core/contentEdit/InfixServerModule.js',
  '/public/lib/core/contentEdit/InfixServer.js',
  '/public/lib/core/contentEdit/InfixServer.mem',
  '/public/lib/core/contentEdit/InfixServer.wasm',
  '/public/lib/core/ExternalAnnotationMerger.chunk.js',
  '/public/lib/core/AndroidContentPartRetriever.chunk.js',
  '/public/lib/core/ArrayBufferPdfPartRetriever.chunk.js',
  '/public/lib/core/AzurePartRetriever.chunk.js',
  '/public/lib/core/ExternalPdfPartRetriever.chunk.js',
  '/public/lib/core/HttpPartRetriever.chunk.js',
  '/public/lib/core/IOSPartRetriever.chunk.js',
  '/public/lib/core/LocalPartRetriever.chunk.js',
  '/public/lib/core/LocalPdfPartRetriever.chunk.js',
  '/public/lib/core/StreamingPartRetriever.chunk.js',
  '/public/lib/core/WebDBPartRetriever.chunk.js',
  '/public/lib/core/WebViewerServerPartRetriever.chunk.js',
  '/public/lib/core/WinRTPartRetriever.chunk.js',
  '/public/lib/core/22.chunk.js',
  '/public/lib/core/ContentEdit.chunk.js',
  '/public/lib/core/CORSWorker.js',
  '/public/lib/core/DecryptWorker.js',
  '/public/lib/core/PDFInfoVersion1.chunk.js',
  '/public/lib/core/pikaday.chunk.js',
  '/public/lib/core/SelectionInfoOld.chunk.js',
  '/public/lib/core/vendors.ascii85.chunk.js',
  '/public/lib/core/vendors.ascii85.quill.chunk.js',
  '/public/lib/core/vendors.pako.chunk.js',
  '/public/lib/core/vendors.quill.chunk.js',
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


  
  '/public/lib/core/legacyOffice/LegacyOfficeWorker.js',
  '/public/lib/core/legacyOffice/WebB2XOfficeWorker.gz.js.mem',
  '/public/lib/core/legacyOffice/WebB2XOfficeWorker.gz.mem',
  '/public/lib/core/legacyOffice/WebB2XOfficeWorkerWasm.br.js.mem',
  '/public/lib/core/legacyOffice/WebB2XOfficeWorkerWasm.br.wasm',
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
