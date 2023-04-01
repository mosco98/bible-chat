import cn from "classnames"
import { motion } from "framer-motion"
import moment from "moment"
import { MessageTypes } from "../../utils/types"
import styles from "./Message.module.scss"

export default function Message({ text, type, date }: MessageTypes) {
  const messageInnerClasses = cn(styles.Message__inner, styles[`type-${type}`])

  const time = moment(String(date)).format("H:mm A")

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1, type: "spring" } }}
      className={styles.Message}
    >
      <div className={messageInnerClasses}>
        <p>{text}</p>

        {date && (
          <span className="text-xs text-gray-100 mt-2 block opacity-80">
            {time}
          </span>
        )}
      </div>
    </motion.div>
  )
}
