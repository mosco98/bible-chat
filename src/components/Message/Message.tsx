import cn from "classnames"
import moment from "moment"
import { MessageTypes } from "../../utils/types"
import styles from "./Message.module.scss"

export default function Message({ text, type, date }: MessageTypes) {
  const messageInnerClasses = cn(styles.Message__inner, styles[`type-${type}`])

  const time = moment(date).format("H:mm")

  return (
    <div className={styles.Message}>
      <div className={messageInnerClasses}>
        <p>{text}</p>

        <span className="text-xs text-gray-100 mt-1">{time}</span>
      </div>
    </div>
  )
}
