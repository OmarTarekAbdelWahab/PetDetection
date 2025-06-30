export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const formatProcessingTime = (seconds) => {

    seconds = Math.floor(seconds/1000);
    let formattedTime = `${seconds % 60}s`;
    const minutes = (seconds - seconds % 60) / 60;
    if (minutes > 0) formattedTime = `${minutes % 60}m ` + formattedTime;
    const hours = (minutes - minutes % 60) / 60;
    if (hours > 0) formattedTime = `${hours}h ` + formattedTime;
    

    return formattedTime;
};
