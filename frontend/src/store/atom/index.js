import {atom} from 'recoil'
export const userAtom = atom({
  key: 'jwtAtom',
  default: {
    username: '',
    userId: '',
    firstName: '',
    lastName: '',
    token: ''
  }
})

export const recepientAtom = atom({
  key: 'sendUserAtom',
  default : {
    userId: '',
    firstName: '',
    lastName: '',
    transferStatus: 'not initiated'
  }
})