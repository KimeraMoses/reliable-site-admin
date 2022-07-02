import React from 'react';
// import { Icon } from 'antd';
import './index.scss';

export const TicketMenu = ({
  options = [
    {
      label: 'Merge',
      onClick: (record) => {
        console.log(record);
      },
    },
    {
      label: 'Transfer',
      onClick: (record) => {
        console.log(record);
      },
    },
    {
      label: 'Status',
      onClick: (record) => {
        console.log(record);
      },
    },
    {
      label: 'Follow-Up',
      onClick: (record) => {
        console.log(record);
      },
    },
    {
      label: 'Priority',
      onClick: (record) => {
        console.log(record);
      },
    },
    {
      label: 'Pin',
      onClick: (record) => {
        console.log(record);
      },
    },
  ],
  record,
  x,
  y,
}) => {
  return (
    <ul className="popup" style={{ left: `${x}px`, top: `${y}px` }}>
      {options?.map((option) => {
        return <li onClick={() => option?.onClick(record)}>{option?.label}</li>;
      })}
    </ul>
  );
};
