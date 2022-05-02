export const checkModule = ({ modules, module }) => {
  const filtered = modules?.filter((moduleEl) => moduleEl?.name === module);
  if (module !== undefined && module !== null && filtered.length) {
    return {
      name: filtered[0]?.name,
      permissions: JSON.parse(filtered[0]?.permissionDetail),
      userId: filtered[0]?.userId,
    };
  } else {
    return false;
  }
};
