import { getAppLevelModules } from 'store/Slices/moduleSlice';

export const getAppModules = (token) => {
  console.log('inside');
  return async (dispatch) => {
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
  };
};
