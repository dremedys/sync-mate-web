import 'dayjs/locale/de';
import 'dayjs/locale/it';
import 'dayjs/locale/fr';

import dayjs, { Dayjs } from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration, { DurationUnitType } from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import isoWeek from 'dayjs/plugin/isoWeek';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isYesterday from 'dayjs/plugin/isYesterday';
import localeData from 'dayjs/plugin/localeData';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isoWeek);
dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(isYesterday);
dayjs.extend(localeData);
dayjs.extend(duration);
export class TimeUtil {
  static validate(param: string, format: string) {
    const currentDate = dayjs(param, format);
    const isValid = currentDate.format(format) === param;
    if (!isValid) {
      throw new Error(
        `Invalid date string ${param} for format ${format}. Date to compare: ${currentDate.toISOString()}`,
      );
    }
  }

  static now() {
    const locale = this.getCurrentLocale();
    return dayjs().locale(locale);
  }

  static dayjs(config?: dayjs.ConfigType) {
    const locale = this.getCurrentLocale();
    return dayjs(config).locale(locale);
  }

  static parse(param: string, format: string) {
    this.validate(param, format);
    const locale = this.getCurrentLocale();
    return dayjs(param).locale(locale);
  }

  static add(date: string | Date, { value, unit }: { value: number; unit: dayjs.ManipulateType | undefined }) {
    return dayjs(date).add(value, unit);
  }

  static getYear(date: string | Date) {
    return dayjs(date).year();
  }

  static getMonth(date: string | Date) {
    return dayjs(date).month();
  }
  static getDay(date: string | Date) {
    return dayjs(date).day();
  }

  static getHour(date: string | Date) {
    return dayjs(date).hour();
  }

  static getFormatted(date: string | Date, format?: string) {
    const locale = this.getCurrentLocale();
    return dayjs(date).locale(locale).format(format);
  }

  static getFormattedIgnoreTimezone(date: string, format?: string) {
    const locale = this.getCurrentLocale();
    return dayjs(date).utc().locale(locale).format(format);
  }

  static getNumberOfDaysInMonth(params: string) {
    return dayjs(params).daysInMonth();
  }

  static getDiffOfYears(firstYear: Date | string, secondYear: Date | string) {
    return dayjs(secondYear).diff(firstYear, 'year');
  }

  static getDiffOfDays(firstYear: Date | string, secondYear: Date | string) {
    return dayjs(secondYear).diff(firstYear, 'day');
  }

  static getDiffOfMinutes(firstDate: Date | string, secondDate: Date | string) {
    return dayjs(secondDate).diff(firstDate, 'minute');
  }

  static getDiffOfHours(firstDate: Date | string, secondDate: Date | string) {
    return dayjs(secondDate).diff(firstDate, 'hour');
  }

  static getDiffOfMilliseconds(firstDate: Date | string, secondDate: Date | string) {
    return dayjs(secondDate).diff(firstDate, 'millisecond');
  }

  static getDiffOfMonths(firstDate: Date | string, secondDate: Date | string) {
    const locale = this.getCurrentLocale();
    return dayjs(secondDate).locale(locale).diff(firstDate, 'month');
  }

  static monthsShort() {
    return dayjs().localeData().monthsShort();
  }

  static humanize(time: number, unit: DurationUnitType | undefined = 'minutes') {
    return dayjs.duration(time, unit).humanize(true);
  }

  static equalizeWithUTCTimezone(date: Date | string): Dayjs {
    const offset = new Date().getTimezoneOffset();
    if (offset >= 0) {
      return dayjs(date).add(offset, 'minute');
    }
    return dayjs(date).subtract(-offset, 'minute');
  }

  static parseToLocalTime(date: Date | string): Dayjs {
    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const locale = this.getCurrentLocale();
    return dayjs(date).locale(locale).tz(localTimezone);
  }
}

type TimezoneUnion = `${Timezone}`;

export const getCalendarRangeToString = (
  from?: Date | string | null,
  to?: Date | string | null,
  format?: string,
  timezone?: TimezoneUnion,
) => {
  const fromDate = from && dayjs(from).tz(timezone);
  const toDate = to && dayjs(to).tz(timezone).subtract(1, 'minute');

  if (fromDate && !toDate) return fromDate.format(format || DAY_MONTH_FULL_YEAR_FORMAT);

  if (fromDate && toDate) {
    if (fromDate.isSame(toDate, 'month') && fromDate.isSame(toDate, 'year')) {
      if (fromDate.isSame(toDate, 'day')) {
        return toDate?.format(format || DAY_MONTH_FULL_YEAR_FORMAT);
      }

      if (fromDate.isSame(toDate, 'month')) {
        const diffDays = TimeUtil.getDiffOfDays(fromDate.toISOString(), toDate.add(1, 'minute').toISOString());
        const currentMonthDays = TimeUtil.parse(fromDate.toISOString(), ISO_DATE_FORMAT).daysInMonth();

        if (diffDays !== currentMonthDays) {
          return `${fromDate.format(DAY_FORMAT)}-${toDate.format(DAY_MONTH_FULL_YEAR_FORMAT)}`;
        }

        return fromDate.format(format || MONTH_AND_YEAR_SHORT_FORMAT);
      }

      return `${fromDate.format(format || DAY_FORMAT)}-${toDate.format(format || DAY_MONTH_FULL_YEAR_FORMAT)}`;
    }

    if (fromDate.isSame(toDate, 'year')) {
      return `${fromDate?.format(format || DAY_AND_MONTH_SHORT_FORMAT)}-${
        toDate?.format(format || DAY_MONTH_YEAR_FORMAT) || ''
      }`;
    }

    return `${fromDate?.format(format || DAY_MONTH_YEAR_FORMAT)}-${
      toDate?.format(format || DAY_MONTH_YEAR_FORMAT) || ''
    }`;
  }

  return undefined;
};

export function getYearsOptions({ from, to, isOnlyYear }: { from: number; to?: number; isOnlyYear?: boolean }) {
  const timeNow = TimeUtil.now();

  const toYear = to || timeNow.year();
  const startYearDayjs = TimeUtil.parse(`${from}-01-01`, 'YYYY-MM-DD').startOf('year');
  const startYear = startYearDayjs.year();
  const years: Option[] = [];
  let incrementNumber = 0;

  if (startYear > toYear) {
    for (let i = toYear; i <= startYear; i += 1) {
      years.push({
        label: i.toString(),
        value: isOnlyYear
          ? timeNow.add(incrementNumber, 'year').year().toString()
          : timeNow.add(incrementNumber, 'year').toISOString(),
      });
      incrementNumber++;
    }

    return years;
  }

  for (let i = from; i <= toYear; i += 1) {
    years.push({
      label: i.toString(),
      value: isOnlyYear
        ? startYearDayjs.startOf('day').add(incrementNumber, 'year').year().toString()
        : startYearDayjs.startOf('day').add(incrementNumber, 'year').toISOString(),
    });
    incrementNumber++;
  }

  return years.reverse();
}
