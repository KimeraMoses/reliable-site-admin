import { List } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArticleCard } from 'components';
import { Delete } from './Delete.section';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllArticles } from 'store';

export function PublicArticles() {
  const [showDel, setShowDel] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { articles, loading } = useSelector((state) => state?.articles);

  useEffect(() => {
    dispatch(getAllArticles());
  }, []);

  return (
    <div className="mt-[20px]">
      <Delete show={showDel} setShow={setShowDel} />
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={articles}
        loading={loading}
        rowKey={(article) => article?.id}
        renderItem={(item) => (
          <List.Item>
            <ArticleCard
              onView={() =>
                navigate(
                  `/admin/dashboard/knowledge-base/articles/view/${item?.id}`
                )
              }
              onEdit={() =>
                navigate(
                  `/admin/dashboard/knowledge-base/articles/edit/${item?.id}`
                )
              }
              onDelete={() => {
                setShowDel(true);
              }}
              {...item}
              articleType="Public Article"
            />
          </List.Item>
        )}
      />
    </div>
  );
}
