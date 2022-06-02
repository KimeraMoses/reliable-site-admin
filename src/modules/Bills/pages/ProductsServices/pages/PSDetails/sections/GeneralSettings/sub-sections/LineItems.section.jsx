import { useEffect, useState } from 'react';
import { Button } from 'components';
import { AddLineItem, DeleteItem, EditLineItem } from './sections';
import { nanoid } from 'nanoid';
import { useFormikContext } from 'formik';
import { toast } from 'react-toastify';

const LineItem = ({ item, setDel, setId, setEdit, setEditData }) => {
  return (
    <div className="border-b-[1px] border-b-[#323248] border-dashed pb-[16px] pt-[16px] flex items-center justify-between">
      <div className="flex gap-[16px]">
        <div className="h-[52px] w-[3px] bg-[#8950FC] rounded-[8px]" />
        <div>
          <div className="text-white text-[16px] font-normal">{item?.name}</div>
          <div className="text-[#474761] text-[14px] font-normal">
            ${item?.price}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[12px]">
        <div
          className="bg-[#323248] rounded-[8px] p-[8px] cursor-pointer"
          onClick={() => {
            setEditData(item);
            setEdit(true);
          }}
        >
          <img src="/img/edit.png" alt="edit" />
        </div>
        <div
          className="bg-[#323248] rounded-[8px] p-[8px] cursor-pointer"
          onClick={() => {
            setId(item?.id);
            setDel(true);
          }}
        >
          <img src="/img/delete.svg" alt="edit" className="w-[24px]" />
        </div>
      </div>
    </div>
  );
};

export const LineItems = () => {
  const [add, setAdd] = useState(false);
  const [del, setDel] = useState(false);
  const [id, setId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [edit, setEdit] = useState(false);
  const [total, setTotal] = useState(0);

  const { values, setFieldValue } = useFormikContext();

  const addLineItem = (item) => {
    const currentLineItems = values?.productLineItems;
    const newLineItems = [...currentLineItems, { ...item, id: nanoid() }];
    setFieldValue('productLineItems', newLineItems);
  };
  const editLineItem = (id, editItem) => {
    const newItems = values?.productLineItems?.map((item) => {
      if (item.id === id) {
        return { ...item, ...editItem };
      }
      return item;
    });
    setFieldValue('productLineItems', newItems);
  };

  const deleteLineItem = (id) => {
    if (values?.productLineItems?.length <= 1) {
      toast.error('At least one item is required');
    } else {
      const newItems = values?.productLineItems?.filter(
        (item) => item.id !== id
      );
      setFieldValue('productLineItems', newItems);
    }
  };

  useEffect(() => {
    let sum = 0;
    values?.productLineItems?.forEach((item) => {
      sum += item?.price;
    });
    setTotal(sum);
  }, [values?.productLineItems]);

  return (
    <>
      <div className="bg-[#1E1E2D] p-[32px] rounded-[8px] mt-[20px]">
        <div className="flex items-center justify-between mb-[16px]">
          <h6 className="text-white text-[16px]">Line Items & Price</h6>
          <Button onClick={() => setAdd(true)}>Add New Item</Button>
        </div>
        {values?.productLineItems?.map((item) => (
          <LineItem
            item={item}
            setDel={setDel}
            setId={setId}
            setEdit={setEdit}
            setEditData={setEditData}
          />
        ))}
        <div className="mt-[32px] rounded-[8px] border-[#3699FF] border-[1px] border-dashed bg-[#212E48] flex items-center justify-between p-[32px]">
          <div className="text-white text-[20px] font-medium">
            Total - ${total.toFixed(2)}
          </div>
          <div className="text-[#3699FF] text-[14px]">One Time Payment</div>
        </div>
      </div>

      <AddLineItem show={add} setShow={setAdd} handleAdd={addLineItem} />
      <EditLineItem
        show={edit}
        setShow={setEdit}
        handleEdit={editLineItem}
        editValue={editData}
      />
      <DeleteItem
        show={del}
        setShow={setDel}
        handleDelete={deleteLineItem}
        id={id}
      />
    </>
  );
};
