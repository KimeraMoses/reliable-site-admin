import { Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';

const modules = [
  { name: 'Module 1', id: '1' },
  { name: 'Module 2', id: '2' },
  { name: 'Module 3', id: '3' },
  { name: 'Module 4', id: '4' },
];

export const UserPermissions = () => {
  const { t } = useTranslation('Users/ns');

  return (
    <div className="mt-[20px] p-[32px] bg-[#1E1E2D] rounded-[8px]">
      <h6 className="text-white text-[16px]">{t('userPermissions')}</h6>
      <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[32px] mb-[32px]" />
      {modules?.map((module, index) => (
        <div key={module?.id}>
          <div className="flex items-center justify-between">
            <p className="text-white text-[14px]">{module?.name}</p>
            <div className="flex items-center gap-[20px]">
              <Checkbox>
                <p className="mb-0 text-[#92928F]">{t('all')}</p>
              </Checkbox>
              <Checkbox>
                <p className="mb-0 text-[#92928F]">{t('create')}</p>
              </Checkbox>
              <Checkbox>
                <p className="mb-0 text-[#92928F]">{t('read')}</p>
              </Checkbox>
              <Checkbox>
                <p className="mb-0 text-[#92928F]">{t('update')}</p>
              </Checkbox>
              <Checkbox>
                <p className="mb-0 text-[#92928F]">{t('delete')}</p>
              </Checkbox>
            </div>
          </div>
          {modules?.length > index + 1 ? (
            <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[32px] mb-[32px]" />
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
};
