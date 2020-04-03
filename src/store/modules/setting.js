import db from '@/utils/localstorage';

export default {
    namespaced: true,
    state: {
        sidebar: {
            opened: true
        },
        settingBar: {
            opened: false
        },
        isMobile: false,
        theme: db.get('THEME', 'light'),
        layout: db.get('LAYOUT', 'side'),
        systemName: 'OASIS 文献检索系统',
        copyright: `${new Date().getFullYear()} <a class="copyright-link" href="http://3.dwxh.xyz:3000" target="_blank">IIICEStseB</a>`,
        colorList: [
            'rgb(245, 34, 45)',
            'rgb(250, 84, 28)',
            'rgb(250, 173, 20)',
            'rgb(66, 185, 131)',
            'rgb(82, 196, 26)',
            'rgb(24, 144, 255)',
            'rgb(47, 84, 235)',
            'rgb(114, 46, 209)'
        ],
        color: db.get('COLOR', 'rgb(24, 144, 255)')
    },
    mutations: {
        setColor (state, color) {
            db.save('COLOR', color);
            state.color = color;
        }
    }
};

function getBooleanValue (value, defaultValue) {
    if (Object.is(value, null)) {
        return defaultValue;
    }
    if (JSON.stringify(value) !== '{}') {
        return value;
    } else {
        return false;
    }
}
