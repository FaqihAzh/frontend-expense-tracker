import { useClerk } from '@clerk/clerk-expo';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

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
      <Ionicons name="log-out-outline" size={20} color={COLORS.expense} />
      <Text style={styles.signOutText}>Sign Out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFCDD2',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    gap: 6,
  },
  signOutText: {
    color: COLORS.expense,
    fontSize: 14,
    fontWeight: '600',
  },
});