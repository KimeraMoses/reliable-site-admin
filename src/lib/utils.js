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

export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
