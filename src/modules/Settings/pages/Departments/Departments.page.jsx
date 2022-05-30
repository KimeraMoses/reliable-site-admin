import { Button } from 'antd';
import { Table } from 'components';
import { checkModule } from 'lib/checkModule';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartments } from 'store';
import { useTranslation } from "react-i18next";
import {
    AddDepartment,
    DeleteDepartment,
    EditDepartment,
} from './sections';

const Brands = () => {
    const [addModalShow, setAddModalShow] = useState(false);
    const [editValue, setEditValue] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [deleteID, setDeleteID] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(getDepartments());
        })();
    }, [dispatch]);

    const { departments, loading } = useSelector((state) => state.departments);

    const { t } = useTranslation("/Departments/ns");

    const columns = [
        {
            title: t('number'),
            dataIndex: "deptNumber",
            key: "deptNumber",
        },
        {
            title: t('name'),
            dataIndex: "name",
            key: "name",
        },
        {
            title: t('status'),
            key: "deptStatus",
            dataIndex: "deptStatus",
            render: (deptStatus) =>
                <div className="bg-[#1C3238] px-[8px] py-[4px] text-[#0BB783] w-[fit-content] rounded-[4px]">
                    {deptStatus}
                </div>
        },
    ];


    // Check for permissions Start
    const { userModules } = useSelector((state) => state?.modules);
    const { permissions } = checkModule({
        module: 'Settings',
        modules: userModules,
    });
    // Check for permissions End

    // Setting data properly
    const [data, setData] = useState([]);
    useEffect(() => {
        if (departments.length) {
            const dataToSet = departments.map((b) => {
                return {
                    ...b,
                    key: b?.id
                };
            });
            setData(dataToSet);
        }
    }, [departments]);

    return (
        <div className="m-[40px] p-[40px] bg-[#1E1E2D] rounded-[8px]">
            <AddDepartment show={addModalShow} setShow={setAddModalShow} />
            <EditDepartment
                show={editModalShow}
                setShow={setEditModalShow}
                editValue={editValue}
            />
            <DeleteDepartment
                show={deleteModalShow}
                setShow={setDeleteModalShow}
                id={deleteID}
            />
            <Table
                columns={columns}
                data={data}
                permissions={permissions}
                loading={loading}
                fieldToFilter="name"
                btnData={{
                    text: t('addNewDepartment'),
                    onClick: () => setAddModalShow(true),
                }}
                editAction={(record) => (
                    <Button
                        onClick={() => {
                            setEditValue(record);
                            setEditModalShow(true);
                        }}
                    >
                        Edit
                    </Button>
                )}
                deleteAction={(record) => (
                    <Button
                        className="focus:bg-[unset]"
                        onClick={() => {
                            setDeleteID(record?.id);
                            setDeleteModalShow(true);
                        }}
                    >
                        Delete
                    </Button>
                )}
            />
        </div>
    );
};

export default Brands;
