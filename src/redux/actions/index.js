export const START_LOAD = 'START_LOAD'
export const END_LOAD = 'END_LOAD'
export const TRIGGER = 'TRIGGER'
export const MY_PROFILE = 'MY_PROFILE'

export const load = () => ({
  type: START_LOAD,
})

export const endLoad = () => ({
  type: END_LOAD,
})

export const trigger = () => ({
  type: TRIGGER,
})

export const getProfileData = (accessToken) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3030/api/users/me', {
        headers: {
          Authorization: accessToken,
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        const userData = {
          id: data.id,
          boardId: data.board.id,
          username: data.username,
          email: data.email,
          proPic: data.proPicUrl,
          registration: data.registration,
          name: data.name,
          surname: data.surname,
          birthday: data.birthday,
          gender: data.gender,
          occupation: data.occupation,
          hobbies: data.hobbies,
          bio: data.bio,
        }
        dispatch({ type: MY_PROFILE, payload: userData })
      } else {
        const data = await res.json()
        throw new Error(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
}