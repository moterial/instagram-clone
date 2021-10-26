import './App.css';
import React, {useState, useEffect} from 'react';
import Post from './Post';
import {auth, db} from './firebase';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ImageUpload from './ImageUpload';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function App() {

  const[posts,setPosts]=useState([]);
  const[open,setOpen]=useState(false);
  const[openSignIn,setOpenSignIn]=useState('');
  const[username,setUsername] = useState('');
  const[password,setPassword] = useState('');
  const[email,setEmail] = useState('');
  const[user,setUser] = useState(null);

  //The useEffect is a frontend listener to see te changes on the frontend, auth.onAuthStateChanged is a backend listener
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        //user has logged in --- The console.log() method is used to output information on the console. This method is very helpful for testing the development process.
        console.log(authUser);
        //it can still track the authUser even if you refresh the page
        setUser(authUser);
      }else{
        //user has logged out
        setUser(null);
      }
    })

    return ()=>{
      //perform some cleanup actions
      unsubscribe();
    }
  },[user,username]);


  //useEffect -> Runs a piece of code based on a specific condtion(example, Run code when page refreshes)
  useEffect(()=> {
    //This is where the code runs
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot =>{
      //every time a new post is added, this code fires...
      setPosts(snapshot.docs.map(doc => ({
        id:doc.id,
        post: doc.data()

      })));
    })
  },[]); //the blanket here is the condition, if empty, it means run once when page load but not gonna run again and RUN everytime the variable -- the post changes


  const signUp = (event)=>{
    event.preventDefault();

    auth
    .createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        //I have always set displayName to the same name as the variable I am assigning it to. 
        //This is would only been used in development builds as it is removed through dead-code elimination on production builds and should not be relied on within your application.
       displayName:username
      })
    })
    .catch((error)=>alert(error.message));
  }

  const signIn = (event) =>{
    event.preventDefault();

    auth.signInWithEmailAndPassword(email,password).catch((error)=>alert(error.message));
    setOpenSignIn(false);
  }


  return (
    <div className="app">

      
      

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
              <div >
              <Box sx={style}>
              <form className="app_signup">
              <center>
              <img 
                className="app_headerImage" 
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
                alt="" 
              />
              </center>
              <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              />

              <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              />

              <Input
              placeholder="password"
              type="text"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signUp}>Sign Up</Button>
              </form>
              </Box>
          
        </div>

      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >

        <div >
              <Box sx={style}>
              <form className="app_signup">
              <center>
              <img 
                className="app_headerImage" 
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
                alt="" 
              />
              </center>

              <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              />

              <Input
              placeholder="password"
              type="text"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signIn}>Sign In</Button>
              </form>
              </Box>
          
        </div>

      </Modal>

      {/*Header part*/}
      <div className="app_header">
        <img 
          className="app_headerImage" 
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
          alt=""> 

        </img>

        {user? (
        <Button onClick={()=>auth.signOut()}>Logout</Button>
      ):(
        <div className="app_loginContainer">
          <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={()=>setOpen(true)}>Sign Up</Button>
        </div>    
      )}
      </div>

      
      
      <h1><center>Instagram clone</center></h1>
      

      <div className="app_posts">
        {
          posts.map(({id, post}) =>(
            <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
          ))
        }
      </div>


      

      {user?.displayName ? (
        <ImageUpload username={user.displayName}/>
      ):(
        <h3>You have to login to upload</h3>
      )}
      

      {/*<Post username="Sdsa" caption="123" imageUrl="https://townsquare.media/site/252/files/2019/04/bts-boy-with-love-music-video.jpg"/>*/}
        



    </div>
  );
}

export default App;
