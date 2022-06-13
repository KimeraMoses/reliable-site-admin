import { Progress as ProgressBar } from 'antd';
import { Modal } from 'components';

// status === 'importing' || 'success' || 'failed'

export const Progress = ({ show, setShow }) => {
  const status = 'failed';

  let statusText;
  switch (status) {
    case 'importing':
      statusText = 'Importing...';
      break;
    case 'failed':
      statusText = 'Import Failed';
      break;
    case 'success':
      statusText = 'Import Successfull';
      break;
    default:
      statusText = 'Importing...';
      break;
  }

  return (
    <Modal
      show={show}
      setShow={setShow}
      heading="Import Progress"
      submitText=""
      centered
      customBody={
        <div className="mb-[32px]">
          <div
            className={`${
              status === 'failed' ? 'text-[#f64e60]' : 'text-[#0bb783]'
            }`}
          >
            {statusText}
          </div>
          <ProgressBar
            percent={50}
            format={(percent) => <div className="text-white">{percent}%</div>}
            strokeColor={status === 'failed' ? '#F64E60' : '#0BB783'}
            trailColor="#323248"
          />
        </div>
      }
    />
  );
};
