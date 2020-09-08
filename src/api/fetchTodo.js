export const fetchTodo = async id => {
  // throw new Error('Oops!')

  const data = await fetch(`${process.env.REACT_APP_API_URL}/todos/${id}`)

  if (!data.ok) {
    throw new Error('Oops!')
  }

  return data.json()
}
