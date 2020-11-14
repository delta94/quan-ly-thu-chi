const formatCurrency = (str: string) => {
  return str.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
};

const removeComas = (str: string) => {
  return str.split('.').join('');
};

export { formatCurrency, removeComas };
