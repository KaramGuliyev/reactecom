import userTypes from './user.types';

export const setCurrentuser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user,
});