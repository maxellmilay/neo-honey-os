import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import React, { useState } from 'react'
import userIcon from '../../assets/img/user.png'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import styles from './desktop.module.css'

export const Desktop = ({ }) => {

  return (
    <div className={`${styles.loginContainer} flex flex-col items-center justify-center pb-12 mb-12`}>
      <Label className={`${styles.welcomeText} pt-4`}> Display Something here</Label>
      <Label className={`${styles.welcomeText} pt-4`}> Desktop Area</Label>
    </div>
  )
}
