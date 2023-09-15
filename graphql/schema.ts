import { mergeTypeDefs } from '@graphql-tools/merge'
import userDefs from './Schemas/userSchema'
import articleDefs from './Schemas/articleSchema'
import commentDefs from './Schemas/commentSchema'
import authDefs from './Schemas/authSchema'
import categoryDefs from './Schemas/categorySchema'

const types = [userDefs, articleDefs, commentDefs, authDefs, categoryDefs]
export default mergeTypeDefs(types)