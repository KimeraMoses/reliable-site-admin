import { getConfig } from 'lib';
const departmentsConfig = (action) =>
    getConfig({ module: 'Settings', action });

const prefix = `/api/departments`;

export const getDepartmentsConfig = () => ({
    url: `${prefix}/search`,
    defaultData: {
        advancedSearch: {
            fields: [''],
            keyword: '',
        },
        keyword: '',
        pageNumber: 0,
        pageSize: 0,
        orderBy: [''],
    },
    config: departmentsConfig('View'),
});

export const addDepartmentConfig = () => ({
    url: `${prefix}`,
    config: departmentsConfig('Create')
});

// Edit Departemnt
export const editDepartmentConfig = ({ id }) => ({
    url: `${prefix}/${id}`,
    config: departmentsConfig('Update')
});
// Delete Departemnt
export const deleteDepartmentConfig = ({ id }) => ({
    url: `${prefix}/${id}`,
    config: departmentsConfig('Remove')
});