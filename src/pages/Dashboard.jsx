


import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem('autotoken69');
    navigate('/signin'); // Replace with your signin route
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://autonotebackend.shadowbites10.workers.dev/getnotes", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("autotoken69")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        const data = await response.json();

        if (data.success) {
          const processedFiles = data.res.file.map(file => ({
            ...file,
            content: parseContent(file.content),
            updated_at: new Date(file.updated_at)
          }));
          setFiles(processedFiles);
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const parseContent = (content) => {
    try {
      return JSON.parse(content);
    } catch (e) {
      return [];
    }
  };

  const handleDelete = async (fileId) => {
    try {
      // if (!window.confirm('Are you sure you want to delete this note?')) return;
      
      const response = await fetch(`https://autonotebackend.shadowbites10.workers.dev/deletefile`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('autotoken69')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: parseInt(fileId) }),
      });

      if (response.ok) {
        setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  if (loading) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="text-white">Loading files...</div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <button
        onClick={handleSignout}
        className="fixed top-4 text-xs right-4 px-4 py-2 bg-red-300 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" 
            clipRule="evenodd" 
          />
        </svg>
        Sign Out
      </button>
      <h1 className="text-6xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pt-4 pd-8">
  AUTO NOTE
  <span className="block mt-4 text-lg font-normal text-gray-600">
    Your smart note-taking companion
  </span>
</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search files by title or content"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <FileGroups files={files} searchQuery={searchQuery} handleDelete={handleDelete} />
    </div>
  );
}

const FileGroups = ({ files, searchQuery, handleDelete }) => {
  const filteredFiles = files
    .filter(file => {
      const contentText = Array.isArray(file.content) ? file.content.join(' ') : '';
      return (
        file.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contentText.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => b.updated_at - a.updated_at);

  const groupedFiles = filteredFiles.reduce((groups, file) => {
    const dateKey = format(file.updated_at, 'MMM dd, yyyy');
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(file);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedFiles).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <div>
      {sortedDates.map(date => (
        <div key={date} className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">{date}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedFiles[date].map(file => (
              <FileCard 
                key={`${file.title}-${file.updated_at}`} 
                file={file} 
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const FileCard = ({ file, handleDelete }) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const formattedTime = format(file.updated_at, 'HH:mm');
  const contentPreview = Array.isArray(file.content) 
    ? file.content.join(' ').slice(0, 100) + (file.content.join(' ').length > 100 ? '...' : '')
    : '';

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    
    setIsDeleting(true);
    try {
      await handleDelete(file.id);
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div 
      onClick={() => navigate(`/notes/${file.id}`)}
      className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 relative group cursor-pointer"
    >
      {/* Delete Button */}
      <button
        onClick={handleDeleteClick}
        disabled={isDeleting}
        className="absolute top-2 right-2 p-1.5 hover:bg-red-50 rounded-full transition-colors group-hover:opacity-100 opacity-0"
        title="Delete note"
      >
        {isDeleting ? (
          <svg className="animate-spin h-4 w-4 text-red-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
        ) : (
          <svg className="w-4 h-4 text-red-500 hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        )}
      </button>

      <div className="flex items-start mb-3">
        {file.faviconicon && (
          <img 
            src={file.faviconicon} 
            className="w-6 h-6 mr-2 mt-1 rounded"
            alt="File icon"
            onError={(e) => e.target.style.display = 'none'}
          />
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-lg truncate">{file.title}</h3>
          <p className="text-gray-500 text-sm mb-2">{formattedTime}</p>
          {contentPreview && (
            <p className="text-gray-600 text-sm line-clamp-3">{contentPreview}</p>
          )}
        </div>
      </div>
      {file.important && (
        <span className="inline-block px-2 py-1 text-xs font-medium text-red-600 bg-red-100 rounded">
          Important
        </span>
      )}
    </div>
  );
};