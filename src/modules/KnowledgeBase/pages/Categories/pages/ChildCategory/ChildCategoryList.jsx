import { Button } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { checkModule } from 'lib/checkModule';
import { Table } from 'components';
import { Add, Delete } from './sections';
import { Edit } from './sections/Edit.section';
import { getArticleCategoryByID } from 'store';

export const ChildCategoryList = () => {
  const { t } = useTranslation('/Bills/ns');

  const { articleCategories, loading } = useSelector(
    (state) => state?.articleCategories
  );
  const { userModules } = useSelector((state) => state?.modules);

  const { permissions } = checkModule({
    module: 'Users',
    modules: userModules,
  });

  const columns = [
    {
      title: 'Category ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => {
        return (
          <div className="">
            <p className="text-sm">{text.substring(0, 4)}</p>
          </div>
        );
      },
    },

    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
      width: 600,
      // render: () => {
      //   return <div className="text-sm">Category Name</div>;
      // },
    },
    {
      title: 'Articles Under Category',
      dataIndex: 'undercategory',
      key: 'undercategory',
      render: () => {
        return <div className="text-sm">4 Articles</div>;
      },
    },
    {
      title: 'Creation Date',
      dataIndex: 'createdOn',
      key: 'createdOn',
      render: (createdOn) => moment(createdOn).format('DD/MM/YYYY'),
    },
  ];

  // Setting data properly
  const [addModalShow, setAddModalShow] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([]);
    if (articleCategories.length) {
      let dataToSet = [];
      articleCategories?.forEach((b) => {
        if (b?.parentCategoryId !== '00000000-0000-0000-0000-000000000000') {
          dataToSet.push({ ...b, key: b?.id });
        }
      });
      setData(dataToSet);
    }
  }, [articleCategories]);

  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);

  return (
    <div className="mt-[20px]">
      <div className="p-[40px] pb-[24px] bg-[#1E1E2D] rounded-[8px]">
        <Add show={addModalShow} setShow={setAddModalShow} />
        <Edit show={edit} setShow={setEdit} />
        <Delete show={del} setShow={setDel} />
        <Table
          columns={columns}
          data={data}
          loading={loading}
          dateRageFilter={true}
          fieldToFilter="billNo"
          btnData={{
            text: 'Add Category',
            onClick: () => setAddModalShow(true),
          }}
          handleDateRange={() => {}}
          editAction={(record) => (
            <Button
              onClick={async () => {
                await dispatch(getArticleCategoryByID(record.id));
                setEdit(true);
              }}
            >
              Edit
            </Button>
          )}
          deleteAction={(record) => (
            <Button
              className="focus:bg-[unset]"
              onClick={async () => {
                await dispatch(getArticleCategoryByID(record.id));
                setDel(true);
              }}
            >
              Delete
            </Button>
          )}
          permissions={permissions}
          t={t}
        />
      </div>
    </div>
  );
};
