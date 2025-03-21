class Support {
    getDate() {
        const now = new Date();
    
        const pad = (num) => num.toString().padStart(2, '0');
    
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());
    
        const day = pad(now.getDate());
        const month = pad(now.getMonth() + 1);
        const year = now.getFullYear();
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    getDay() {
        const now = new Date();
    
        const pad = (num) => num.toString().padStart(2, '0');
    
        const day = pad(now.getDate());
        const month = pad(now.getMonth() + 1);
        const year = now.getFullYear();
    
        return `${year}-${month}-${day}`;
    }

    getHour() {
        const now = new Date();
    
        const pad = (num) => num.toString().padStart(2, '0');
    
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());
    
        return `${hours}:${minutes}:${seconds}`;
    }

    groupDataByDate(dataset) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
    
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
    
        const groupedData = {};
    
        dataset.forEach(({ device_type, device_id, status, date, hour }) => {
            const dateObj = new Date(date);
            const dateOnly = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
    
            let timeLabel = "";
            if (dateOnly.getTime() === today.getTime()) timeLabel = "Hôm nay";
            else if (dateOnly.getTime() === yesterday.getTime()) timeLabel = "Hôm qua";
            else {
                const day = dateObj.getDate();
                const month = dateObj.getMonth() + 1;
                timeLabel = `${day} / ${month}`;
            }

            let device = "";
            if (device_type === "door") device = "Cửa";
            else if (device_type === "light") device = "Đèn";
            else if (device_type === "fan") device = "Quạt";
    
            const action = `${hour.slice(0, 5)}: ${device} ${device_id} ${status === "ON" ? "bật" : "tắt"}`;
    
            if (!groupedData[timeLabel]) {
                groupedData[timeLabel] = [];
            }
    
            groupedData[timeLabel].push(action);
        });
    
        return groupedData;
    }
    
}
module.exports = new Support;