const app = express();

app.use(basicAuth({
    authorizer : dbAuthorizer,
    authorizeAsync: true,
    challenge: true,
    realm: 'foo',
    unauthorizedResponse : () => "You do not have access to this content. Please log in"
}))
  
async function dbAuthorizer(username, password, callback){
    try {
      // get matching user from db
      const user = await User.findOne({ where: { email: username } })
      // if username is valid compare passwords
      let isValid = (user != null ) ? await bcrypt.compare(password, user.password) : false;
      console.log("Username and password match? ", isValid)
      callback(null, isValid)
    } catch(err) {
      //if authorize fails, log error
      console.log("Error: No access", err)
      callback(null, false)
    }
}