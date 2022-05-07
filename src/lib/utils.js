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
