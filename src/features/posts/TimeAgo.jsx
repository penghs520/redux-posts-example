export const TimeAgo = ({ timestamp }) => {
    let timeAgo = '';
    if (timestamp) {
        const date = new Date(timestamp);
        const now = Date.now();
        const secondsAgo = Math.floor((now - date.getTime()) / 1000);

        //也可可以使用 date-fns 库来格式化时间
        // const timePeriod = formatDistanceToNow(date);
        // timeAgo = `${timePeriod} ago`;

        if (secondsAgo < 60) {
            timeAgo = `${secondsAgo} 秒前`;
        } else if (secondsAgo < 3600) {
            const minutesAgo = Math.floor(secondsAgo / 60);
            timeAgo = `${minutesAgo} 分钟前`;
        } else if (secondsAgo < 86400) {
            const hoursAgo = Math.floor(secondsAgo / 3600);
            timeAgo = `${hoursAgo} 小时前`;
        } else {
            const daysAgo = Math.floor(secondsAgo / 86400);
            timeAgo = `${daysAgo} 天前`;
        }
    }

    return (
        <span title={timestamp}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    );
}