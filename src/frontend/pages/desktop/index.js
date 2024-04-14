import React, { useState } from 'react'
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
