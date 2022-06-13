import { Table } from 'components';
import { checkModule } from 'lib/checkModule';
import { useSelector } from 'react-redux';

const dummyData = [
  { clientName: 'Sam', email: 'sam@gmail.com' },
  { clientName: 'Paul', email: 'paul@gmail.com' },
  { clientName: 'Paul Elliot', email: 'paul.elliot@gmail.com' },
];

export const Tables = ({ selectedData, setSelectedData }) => {
  const { userModules } = useSelector((state) => state?.modules);
  const { permissions } = checkModule({
    module: 'Settings',
    modules: userModules,
  });

  const columns = Object?.keys(dummyData[0])?.map((key) => {
    return {
      title: key,
      dataIndex: key,
      key: key,
    };
  });

  return (
    <div className="grid grid-cols-2 gap-[20px]">
      {/* Table All Data */}
      <div className="bg-[#171723] p-[32px] rounded-[8px]">
        <Table
          columns={columns}
          rowKey={columns[0]?.key}
          theme="dark"
          data={dummyData}
          pagination={false}
          permissions={permissions}
          hideActions
          hideSearch
          fieldToFilter="name"
        />
      </div>
    </div>
  );
};
