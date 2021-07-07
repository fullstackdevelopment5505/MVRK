export interface IUser {
  id?: string
  firstName?: string
  lastName?: string
  email?: string
  phoneNumber?: string
  companySize?: string
  title?: string
  company?: string
  avatar?: string
  conversations?: object[]
  messages?: object[]
  status?: string
  address1?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
  companyAddress1?: string
  companyPostalCode?: string
  companyCity?: string
  companyState?: string
  companyCountry?: string
  timeZone: string
  team: string
  interests: String[]
  tShirt: string
  accessibilityNeeds: string
  invitedTo: string[]
  viewOnlyTicket: boolean
  rsvp?: string[]
  createdAt?: string
  updatedAt?: string
}

interface IEvent {
  [key: string]: string
}

export enum UserStatus {
  ONLINE = 'Online',
  OFFLINE = 'Offline'
}
