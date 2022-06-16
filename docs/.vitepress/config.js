const path = require('path')

module.exports = {
    title: 'My Lib',
    description: 'Just playing around.',
    themeConfig: {
        repo: 'https://github.com/amicus-veritatis/vue-3-a11y-dialog',
        sidebar: [{
            text: 'Introduction',
            children: [
                { text: 'What is My Lib?', link: '/' },
                { text: 'Getting Started', link: '/guide/' },
            ],
        }, {
            text: 'Components',
            children: [
                { text: 'Component A', link: '/components/component-a' },
                { text: 'Component B', link: '/components/component-b' },
            ],
        }],
    },
    vite: {
        resolve: {
            alias: {
                'vue-3-a11y-dialog': path.resolve(__dirname, '../../src'),
            },
            dedupe: ['vue'], // avoid error when using dependencies that also use Vue
        }
    }
}