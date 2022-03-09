/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { confirmEmail } from 'store/Actions/AuthActions';
import './EmailVerified.styles.scss';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function EmailVerified() {
  const isLoading = useSelector((state) => state?.auth?.isLoading);
  const message = useSelector((state) => state?.auth?.message);

  const navigate = useNavigate();
  const query = useQuery();
  const dispatch = useDispatch();

  const { userId } = useParams();
  const code = query.get('code');
  const tenant = query.get('tenant');

  console.log(userId, code, tenant);

  useEffect(() => {
    // dispatch(confirmEmail({ userId, code, tenant }));
  }, []);

  return (
    <div className="h-screen w-full flex  items-center justify-content-center">
      <div className="col " style={{ maxWidth: '536px' }}>
        <div className="flex items-center justify-center mb-5">
          <img src="/icon/logo.svg" alt="" className="h-20 w-20" />
        </div>
        <div className="bg-custom-secondary col mx-4 md:mx-auto  rounded-lg p-4 md:p-5">
          <div className="text-center">
            <h2 className="text-md text-2xl text-white font-normal mb-2">
              {isLoading ? (
                <div className="loading">Verifying Email</div>
              ) : message?.error ? (
                <>{message?.error}</>
              ) : (
                <>Email Verified</>
              )}
            </h2>
            <p className="custom-text-light">
              {!message?.error ? (
                <>
                  Please continue login using the following button{' '}
                  {isLoading ? 'once verified' : ''}
                </>
              ) : (
                <>We are not able to verify your account at the moment.</>
              )}
            </p>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 ease-in duration-200 mt-4 w-full h-12 rounded-md text-white font-light"
              onClick={() => navigate('/admin/sign-in')}
              disabled={isLoading}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerified;
