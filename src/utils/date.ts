import dayjs from "dayjs";
import TimeZone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(TimeZone);
dayjs.extend(relativeTime);

export const transformUtcTime = () => {
  return dayjs().utc();
};
// 根据时区转换时间
export const formatTime = (
  date: number,
  formate: string = "YYYY-MM-DD HH:mm:ss"
) => {
  const utcTime = dayjs(date).tz(getGuess());
  return dayjs(utcTime).format(formate);
};
// 获取时区
export const getGuess = () => {
  return dayjs.tz.guess();
};
/**
 *
 * @param date 时间戳
 * @description 格式化时间为相对时间（如“5分钟前”、“昨天”等
 * @returns
 */
export const formatRelativeTime = (date: number) => {
  return dayjs(date).tz(getGuess()).fromNow();
};
