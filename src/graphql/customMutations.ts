export const userCompletedReg = /* GraphQL */ `
  mutation CompleteRegistration($input: UpdateUserInput!, $condition: ModelUserConditionInput) {
    updateUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      avatar
      phoneNumber
      company
      companySize
      companyAddress1
      companyCity
      companyState
      companyPostalCode
      country
      address1
      city
      state
      postalCode
      title
      timeZone
      team
      interests
      tShirt
      accessibilityNeeds
      rsvp
      invitedTo
      viewOnlyTicket
      createdAt
      updatedAt
    }
  }
`

export const generateUser = /* GraphQL */ `
  mutation GenerateUser($input: CreateUserInput!, $condition: ModelUserConditionInput) {
    createUser(input: $input, condition: $condition) {
      id
      email
      firstName
      lastName
      invitedTo
      viewOnlyTicket
      createdAt
      updatedAt
    }
  }
`
