import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import userIcon from '../../assets/img/user.png'
import styles from './boot.module.css'

export const BootApp = ({ onLogin }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState(''); // State variable for username error message
  const [passwordError, setPasswordError] = useState(''); 
  const history = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    setPasswordError('');
    document.getElementById("password").style.borderColor = '';

    try {
      // Perform login logic
      const result = await window.sqlite.usersDB.authenticateUser(password);
      
      if (result) {
        setIsLoggedIn(true);
        history('/desktop');
      } else {
          // Handle invalid login
          if (!password) {
              setPasswordError('Password is required');
              document.getElementById("password").style.borderColor = 'red';
          } else {
              setPasswordError('Incorrect password');
              document.getElementById("password").style.borderColor = 'red';
          }
      }
  } catch (error) {
      console.error('Error during login:', error);
      // Handle any unexpected errors here
  }
  }

  return (
    <div className={`${styles.loginContainer} flex flex-col items-center justify-center pb-12 mb-12`}>
      <div className={styles.userIcon}>
        <img src={userIcon} />
      </div>
      <Label className={`${styles.welcomeText} pt-4`}>Welcome Honey!</Label>
        <form onSubmit={handleLogin}>
          <div className='pt-12 flex flex-row items-center gap-5 w-full'>
            <Input 
                id="password"
                placeholder="Enter password"
                type="password"
                value={password} 
                className="text-purple-950"
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="destructive">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className={`${styles.error} text-left pt-2 text-red-600 text-sm font-semibold`}>{passwordError}</div>
        </form>
    </div>
  )
}
