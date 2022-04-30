export const checkModule = ({ modules, module }) => {
  const filtered = modules?.filter((moduleEl) => moduleEl?.name === module);
  if (module !== undefined && module !== null && filtered.length) {
    return true;
  } else {
    return false;
  }
};
