import { useClerk } from '@clerk/clerk-expo';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {COLORS_MASTER} from "../constants/colorsMaster";

export const SignOutButton = ({ showAlert }) => {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    showAlert(
      'confirm-sign-out',
      'Sign Out',
      'Are you sure you want to sign out of your account?',
      async () => {
        try {
          await signOut();
        } catch (err) {
          console.error('Error signing out:', err);
          showAlert('error', 'Error', 'Failed to sign out. Please try again.');
        }
      },
      () => {},
      true
    );
  };

  return (
    <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
      <Ionicons name="log-out-outline" size={20} color={COLORS_MASTER.error} />
      <Text style={styles.signOutText}>Sign Out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS_MASTER.card,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS_MASTER.borderLight,
    shadowColor: COLORS_MASTER.shadowLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
    gap: 8,
  },
  signOutText: {
    color: COLORS_MASTER.error,
    fontSize: 14,
    fontWeight: '700',
  },
});