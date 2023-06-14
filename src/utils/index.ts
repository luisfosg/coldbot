const charsTable = {
  top: '═',
  'top-mid': '╤',
  'top-left': '╔',
  'top-right': '╗',
  bottom: '═',
  'bottom-mid': '╧',
  'bottom-left': '╚',
  'bottom-right': '╝',
  left: '║',
  'left-mid': '',
  mid: '',
  'mid-mid': '',
  right: '║',
  'right-mid': '',
  middle: '│'
}

const getFilePath = (file: string) => {
  if (!file.endsWith('.js') && !file.endsWith('.ts')) return file + '/index.js'
  return file
}

export default {
  charsTable,
  getFilePath
}
