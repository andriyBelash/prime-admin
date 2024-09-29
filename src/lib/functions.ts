export const formattedDate = (payload: string) => {
  const date = new Date(payload)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // 24-годинний формат
  };

  return new Intl.DateTimeFormat('uk-UA', options).format(date)
    .replace(/(\d{2})\.(\d{2})\.(\d{4}),\s(\d{2}):(\d{2})/, '$3-$2-$1, $4:$5');

}