import { useClerk } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export const SignOutButton = ({ showAlert }) => {
  const { signOut } = useClerk();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    signOutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: colors.borderLight,
      shadowColor: colors.shadowLight,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 3,
      gap: 8,
    },
    signOutText: {
      color: colors.error,
      fontSize: 14,
      fontWeight: '700',
    },
  });

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
      <Ionicons name="log-out-outline" size={20} color={colors.error} />
      <Text style={styles.signOutText}>Sign Out</Text>
    </TouchableOpacity>
  );
};