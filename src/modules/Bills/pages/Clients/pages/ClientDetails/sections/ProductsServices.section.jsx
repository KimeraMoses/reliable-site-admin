import { Spin } from 'antd';
import { Next } from 'icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductsByClientID } from 'store';

const PS = ({
  title,
  type,
  desc,
  img,
  id,
  // status = 'done',
}) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-[16px] items-center">
          {img ? (
            <div className="w-[100px] h-[70px] text-white flex items-center justify-center">
              <img
                src={img}
                alt="car"
                className="h-full w-full object-cover rounded-[8px]"
              />
            </div>
          ) : (
            <div className="w-[100px] border-2 rounded-[8px] border-blue-700 h-[70px] text-white flex items-center justify-center">
              <p className="text-center">No Image Available</p>
            </div>
          )}
          <div className="flex flex-col gap-[8px]">
            <div className="flex gap-[12px] items-center">
              <div className="text-white text-base text-[16px]">{title}</div>
              <div
                className={`rounded-[4px] py-[4px] px-[8px] ${
                  type === 'Product'
                    ? 'bg-[#2F264F] text-[#8950FC]'
                    : 'bg-[#392F28] text-[#FFA800]'
                }`}
              >
                {type}
              </div>
            </div>
            <div className="text-[#474761]">{desc}</div>
          </div>
        </div>
        <Link
          to={`/admin/dashboard/billing/products-services/list/details/${id}`}
        >
          <div className="bg-[#323248] p-[8px] rounded-lg cursor-pointer">
            <Next />
          </div>
        </Link>
      </div>
      <div className="h-0 w-full border-t-[1px] border-dashed border-[#323248] mt-[16px]" />
    </div>
  );
};

export const ProductsServices = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await dispatch(getProductsByClientID({ clientId: id }));
    })();
  }, []);
  const { loading, products } = useSelector((state) => state?.products);
  return (
    <div className="mt-4 p-[32px] bg-[#1E1E2D] rounded-lg">
      <Spin spinning={loading}>
        <h6 className="text-white mb-[32px] text-[16px]">
          Products & Services
        </h6>
        <div className="flex flex-col gap-[16px] justify-center">
          {products?.length ? (
            products?.map((product) => {
              return (
                <PS
                  title={product?.name}
                  img={product?.base64Image}
                  desc={product?.description}
                  id={product?.id}
                  type="Product"
                />
              );
            })
          ) : (
            <h4 className="text-white mt-[16px] text-center w-full">
              No Products Assigned!
            </h4>
          )}
        </div>
      </Spin>
    </div>
  );
};
