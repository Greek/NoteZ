interface Props {
  children: React.ReactNode
}

export const SafeLayout = ({ children }: Props) => {
  return <div>{children}</div>
}
