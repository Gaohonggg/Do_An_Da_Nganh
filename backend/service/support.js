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
}
module.exports = new Support;