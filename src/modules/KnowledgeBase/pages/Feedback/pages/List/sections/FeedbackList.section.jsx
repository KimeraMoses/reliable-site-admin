import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { checkModule } from 'lib/checkModule';
import { Table } from 'components';
import { getAllArticlesWithFeedbacks } from 'store';

export const FeedbackList = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('/Bills/ns');

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getAllArticlesWithFeedbacks());
    })();
  }, [dispatch]);

  const { articles, loading } = useSelector((state) => state?.articles);
  const { userModules } = useSelector((state) => state?.modules);

  const { permissions } = checkModule({
    module: 'Users',
    modules: userModules,
  });

  const columns = [
    {
      title: 'Article Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => {
        return (
          <div className="flex items-center gap-[12px] rounded-[8px]">
            <img className="w-[40px]" src="/article.jpg" alt="article title" />
            <p className="text-sm">{text}</p>
          </div>
        );
      },
    },

    {
      title: 'Article Description',
      dataIndex: 'bodyText',
      key: 'bodyText',
      render: (text) => {
        return (
          <div className="text-sm" dangerouslySetInnerHTML={{ __html: text }} />
        );
      },
    },
    {
      title: 'Number of Feedbacks',
      dataIndex: 'feedbacknumbers',
      key: 'feedbacknumbers',
      render: (text, record) => {
        return (
          <div className="text-sm">
            {record?.articleFeedbacks?.length} User Feedbacks
          </div>
        );
      },
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
      key: 'categoryName',
      render: (text, record) => {
        const category = record?.articleCategories?.[0]?.category?.name;
        return (
          <div className="bg-[#2F264F] px-[8px] py-[4px] uppercase text-[#8950FC] w-[fit-content] rounded-[4px]">
            {category ? category : 'Uncategorized'}
          </div>
        );
      },
    },
  ];

  // Setting data properly
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([]);
    if (articles?.length) {
      const dataToSet = articles.map((b) => {
        return {
          ...b,
          key: b?.id,
        };
      });
      setData(dataToSet);
    }
  }, [articles]);

  return (
    <div className="p-[40px]">
      <div className="p-[40px] pb-[24px] bg-[#1E1E2D] rounded-[8px]">
        <Table
          columns={columns}
          data={data}
          loading={loading}
          // statusFilter={[
          //   { name: 'Active' },
          //   { name: 'Closed' },
          //   { name: 'Disabled' },
          // ]}
          // fieldToFilter="articleTitle"
          editAction={(record) => (
            <>
              {record?.articleFeedbacks?.map((feedback, idx) => {
                return (
                  <Button
                    onClick={() => {
                      navigate(
                        `/admin/dashboard/knowledge-base/feedback/view/${feedback?.id}`
                      );
                    }}
                  >
                    View Feedback {idx + 1}
                  </Button>
                );
              })}
            </>
          )}
          permissions={permissions}
          t={t}
        />
      </div>
    </div>
  );
};
