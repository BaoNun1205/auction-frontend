export const splitDateTime = (dateTime) => {
  const date = new Date(dateTime)
  const formattedDate = date.toLocaleDateString('en-GB')
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return { date: formattedDate, time }
}

export const formatRelativeTime = (createdAt) => {
  const createdDate = new Date(createdAt)
  const now = new Date()
  const diffInMs = now - createdDate

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30))
  const diffInYears = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365))

  if (diffInYears >= 1) {
    return `${diffInYears} năm trước`
  } else if (diffInMonths >= 1) {
    return `${diffInMonths} tháng trước`
  } else if (diffInDays >= 1) {
    return `${diffInDays} ngày trước`
  } else if (diffInHours >= 1) {
    return `${diffInHours} giờ trước`
  } else {
    return `${diffInMinutes} phút trước`
  }
}

export const formatCustomDate = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffTime = now - date
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  const weekdays = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
  const weekday = weekdays[date.getDay()]
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const currentYear = now.getFullYear()
  const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  const isYesterday = date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear()

  if (isToday) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  if (isYesterday) return 'Hôm qua'
  if (diffDays > 0 && diffDays <= 3) return weekday
  if (diffDays > 3 && year === currentYear) return `${day}/${month}`
  return `${day}/${month}/${year}`
}