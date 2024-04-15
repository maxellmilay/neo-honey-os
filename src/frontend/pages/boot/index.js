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
    
    setIsLoggedIn(true);
    history('/desktop');

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
