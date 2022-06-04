import {
    getError,
    axios,
    getDepartmentsConfig,
    addDepartmentConfig,
    editDepartmentConfig,
    deleteDepartmentConfig
} from 'lib';

import { toast } from 'react-toastify';
import {
    getDepartmentsDispatch,
    setDepartmentsLoading,
} from 'store/Slices';


// Get All Departments
export const getDepartments = () => {
    return async (dispatch) => {
        dispatch(setDepartmentsLoading(true));
        try {
            const { url, config } = getDepartmentsConfig();
            const res = await axios.post(url, config);
            dispatch(getDepartmentsDispatch(res?.data?.data));
            dispatch(setDepartmentsLoading(false));
        } catch (e) {
            toast.error(getError(e));
            dispatch(setDepartmentsLoading(false));
        }
    };
};

// Add Department
export const addDepartment = (data) => {
    return async (dispatch) => {
        dispatch(setDepartmentsLoading(true));
        try {
            const { url, config } = addDepartmentConfig();
            const res = await axios.post(url, data, config);
            if (res.status === 200) {
                const { url, defaultData, config } = getDepartmentsConfig();
                const response = await axios.post(url, defaultData, config);
                dispatch(getDepartments(response?.data?.data));
                toast.success('Departments Added Successfully');
            }
        } catch (e) {
            toast.error(getError(e));
        } finally {
            dispatch(setDepartmentsLoading(false));
        }
    };
};


export const editDepartment = ({ data }) => {
    return async (dispatch) => {
        dispatch(setDepartmentsLoading(true));
        try {
            const { url, config } = editDepartmentConfig({ id: data?.id });
            const response = await axios.put(url, data, config);
            if (response.status === 200) {
                const { url, defaultData, config } = getDepartmentsConfig();
                const response = await axios.post(url, defaultData, config);
                dispatch(getDepartments(response?.data?.data));
                toast.success('Departments Updated Successfully');
            }
        } catch (error) {
            toast.error(getError(error));
        } finally {
            dispatch(setDepartmentsLoading(false));
        }
    };
};

export const deleteDepartment = ({ id }) => {
    return async (dispatch) => {
        dispatch(setDepartmentsLoading(true));
        try {
            const { url, config } = deleteDepartmentConfig({ id });
            const response = await axios.delete(url, config);
            if (response.status === 200) {
                const { url, defaultData, config } = getDepartmentsConfig();
                const response = await axios.post(url, defaultData, config);
                dispatch(getDepartments(response?.data?.data));
                toast.success('Departments Deleted Successfully');
            }
        } catch (error) {
            toast.error(getError(error));
        } finally {
            dispatch(setDepartmentsLoading(false));
        }
    };
};

