import { DashboardLayout } from 'layout';
import { Table } from 'components';
// import './Home.styles.scss';

// Columns for table
const columns = [
  {
    title: 'ORDER ID',
    dataIndex: 'uid',
  },
  {
    title: 'CLIENT',
    dataIndex: 'name',
  },
  {
    title: 'STATUS',
    dataIndex: 'status',
    width: 500,
    render: (text) => <div className="on-site__status">{text}</div>,
  },
  {
    title: 'TOTAL',
    dataIndex: 'total',
  },
  {
    title: 'DATE ADDED',
    dataIndex: 'last_check_in',
  },
  {
    title: 'DATE MODIFIED',
    dataIndex: 'last_check_out',
  },
];

const data = [];
for (let i = 0; i < 50; i += 1) {
  data.push({
    key: i,
    uid: Number(`0${i}54${i}`),
    name: `Paul Elliott ${i}`,
    status: 'Currently Checked In',
    total: '200.00USD',
    last_check_in: `Mar 5th, 2022 at 01:00:${i} PM`,
    last_check_out: 'Mar 5th, 2022 at 01:00:00 PM',
  });
}

function Users() {
  // const isDesktopOrLaptop = useMediaQuery({
  //   query: '(min-width: 1400px)',
  // });

  return (
    <DashboardLayout>
      <div className="p-4 md:px-6 dashboard">
        {/* SHOW TABLE HERE */}
        {/* <Table /> */}
        <Table columns={columns} data={data} />
      </div>
    </DashboardLayout>
  );
}
export default Users;
