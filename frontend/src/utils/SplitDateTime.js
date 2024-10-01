const splitDateTime = (dateTime) => {
  const [date, time] = dateTime.split('T')
  return { date, time }
}

export default splitDateTime