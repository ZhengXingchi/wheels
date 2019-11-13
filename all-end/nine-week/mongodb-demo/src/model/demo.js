import User from './test'

// 增
const user = {
  name: 'uu',
  age: 30,
  email: 'uu@qq.com'
}

// const insertMethods = async () => {
//   const data = new User(user)
//   const result = await data.save()
//   console.log(result)
// }
// insertMethods()

// 查
// const findMethods = async () => {
//   const result = await User.find()
//   console.log(result)
// }
// findMethods()


// 改
// const updateMethods = async () => {
//   const result = await User.updateOne({ name: 'uu' }, {
//     email: 'uu@uu.com'
//   })
//   console.log(result)
// }
// updateMethods()
// // 删
const deleteMethods = async () => {
  const result = await User.deleteOne({ name: 'uu' })
  console.log(result)
}

deleteMethods()