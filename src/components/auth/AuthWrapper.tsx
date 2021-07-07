import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import { withAuthenticator, ConfirmSignIn, RequireNewPassword, VerifyContact } from 'aws-amplify-react'
import { useDispatch, useSelector } from 'react-redux'
import { get } from 'lodash'

// Components
import ConfirmSignUp from './ConfirmSignUp'
import SignIn from './SignIn'
import SignUp from './SignUp'
import PasswordReset from './PasswordReset'
import { GameWrapper } from 'UI'
import { Registration } from './Registration'
import { Loader } from 'components/shared'

// Types
import { IUser } from 'types'

// Helpers
import { graphQLQuery, graphQLSubscription } from 'graphql/helpers'
import { listUsers, userByEmail } from 'graphql/queries'
import { authStateSelector } from 'redux/auth'
import { addConversation, addPerson } from 'redux/chat'
import { withAuthState } from 'hocs/withAuthState'
import { onCreateConvoLink, onCreateUser } from 'graphql/subscriptions'

// const AuthWrapperBase: any =
//  withAuthenticator(
//   () => {
//     const [loading, setLoading] = useState<boolean>(true)
//     const [gameLoading, setGameLoading] = useState<boolean>(false)
//     const [loaderOptions, setLoaderOptions] = useState<object>({})
//     const [user, setCurrentUser] = useState<IUser | null>(null)
//     const [users, setUsers] = useState<IUser[]>([])
//     const dispatch = useDispatch()
//     const defaultAvatar = 'defaultAvatar.jpg'

//     useEffect(() => {
//       let subscription

//       const getCurrentUser = async () => {
//         const {
//           attributes: { email }
//         } = await Auth.currentAuthenticatedUser()
//         const foundUser = await graphQLQuery(userByEmail, 'userByEmail', {
//           email
//         })
//         if (foundUser) {
//           if (!foundUser.avatar) {
//             foundUser.avatar = defaultAvatar
//           }
//           setCurrentUser(foundUser)
//           if (foundUser && foundUser.id) {
//             setGameLoading(true)
//           }
//           setTimeout(() => {
//             setLoading(false)
//           }, 500)

//           subscription = graphQLSubscription(onCreateConvoLink, { convoLinkUserId: foundUser.id }, conversation => {
//             dispatch(
//               addConversation({
//                 id: get(conversation, 'onCreateConvoLink.conversation.id', ''),
//                 name: get(conversation, 'onCreateConvoLink.conversation.name', ''),
//                 members: get(conversation, 'onCreateConvoLink.conversation.members', [])
//               })
//             )
//             setCurrentUser(foundUser)
//           })
//         } else {
//           setCurrentUser({ email: email, avatar: defaultAvatar })
//           setTimeout(() => {
//             setLoading(false)
//           }, 500)
//         }
//       }

//       const getUserList = async () => {
//         const userData = await graphQLQuery(listUsers, 'listUsers')
//         userData.forEach(user => {
//           if (!user.avatar) {
//             user.avatar = defaultAvatar
//           }
//         })
//         setUsers(userData)

//         subscription = graphQLSubscription(onCreateUser, {}, newUser => {
//           userData.push(newUser.onCreateUser)
//           dispatch(
//             addPerson({
//               name: `${get(newUser, 'onCreateUser.firstName', '')} ${get(newUser, 'onCreateUser.lastName', '')}`,
//               id: get(newUser, 'onCreateUser.id', ''),
//               conversationId: ''
//             })
//           )
//           setUsers(userData)
//         })
//       }

//       getCurrentUser()
//       getUserList()

//       return () => {
//         // unsubscribe on unmount
//         // @ts-ignore
//         subscription && subscription.unsubscribe && subscription.unsubscribe()
//       }
//       // eslint-disable-next-line
//     }, [])

//     return (
//       <>
//         {loading || gameLoading ? <Loader loaderOptions={loaderOptions} /> : null}
//         {!loading && user && user.id && (
//           <GameWrapper user={user} users={users} setGameLoading={setGameLoading} setLoaderOptions={setLoaderOptions} />
//         )}
//         {!loading && user && !user.id && <Registration user={user} setUser={setCurrentUser} />}
//       </>
//     )
//   },
//   false,
//   [
//     <SignIn />,
//     <ConfirmSignIn />,
//     <VerifyContact />,
//     // @ts-ignore
//     <SignUp hideAllDefaults={true} />,
//     <ConfirmSignUp />,
//     <PasswordReset />,
//     <RequireNewPassword />
//   ]
// )

export const AuthWrapper = () => {
  // const authState = useSelector(authStateSelector)
  // console.log(authState)
  // const AuthComponent = withAuthState(AuthWrapperBase, authState)
  // return <AuthComponent />
}
