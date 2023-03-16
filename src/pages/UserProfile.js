import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Loader } from '../components';
import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { addFriend, fetchUserProfile,removeFriend } from '../api';


const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  console.log(auth);
  

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);

      if (response.success) {
        setUser(response.data.user);
      } else {
        toast.error(response.message, {
          autoClose:true,
          position:'top-left',
        });
        return navigate('/');
      }

      setLoading(false);
    };

    getUser();
  }, [userId,navigate]);

  if (loading) {
    return <Loader />;
  }

  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friends;

    const friendIds = friends.map((friend) => friend.to_user._id);
    
    const index = friendIds.indexOf(userId);

    if (index !== -1) {
      return true;
    }

    return false;
  };

  const handleRemoveFriendClick = async () => {
    setRequestInProgress(true);

    const response = await removeFriend(userId);

    if (response.success) {
      const friendship = auth.user.friends.filter(
        (friend) => friend.to_user._id === userId
      );

      auth.updateUserFriends(false, friendship[0]);
      toast.success('Friend removed successfully!', {
        autoClose:true,
        position:'top-left',
      });
    } else {
      toast.error(response.message, {
        autoClose:true,
        position:'top-left',
      });
    }
    setRequestInProgress(false);
  };

  const handleAddFriendClick = async () => {
    setRequestInProgress(true);

    const response = await addFriend(userId);

    if (response.success) {
      const { friendship } = response.data;

      auth.updateUserFriends(true, friendship);
      toast.success('Friend added successfully!', {
        autoClose:true,
        position:'top-left',
      });
    } else {
      toast.error(response.message, {
        autoClose:true,
        position:'top-left',
      });
    }
    setRequestInProgress(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/4440/4440953.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button
          className={`button ${styles.saveBtn}`}
          onClick={handleRemoveFriendClick}
        >
          {requestInProgress ? 'Removing friend...' : 'Remove friend'}
        </button>
      ) : (
        <button
          className={`button ${styles.saveBtn}`}
          onClick={handleAddFriendClick}
          disabled={requestInProgress}
        >
          {requestInProgress ? 'Adding friend...' : 'Add friend'}
        </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;