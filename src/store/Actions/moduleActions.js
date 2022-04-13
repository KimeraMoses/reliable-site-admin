import {
  getAppLevelModules,
  getUserLevelModules,
} from 'store/Slices/moduleSlice';

export const getAppModules = () => {
  return async (dispatch) => {
    const AuthToken = localStorage.getItem('AuthToken');
    const { token } = await JSON.parse(AuthToken);
    if (token) {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/modulemanagement/getmodulebytenant/admin`,
        {
          method: 'GET',
          headers: new Headers({
            'Content-type': 'application/json',
            'gen-api-key': process.env.REACT_APP_GEN_APIKEY,
            tenant: 'admin',
            Authorization: `Bearer ${token}`,
          }),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
      }
      const res = await response.json();
      dispatch(getAppLevelModules(res));
    } else {
      console.info('Not Authorized to get Modules');
    }
  };
};

export const getUserModules = () => {
  return async (dispatch) => {
    const AuthToken = localStorage.getItem('AuthToken');
    const { token } = JSON.parse(AuthToken);
    // Get User Profile
    if (token) {
      const userRes = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/identity/profile`,
        {
          method: 'GET',
          headers: new Headers({
            'Content-type': 'application/json',
            'gen-api-key': process.env.REACT_APP_GEN_APIKEY,
            tenant: 'admin',
            Authorization: `Bearer ${token}`,
          }),
        }
      );
      const userData = await userRes.json();
      const userId = userData.data.id;

      if (userId) {
        const response = await fetch(
          `${process.env.REACT_APP_BASEURL}/api/usermodulemanagement/getmodulebyuser/${userId}`,
          {
            method: 'GET',
            headers: new Headers({
              'Content-type': 'application/json',
              'gen-api-key': process.env.REACT_APP_GEN_APIKEY,
              userId: userId,
              tenant: 'admin',
              Authorization: `Bearer ${token}`,
            }),
          }
        );
        if (!response.ok) {
          const error = await response.json();
          console.log(error);
        }
        const res = await response.json();
        dispatch(getUserLevelModules(res));
      } else {
        console.info('Not Authorized for User Level Modules');
      }
    }
  };
};
