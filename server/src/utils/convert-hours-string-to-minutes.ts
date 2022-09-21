//recebendo assim 18:00 e convertendo para isso 1800

export function convertHoursStringToMinutes(hourString: string) {
  const[hours, minutes] = hourString.split(':').map(Number)

  const minutesAmount = (hours * 60) + minutes;

  return minutesAmount
}