import React, { useState, ChangeEvent } from 'react'
import { Storage } from 'aws-amplify'
import TextField from '@material-ui/core/TextField'
import { useDropzone } from 'react-dropzone'
import { v4 as uuid } from 'uuid'

import { PillButton } from 'components/shared'
import { ReactComponent as Logo } from 'assets/mvrk.svg'
import { IUser } from 'types'
import { graphQLMutation } from 'graphql/helpers'
// import { createUser } from 'graphql/mutations'

export const Registration = ({ user: baseUser, setUser }) => {
  // const [userInfo, setUserInfo] = useState<IUser | null>(null)
  // const [loading, setLoading] = useState<boolean>(false)
  // const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
  //   accept: 'image/jpeg, image/png'
  // })
  // // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  // //   const { target } = e
  // //   setUserInfo({
  // //     ...userInfo,
  // //     [target.name]: target.value
  // //   })
  // // }
  // const createNewUser = async (user: IUser) => {
  //   setLoading(true)
  //   const id = uuid()
  //   if (acceptedFiles && acceptedFiles[0]) {
  //     const file = acceptedFiles[0]
  //     const avatar = `${id}.${file.type.split('/')[1]}`
  //     // eslint-disable-next-line
  //     const [_, newUserRes] = await Promise.all([
  //       Storage.put(avatar, file, { level: 'public', contentType: file.type }),
  //       graphQLMutation(createUser, {
  //         ...user,
  //         email: baseUser.email,
  //         id,
  //         avatar
  //       })
  //     ])
  //     setLoading(false)
  //     // @ts-ignore
  //     return setUser(newUserRes.data.createUser)
  //   } else {
  //     const newUserRes = await graphQLMutation(createUser, {
  //       ...user,
  //       email: baseUser.email,
  //       id
  //     })
  //     setLoading(false)
  //     // @ts-ignore
  //     return setUser(newUserRes.data.createUser)
  //   }
  // }
  // const submitUser = async () => {
  //   if (
  //     userInfo &&
  //     userInfo.firstName &&
  //     userInfo.lastName &&
  //     userInfo.company &&
  //     userInfo.city &&
  //     userInfo.state &&
  //     userInfo.country
  //   ) {
  //     setLoading(true)
  //     try {
  //       await createNewUser(userInfo)
  //     } catch (err) {}
  //     setLoading(false)
  //   }
  // }
  // return (
  //   <section className='sign-in'>
  //     <div className='login'>
  //       <Logo fill='black' width={150} className='logo' />
  //       <div className='login-form'>
  //         <div className='actions title-box'>
  //           <h3 className='title'>
  //             Congrats! You're In <br /> <small>To get started, let's set up your personal profile.</small>
  //           </h3>
  //         </div>
  //         <form
  //           onSubmit={e => {
  //             e.preventDefault()
  //             submitUser()
  //           }}
  //         >
  //           <div className='d-flex'>
  //             <TextField
  //               variant='outlined'
  //               placeholder='First Name*'
  //               fullWidth={true}
  //               className='input mr-4'
  //               type='text'
  //               name='firstName'
  //               onChange={handleChange}
  //             />
  //             <TextField
  //               variant='outlined'
  //               placeholder='Last Name*'
  //               fullWidth={true}
  //               className='input'
  //               type='text'
  //               name='lastName'
  //               onChange={handleChange}
  //             />
  //           </div>
  //           <TextField
  //             variant='outlined'
  //             placeholder='Company*'
  //             fullWidth={true}
  //             className='input'
  //             type='text'
  //             name='company'
  //             onChange={handleChange}
  //           />
  //           <div className='d-flex'>
  //             <TextField
  //               variant='outlined'
  //               placeholder='City*'
  //               fullWidth={true}
  //               className='input mr-4'
  //               type='text'
  //               name='city'
  //               onChange={handleChange}
  //             />
  //             <TextField
  //               variant='outlined'
  //               placeholder='State*'
  //               fullWidth={true}
  //               className='input'
  //               type='text'
  //               name='state'
  //               onChange={handleChange}
  //             />
  //           </div>
  //           <TextField
  //             variant='outlined'
  //             placeholder='Country*'
  //             fullWidth={true}
  //             className='input'
  //             type='text'
  //             name='country'
  //             onChange={handleChange}
  //           />
  //           <div {...getRootProps()} className='drag-drop'>
  //             <input {...getInputProps()} />
  //             {isDragActive ? (
  //               <p>Drop the image here ...</p>
  //             ) : acceptedFiles[0] ? (
  //               <p>Selected Image: {acceptedFiles[0].name}</p>
  //             ) : (
  //               <p>Please upload a photo of yourself or choose an avatar to use for your badge.</p>
  //             )}
  //           </div>
  //           <div className='actions'>
  //             <PillButton type='submit' className='button' variant='outlined' loading={loading}>
  //               Continue
  //             </PillButton>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //     <div className='spacer' />
  //   </section>
  // )
}
