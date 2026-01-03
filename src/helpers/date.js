import moment from "moment";
export const dateComparator = (filterLocalDateAtMidnight, cellValue) => {
    var date = new Date(cellValue);
    if (date < filterLocalDateAtMidnight) {
        return -1;
    } else if (date > filterLocalDateAtMidnight) {
        return 1;
    } else {
        return 0;
    }
};

export const formatDate = (date, format = "yyyy-MM-dd") => {
    return moment(date).format(format);
};
