import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";
import "dayjs/locale/es-us";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/Santo_Domingo");

export default dayjs;
