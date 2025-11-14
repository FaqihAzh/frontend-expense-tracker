import { Ionicons } from '@expo/vector-icons';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export const CustomAlert = ({ visible, type, title, message, onConfirm, onCancel, showCancel = false }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    alertContainer: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 28,
      alignItems: 'center',
      maxWidth: 340,
      width: '100%',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 1,
      shadowRadius: 24,
      elevation: 12,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    iconContainer: {
      width: 64,
      height: 64,
      borderRadius: 32,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      shadowColor: colors.shadowLight,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 4,
    },
    title: {
      fontSize: 22,
      fontWeight: '800',
      color: colors.text,
      marginBottom: 12,
      textAlign: 'center',
      letterSpacing: -0.5,
    },
    message: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 28,
      lineHeight: 24,
      fontWeight: '500',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 12,
      width: '100%',
    },
    button: {
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 16,
      minWidth: 88,
      alignItems: 'center',
      shadowColor: colors.shadowLight,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 3,
    },
    cancelButton: {
      backgroundColor: colors.backgroundSecondary,
      borderWidth: 2,
      borderColor: colors.border,
      flex: 1,
      shadowOpacity: 0,
    },
    confirmButton: {
      backgroundColor: colors.primary,
      flex: 1,
    },
    singleButton: {
      minWidth: 140,
      flex: 0,
    },
    cancelButtonText: {
      color: colors.textSecondary,
      fontSize: 16,
      fontWeight: '700',
    },
    confirmButtonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '700',
    },
  });

  const getIconName = () => {
    switch (type) {
      case 'success':
        return 'checkmark-circle';
      case 'error':
        return 'alert-circle';
      case 'warning':
        return 'warning';
      case 'confirm':
        return 'help-circle';
      case 'confirm-sign-out':
        return 'log-out';
      default:
        return 'information-circle';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return colors.success;
      case 'error':
        return colors.error;
      case 'warning':
        return colors.warning;
      case 'confirm':
        return colors.primary;
      case 'confirm-sign-out':
        return colors.error;
      default:
        return colors.info;
    }
  };

  const getIconBackgroundColor = () => {
    switch (type) {
      case 'success':
        return colors.incomeLight;
      case 'error':
        return colors.expenseLight;
      case 'warning':
        return colors.accentLight;
      case 'confirm':
        return colors.backgroundSecondary;
      default:
        return colors.backgroundSecondary;
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel || onConfirm}
    >
      <View style={styles.overlay}>
        <View style={[styles.alertContainer, { backgroundColor: colors.card }]}>
          <View style={[styles.iconContainer, { backgroundColor: getIconBackgroundColor() }]}>
            <Ionicons
              name={getIconName()}
              size={32}
              color={getIconColor()}
            />
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonContainer}>
            {showCancel && (
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[
                styles.button,
                styles.confirmButton,
                !showCancel && styles.singleButton,
                { backgroundColor: getIconColor() }
              ]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmButtonText}>
                {type === 'confirm' ? 'Delete' : type === 'confirm-sign-out' ? 'Sign Out' : 'OK'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};