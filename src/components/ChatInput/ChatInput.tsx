import { useState } from "react"
import styles from "./ChatInput.module.scss"

type ChatInputProps = {
  onChange: (value: string) => void
  onSubmit: () => void
  placeholder?: string
}

export default function ChatInput({
  onChange,
  onSubmit,
  placeholder
}: ChatInputProps) {
  const [textInput, setTextInput] = useState("")
  const [rows, setRows] = useState(1)

  const minRows = 1
  const maxRows = 10

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const textareaLineHeight = 24

    const previousRows = event.target.rows
    event.target.rows = minRows // reset number of rows in textarea

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight)

    if (currentRows === previousRows) {
      event.target.rows = currentRows
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows
      event.target.scrollTop = event.target.scrollHeight
    }

    const newRows = currentRows < maxRows ? currentRows : maxRows

    setTextInput(event.target.value)
    setRows(newRows)

    onChange(event.target.value)
  }

  const onFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (!textInput) return

    onSubmit()
    setTextInput("")
    setRows(1)
  }

  return (
    <form onSubmit={onFormSubmit} className={styles.ChatInput}>
      <textarea
        placeholder={placeholder}
        value={textInput}
        rows={rows}
        onChange={handleTextAreaChange}
      />

      <button disabled={!textInput ? true : false}>
        <span>Send</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </button>
    </form>
  )
}
