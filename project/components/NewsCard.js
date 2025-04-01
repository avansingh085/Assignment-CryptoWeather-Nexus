
export default function NewsCard({ article }) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <a href={article.link} target="_blank" rel="noopener noreferrer">
          <h3 className="text-lg font-semibold hover:text-blue-400">{article.title}</h3>
        </a>
        <p className="text-sm text-gray-400">{article.source_id} - {new Date(article.pubDate).toLocaleDateString()}</p>
      </div>
    );
  }