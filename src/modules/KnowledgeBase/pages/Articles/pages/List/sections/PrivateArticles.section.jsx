import { List } from 'antd';
import { ArticleCard } from 'components';

export function PrivateArticles({ articles }) {
  return (
    <div className="mt-[20px]">
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={articles}
        rowKey={(article) => article?.id}
        renderItem={(item) => (
          <List.Item>
            <ArticleCard {...item} articleType="Private Article" />
          </List.Item>
        )}
      />
    </div>
  );
}
