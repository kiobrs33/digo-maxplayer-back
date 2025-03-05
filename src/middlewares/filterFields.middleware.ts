export const filterWhitelist = (
  data: Record<string, any>,
  allowedFields: string[]
) => {
  // Filtra las claves del objeto 'data' para incluir solo las que están en el array 'allowedFields'
  return (
    Object.keys(data)
      .filter((key) => allowedFields.includes(key))
      // Reduce las claves filtradas para crear un nuevo objeto solo con los campos permitidos
      .reduce((filteredData: any, key: any) => {
        // Copia el valor de cada campo permitido al nuevo objeto
        filteredData[key] = data[key];
        return filteredData;
      }, {})
  );
};
