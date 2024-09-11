import React, { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { motion } from 'framer-motion';

function App() {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [country, setCountry] = useState('us');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const handler = debounce((query) => {
      setDebouncedQuery(query);
    }, 500);

    handler(query);

    return () => {
      handler.cancel(); 
    };
  }, [query]);

  useEffect(() => {
    fetchNews();
  }, [debouncedQuery, country, page]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://news-web-backend.onrender.com/api/news', {
        params: {
          q: debouncedQuery || 'latest',
          country: country,
          page: page,
          pageSize: 10,
        },
      });
      setNews(res.data.articles);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <motion.h1
        className="text-5xl font-bold mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        News Feed
      </motion.h1>

      <motion.div
        className="mb-4 flex flex-col sm:flex-row justify-between"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <input
          type="text"
          placeholder="Search news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-3 mb-4 sm:mb-0 sm:mr-4 w-full sm:w-1/2"
        />

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border p-3 mb-4 sm:mb-0 sm:mr-4 w-full sm:w-1/4"
        >
          <option value="us">United States</option>
          <option value="gb">United Kingdom</option>
          <option value="ca">Canada</option>
          <option value="au">Australia</option>
          <option value="in">India</option>
        </select>
      </motion.div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {news.map((article, idx) => (
            <motion.div
              key={idx}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="relative">
                <img
                  src={article.image || 'https://via.placeholder.com/300x200'}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <div className="absolute top-0 left-0 p-2 bg-opacity-75 bg-black text-white text-sm rounded-br-md">
                  {article.source.name}
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="mb-4">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Read more
              </a>
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          className="bg-gray-200 p-2 rounded"
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
          className="bg-gray-200 p-2 rounded"
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
