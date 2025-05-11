import React, { useState, useEffect } from 'react';
import './WebHistory.css';
import { getHistory } from '../../util/api';

const WebHistory = () => {
  const [historyData, setHistoryData] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch history data from API
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getHistory();
        console.log(response);
        if (response?.status) {
          setHistoryData(response.result); // Lưu dữ liệu lịch sử vào state
        } else {
          console.error('Failed to fetch history:', response?.message);
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false); // Tắt trạng thái loading
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div className="loading">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="web-history-container">
      <h2 className="history-title">Lịch sử thiết bị</h2>
      <div className="history-list">
        {Object.entries(historyData).map(([date, events]) => (
          <div key={date} className="history-date">
            <h3 className="date-title">{date}</h3>
            <div className="event-grid">
              {events.map((event, index) => (
                <div key={index} className="event-card">
                  {event}
                </div>
              ))} 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebHistory;