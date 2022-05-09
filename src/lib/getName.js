export const getName = ({ user }) => {
  let userName = '';
  let userN = user.fullName.split(' ');
  if (userN.length < 2) {
    userName = userN[0].charAt(0);
  } else {
    userName = userN[0].charAt(0) + userN[1].charAt(0);
  }

  return userName.toUpperCase();
};
