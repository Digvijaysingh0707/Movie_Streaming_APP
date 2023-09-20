export const checkValidateData = (email, password, name) => {
  const emailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)
  const passwordValid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{6,16}$/.test(password)
  const nameValid = /^[A-Za-z]+(?:[-\s][A-Za-z]+)*$/.test(name)
  if (!name) return "Name is not valid"
  if (!emailValid) return "Email is not valid"
  if (!passwordValid) return "Password is not valid"
  return null
}