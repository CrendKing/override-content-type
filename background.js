let g_overrides = {}
browser.storage.local.get().then((overrides) => { g_overrides = overrides })
browser.storage.onChanged.addListener((changes, area) => {
    if (area === 'local') {
        for (const url in changes) {
            g_overrides[url] = changes[url].newValue
        }
    }
})

function overrideContentType(details) {
    for (const url in g_overrides) {
        if (!details.url.match(new RegExp(url))) {
            return
        }

        for (let header of details.responseHeaders) {
            if (header.name.toLowerCase() === 'content-type') {
                header.value = g_overrides[url]
                return {
                    responseHeaders: details.responseHeaders
                }
            }
        }
    }
}

browser.webRequest.onHeadersReceived.addListener(
    overrideContentType,
    {
        urls: ['*://*/*'],
        types: ['main_frame', 'sub_frame', 'other']
    },
    ['blocking', 'responseHeaders']
)
