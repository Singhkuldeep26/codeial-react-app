import { useState } from 'react';
import { toast } from 'react-toastify';

import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';

const Settings = () => {
  const auth = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user?.name ? auth.user.name : '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingForm, setSavingForm] = useState(false);

  const clearForm = () => {
    setPassword('');
    setConfirmPassword('');
  };

  const updateProfile = async () => {
    setSavingForm(true);

    let error = false;
    if (!name || !password || !confirmPassword) {
      toast.error('Please fill all the fields', {
        autoClose:true,
        position:'top-left',
      });

      error = true;
    }

    if (password !== confirmPassword) {
      toast.error('Password and confirm password does not match', {
        autoClose:true,
        position:'top-left',
      });

      error = true;
    }

    if (error) {
      return setSavingForm(false);
    }

    const response = await auth.updateUser(
      auth.user._id,
      name,
      password,
      confirmPassword
    );

    console.log('settings response', response);
    if (response.success) {
      setEditMode(false);
      setSavingForm(false);
      clearForm();

      return toast.success('User updated successfully', {
        autoClose:true,
        position:'top-right',
      });
    } else {
      toast.error(response.message, {
        autoClose:true,
        position:'top-left',
      });
    }
    setSavingForm(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/4440/4440953.png"
          alt="user-pic"
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>

      {editMode && (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </>
      )}

      <div className={styles.btnGrp}>
        {editMode ? (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={updateProfile}
              disabled={savingForm}
            >
              {savingForm ? 'Saving profile...' : 'Save profile'}
            </button>
            <button
              className={`button ${styles.editBtn}`}
              onClick={() => setEditMode(false)}
            >
              Go back
            </button>
          </>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
