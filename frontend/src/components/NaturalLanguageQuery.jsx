// src/components/NaturalLanguageQuery.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface QueryResult {
  success: boolean;
  data: any[];
  interpretation: {
    collection: string;
    fields: string[];
    conditions: Record<string, any>;
    sort: Record<string, any>;
    grouping: string | null;
  };
}

const NaturalLanguageQuery: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3000/api/query/analyze', {
        query
      });
      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to process query');
      console.error('Query error:', err);
    } finally {
      setLoading(false);
    }
  };

  const exampleQueries = [
    "Show all employees",
    "Find employees with position 'manager'",
    "List employees ordered by salary",
    "Display employees grouped by department"
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Natural Language Database Query</h2>
        
        {/* Query Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="query" className="block text-sm font-medium text-gray-700">
              Enter your query in natural language
            </label>
            <textarea
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="mt-1 block w-full border rounded-md shadow-sm p-2"
              rows={3}
              placeholder="Example: Show all employees in the Sales department"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Processing...' : 'Run Query'}
          </button>
        </form>

        {/* Example Queries */}
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">Example queries:</h3>
          <ul className="mt-2 space-y-1">
            {exampleQueries.map((example, index) => (
              <li key={index}>
                <button
                  onClick={() => setQuery(example)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  {example}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Results Display */}
      {result && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Query Results</h3>
          
          {/* Query Interpretation */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700">Query Interpretation:</h4>
            <pre className="mt-2 bg-gray-50 p-3 rounded text-sm">
              {JSON.stringify(result.interpretation, null, 2)}
            </pre>
          </div>

          {/* Data Results */}
          <div>
            <h4 className="text-sm font-medium text-gray-700">Results:</h4>
            <div className="mt-2 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {result.data.length > 0 &&
                      Object.keys(result.data[0]).map((key) => (
                        <th
                          key={key}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          {key}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {result.data.map((item, index) => (
                    <tr key={index}>
                      {Object.values(item).map((value: any, i) => (
                        <td key={i} className="px-6 py-4 whitespace-nowrap">
                          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NaturalLanguageQuery;