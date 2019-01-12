import gql from 'graphql-tag'

export const LOGIN_USER = gql`
  mutation($data:LoginUserInput!) {
    login(data: $data) {
      token
    }
  }
`

export const SIGNUP_USER = gql`
  mutation($data:CreateUserInput!) {
    createUser(data: $data) {
      token
    }
  }
`