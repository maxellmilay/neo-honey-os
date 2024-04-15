import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Label } from '../../components/ui/label';
import styles from './boot.module.css'; // Import CSS styles


export const BootApp = () => {
  const history = useNavigate();

  const nextPage = async () => {
    history('/desktop')
  }

  return (
    <div className={styles.bodyBackground} onClick={nextPage}> {/* Apply background class */}
      <Label className={styles.welcomeText}>Welcome, Honey!</Label> {/* Apply welcomeText class */}
    </div>
  );
};
