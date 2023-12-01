const dayjs = require("dayjs");
const timezone = require("dayjs/plugin/timezone");
const utc = require("dayjs/plugin/utc");
const LocalizedFormat = require("dayjs/plugin/localizedFormat");
const es = require("dayjs/locale/es-do");

dayjs.extend(LocalizedFormat);
dayjs.extend(utc);
dayjs.locale(es);

export default dayjs;
