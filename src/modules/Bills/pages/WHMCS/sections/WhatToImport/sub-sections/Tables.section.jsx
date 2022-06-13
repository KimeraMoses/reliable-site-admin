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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedData(selectedRows);
    },
  };

  // Deselect Tabel Columns
  // const columnsForDeselectTable = columns?.map((column) => column);
  // columnsForDeselectTable.push({
  //   title: '',
  //   dataIndex: '',
  //   key: '',
  //   render: (text, record) => (
  //     <div
  //       className="cursor-pointer bg-[#F64E60] w-[20px] h-[20px] rounded-[4px] flex items-center justify-center"
  //       onClick={() => {}}
  //     >
  //       -
  //     </div>
  //   ),
  // });

  return (
    <div className="grid grid-cols-2 gap-[20px]">
      {/* Table All Data */}
      <div className="bg-[#171723] p-[32px] rounded-[8px]">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          rowKey={columns[0]?.key}
          theme="dark"
          data={dummyData}
          permissions={permissions}
          hideActions
          fieldToFilter="name"
        />
      </div>
      {/* Table Selected Data */}
      <div className="bg-[#171723] p-[32px] rounded-[8px]">
        <Table
          columns={columns}
          theme="dark"
          data={selectedData}
          permissions={permissions}
          hideActions
          emptyText="No Data Selected"
          fieldToFilter="name"
        />
      </div>
    </div>
  );
};
