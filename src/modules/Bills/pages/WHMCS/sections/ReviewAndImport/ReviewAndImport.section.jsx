import { Button } from 'components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Progress, Tables } from './sub-sections';

export const ReviewAndImport = ({ setStep }) => {
  // const [selectedData, setSelectedData] = useState([]);
  const [showProgress, setShowProgress] = useState(false);

  const { selectedData } = useSelector((state) => state?.whmcs);

  const dispatch = useDispatch();

  return (
    <div className="w-full rounded-[8px] bg-[#1E1E2D] min-h-[75vh] flex flex-col justify-between">
      <Progress show={showProgress} setShow={setShowProgress} />
      {/* Top Section */}
      <div>
        <h6 className="text-white text-[16px] font-medium my-[32px] px-[32px]">
          Review & Import
        </h6>
        <div className="px-[32px]">
          <Tables
            selectedData={selectedData}
            // setSelectedData={setSelectedData}
          />
        </div>
      </div>
      {/* Footer Section */}
      <div className="p-[32px] border-t-[1px] border-t-[#323248] border-dashed flex gap-[12px]">
        <Button
          type="secondary"
          htmlType="button"
          onClick={async () => {
            await dispatch(selectedData({ data: [] }));
            setStep(2);
          }}
        >
          Go Back
        </Button>
        <Button
          type="primary"
          htmlType="button"
          onClick={() => {
            setShowProgress(true);
          }}
        >
          Start Importing
        </Button>
      </div>
    </div>
  );
};
