// Get current Date and Date one year ago, to collect currency rates for a whole year
export const handleDate = (startDate = true) => {
    // If startDate true, returns current date, else return the date 1 year ago
    const splitDate = new Date().toLocaleDateString("sk-SK", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).replace(/\s+/g, "").split(".");

    if(startDate) {
        return `${splitDate[2] - 1}-${splitDate[1]}-${splitDate[0]}`;
    }
    return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
};