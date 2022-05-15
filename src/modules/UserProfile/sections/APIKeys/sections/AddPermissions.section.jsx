import { useSelector } from 'react-redux';
import { PermissionsModal } from 'components';
import { asyncForEach } from 'lib';
import { toast } from 'react-toastify';

export const AddPermissions = ({ show, setShow, apiKeyInit }) => {
  // const dispatch = useDispatch();
  const { appModules } = useSelector((state) => state?.modules);
  return (
    <PermissionsModal
      show={show}
      setShow={setShow}
      heading="API Keys Permissions"
      submitText="Create"
      permissions={appModules}
      // loading={loading}
      handleSubmit={async (values) => {
        console.log(values);
        console.log(apiKeyInit);
        // const newValues = values?.filter((value) => {
        //   return !appModules?.includes(value);
        // });
        // if (newValues?.length) {
        //   await asyncForEach(newValues, async (module) => {
        //     // await dispatch(
        //     //   editGroupPermissions({
        //     //     permission: module,
        //     //     gid: activeGroup?.id,
        //     //   })
        //     // );
        //     console.log(module);
        //   });
        //   setShow(false);
        //   toast.success('API Key Permissions Updated Successfully!');
        // } else {
        //   setShow(false);
        //   toast.warning(`You didn't added permissions.`);
        // }
      }}
      // handleCancel={() => {}}
    />
  );
};
