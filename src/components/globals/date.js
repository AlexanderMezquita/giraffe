import "dayjs/locale/es-do";

const dayjs = require("dayjs");
const timezone = require("dayjs/plugin/timezone");
const utc = require("dayjs/plugin/utc");

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/Santo_Domingo");

export default dayjs;
