export const fetchTodos = async () => {
  // throw new Error('Oops!')

  const response = await fetch(`${process.env.REACT_APP_API_URL}/todos`)

  if (!response.ok) {
    throw new Error('Oops!')
  }

  return response.json()
}
