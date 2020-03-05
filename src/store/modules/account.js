import db from '@/utils/localstorage';

export default {
    namespaced: true,
    state: {
        token: db.get('USER_TOKEN'),
        expireTime: db.get('EXPIRE_TIME'),
        /**
         *用户名
         */
        username: db.get('USERNAME'),
        /**
         *用户id
         */
        userID: db.get('USER_ID'),
        permissions: db.get('PERMISSIONS'),
        roles: db.get('ROLES')
    },
    mutations: {
        setToken (state, val) {
            db.save('USER_TOKEN', val);
            state.token = val;
        },
        setExpireTime (state, val) {
            db.save('EXPIRE_TIME', val);
            state.expireTime = val;
        },
        setUsername (state, val) {
            db.save('USERNAME', val);
            state.username = val;
        },
        setUserID (state, val) {
            db.save('USER_ID', val);
            state.userID = val;
        },
        setPermissions (state, val) {
            db.save('PERMISSIONS', val);
            state.permissions = val;
        },
        setRoles (state, val) {
            db.save('ROLES', val);
            state.roles = val;
        }
    }
};
