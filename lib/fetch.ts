import axios from "axios"

/* @ts-ignore */
export const fetcher = (url, token) =>
  axios
    .get(url, { headers: { Authorization: "Bearer " + token } })
    .then((res) => res.data)
    .catch(console.error)
