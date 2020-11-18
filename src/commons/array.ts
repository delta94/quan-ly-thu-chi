const groupBy = (items: any[], key: string) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {},
  );

const deepCopyArray = (array: any[]) => JSON.parse(JSON.stringify(array));

export { groupBy, deepCopyArray };
