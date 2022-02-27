import {UnAuthenticatedError} from '../errors/index.js'


const checkPermissions = (requestUser,resourceUserId) => {
    
    if(requestUser.userId === resourceUserId.toString()) return
    
   throw new UnAuthenticatedError('not authorized')
}


export default checkPermissions