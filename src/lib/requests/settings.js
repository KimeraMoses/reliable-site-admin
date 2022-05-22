import { getConfig } from 'lib';

// Settings End-Points
// TODO: Change module name after fix from backend-devs
const settingsConfig = (action) => getConfig({ module: 'Users', action });
