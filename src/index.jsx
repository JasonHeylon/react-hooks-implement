import React from './react';

const useCnodeList = (page) => {
  const [articles, setArticles] = React.useState([]);
  React.useEffect(() => {
    fetch(`https://cnodejs.org/api/v1/topics?page=${page}`)
      .then((resp) => resp.json())
      .then((json) => {
        setArticles(json.data);
      });
  }, [page]);

  return articles;
};

function Component() {
  const [count, setCount] = React.useState(1);
  const articles = useCnodeList(count);

  return (
    <div>
      <h2>CNode帖子： 第{count}页</h2>
      <button onClick={() => setCount(count + 1)}>下一页</button>

      <ul>
        {articles.map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
}

React.render(<Component />, document.getElementById('app'));
