export interface MessageTypes {
  id?: string
  text: string
  type: "sender" | "receiver"
  date?: string
}
