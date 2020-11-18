import moment from 'moment';

const formatCurrency = (str: string) => {
  return str.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
};

const removeComas = (str: string) => {
  return str.split('.').join('');
};

const dateString = (date: string) => {
  const diff = moment().diff(moment(date, 'DD/MM/YYYY'), 'days');
  if (diff === 0) {
    return 'Hôm nay';
  }
  if (diff === 1) {
    return 'Hôm qua';
  }
  if (diff === 2) {
    return 'Hôm kia';
  }
  return date;
};

export { formatCurrency, removeComas, dateString };
