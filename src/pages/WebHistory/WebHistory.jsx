import React from 'react';
import './WebHistory.css';

const WebHistory = () => {
  const historyData = [
    { id: 1, url: 'Bật đèn', date: '2025-03-19', time: '14:35' },
    { id: 2, url: 'Bật quạt mức 4', date: '2025-03-18', time: '10:20' },
    { id: 3, url: 'Mở cửa', date: '2025-03-17', time: '18:45' },
  ];

  return (
    <div className="web-history-container">
      <h2>Lịch sử thiết bị</h2>
      <div className="history-list">
        {historyData.map((entry) => (
          <div key={entry.id} className="history-item">
            <p className="url"><strong>Thiết bị:</strong> <a href={entry.url} target="_blank" rel="noopener noreferrer">{entry.url}</a></p>
            <p className="date-time"><strong>Ngày:</strong> {entry.date} <strong>Thời gian:</strong> {entry.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebHistory;
