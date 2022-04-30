import { axios } from 'lib';

export const getUserGroups = () => {
  return async (dispatch) => {
    const userRes = axios.get('/api/identity/profile');

    const userData = await userRes.json();
    const userId = userData.data.id;

    console.log(userData, userId);
  };
};

// // DEMO GETTING ALL GROUPS

// const groupRes = await groupsRes.json();
// console.log(groupRes);
