import React from 'react';
import { Label } from '../../components/ui/label';
import styles from './boot.module.css'; // Import CSS styles

export const BootApp = () => {
  return (
    <div className={styles.bodyBackground}> {/* Apply background class */}
      <Label className={styles.welcomeText}>Welcome Honey!</Label> {/* Apply welcomeText class */}
    </div>
  );
};
