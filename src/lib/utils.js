import axios from 'axios';
import { browserName, browserVersion } from 'react-device-detect';

export const getGroupModules = ({ appModules = [], groupModules = [] }) => {
  const groupNames = groupModules?.map((el) => el?.name);
  const filteredModules = appModules?.filter((module) => {
    return !groupNames?.includes(module?.name);
  });
  const filteredModulesFalse = filteredModules.map((module) => {
    return {
      ...module,
      id: null,
      permissionDetail: {
        Create: false,
        View: false,
        Update: false,
        Remove: false,
      },
    };
  });
  const parsedGroupPermissions = groupModules.map((module) => {
    return {
      ...module,
      permissionDetail: JSON.parse(module?.permissionDetail),
    };
  });
  const newArray = [...filteredModulesFalse, ...parsedGroupPermissions];
  newArray.sort((a, b) => {
    let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();
    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  return newArray;
};

export const getUserModules = ({ appModules = [], userModules = [] }) => {
  const groupNames = userModules?.map((el) => el?.name);
  const filteredModules = appModules?.filter((module) => {
    return !groupNames?.includes(module?.name);
  });
  const filteredModulesFalse = filteredModules.map((module) => {
    return {
      ...module,
      id: null,
      permissionDetail: {
        Create: false,
        View: false,
        Update: false,
        Remove: false,
      },
    };
  });
  const parsedUserModules = userModules.map((module) => {
    return {
      ...module,
      permissionDetail: JSON.parse(module?.permissionDetail),
    };
  });
  const newArray = [...filteredModulesFalse, ...parsedUserModules];
  newArray.sort((a, b) => {
    let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();
    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  return newArray;
};

export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

// Convert Image to Base64
export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

// Add Server URL Properly
export const addServerUrl = (
  url = '{server_url}/Files/Images/ApplicationUser/Usama.jpeg.jpeg'
) => {
  const truncated = url.substring(url.indexOf('/'), url.length);
  const finalURL = `${process.env.REACT_APP_BASEURL}${truncated}`;
  return finalURL;
};

// Convert URL to File
export const convertUrlToFile = async (imgUrl, fileName) => {
  const imgExt = imgUrl.split(/[#?]/)[0].split('.').pop().trim();
  try {
    const response = await fetch(imgUrl);
    const blob = await response.blob();
    const file = new File([blob], `${fileName}.` + imgExt, {
      type: blob.type,
    });
    return file;
  } catch (e) {
    console.log(e);
  }
};

// Get Difference between now and date
export const getDifference = (date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const diffInMinutes = Math.round(diff / 60000);
  const diffInHours = Math.round(diffInMinutes / 60);
  const diffInDays = Math.round(diffInHours / 24);
  const diffInWeeks = Math.round(diffInDays / 7);
  const diffInMonths = Math.round(diffInDays / 30);
  const diffInYears = Math.round(diffInDays / 365);
  if (diffInMinutes < 1) {
    return 'Just Now';
  }
  if (diffInMinutes < 2) {
    return '1 Minute Ago';
  }
  if (diffInMinutes < 60) {
    return `${diffInMinutes} Minutes Ago`;
  }
  if (diffInHours < 2) {
    return '1 Hour Ago';
  }
  if (diffInHours < 24) {
    return `${diffInHours} Hours Ago`;
  }
  if (diffInDays < 2) {
    return '1 Day Ago';
  }
  if (diffInDays < 7) {
    return `${diffInDays} Days Ago`;
  }
  if (diffInWeeks < 2) {
    return '1 Week Ago';
  }
  if (diffInWeeks < 4) {
    return `${diffInWeeks} Weeks Ago`;
  }
  if (diffInMonths < 2) {
    return '1 Month Ago';
  }
  if (diffInMonths < 12) {
    return `${diffInMonths} Months Ago`;
  }
  if (diffInYears < 2) {
    return '1 Year Ago';
  }
  return `${diffInYears} Years Ago`;
};

// Get IP Address Info
export const getIPData = async () => {
  const res = await axios.get('https://geolocation-db.com/json/');
  const { city, state, country_name } = res.data;
  const cityString = city ? `${city}, ` : '';
  const stateString = state ? `${state}, ` : '';
  const countryString = country_name ? `${country_name}` : '';
  return {
    ip: res.data.IPv4,
    location: `${cityString}${stateString}${countryString}`,
  };
};

// Get Device Name
export const getDeviceName = () => {
  return `${browserName} ${browserVersion}`;
};

// Convert camelCase to Title Case
export const convertCamelToTitle = (str) => {
  const result = str.replace(/([A-Z])/g, ' $1');
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};
