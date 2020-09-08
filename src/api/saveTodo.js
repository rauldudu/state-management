export const saveTodo = async todo => {
  // throw new Error('Oops!')

  const response = await fetch(`${process.env.REACT_APP_API_URL}/todos`, {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('Oops!')
  }

  return response.json()
}
