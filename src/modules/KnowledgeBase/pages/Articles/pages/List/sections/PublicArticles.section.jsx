import { List } from 'antd';
import { ArticleCard } from 'components';

export function PublicArticles({ articles }) {
  return (
    <div className="mt-[20px]">
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={articles}
        rowKey={(article) => article?.id}
        renderItem={(item) => (
          <List.Item>
            <ArticleCard {...item} articleType="Public Article" />
          </List.Item>
        )}
      />
    </div>
  );
}
