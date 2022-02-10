module.exports = {
    staticFileGlobs: [
        './',
        './**.{css,html,js}',
    ],
    runtimeCaching: [{
        urlPattern: /.*/,
        handler: 'networkFirst'
    }],
    swFile: 'service-worker.js'
};