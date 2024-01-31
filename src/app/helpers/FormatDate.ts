export const formatFecha = (fecha: any) => {
  const date = new Date(fecha);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Suma 1 porque los meses en JavaScript van de 0 a 11
  const year = date.getFullYear();

  // Asegura que los valores tengan dos dígitos
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
};
