const TZ = 'Asia/Ho_Chi_Minh';

export function todayVN() {
  return new Date().toLocaleDateString('sv-SE', { timeZone: TZ });
}

export function daysAgoVN(days) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toLocaleDateString('sv-SE', { timeZone: TZ });
}

export function nowVN() {
  return new Date().toLocaleString('sv-SE', { timeZone: TZ }).replace(' ', 'T');
}

export function timeNowVN() {
  return new Date().toLocaleTimeString('sv-SE', {
    timeZone: TZ,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export function dateObjVN(date = new Date()) {
  const str = date.toLocaleString('en-US', { timeZone: TZ });
  return new Date(str);
}
