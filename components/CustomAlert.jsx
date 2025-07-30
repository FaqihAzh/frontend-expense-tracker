import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import {COLORS_MASTER} from "../constants/colorsMaster";

export const CustomAlert = ({ visible, type, title, message, onConfirm, onCancel, showCancel = false }) => {
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
      default:
        return 'information-circle';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return COLORS_MASTER.success;
      case 'error':
        return COLORS_MASTER.error;
      case 'warning':
        return COLORS_MASTER.warning;
      case 'confirm':
        return COLORS_MASTER.primary;
      default:
        return COLORS_MASTER.info;
    }
  };

  const getIconBackgroundColor = () => {
    switch (type) {
      case 'success':
        return COLORS_MASTER.incomeLight;
      case 'error':
        return COLORS_MASTER.expenseLight;
      case 'warning':
        return COLORS_MASTER.accentLight;
      case 'confirm':
        return COLORS_MASTER.backgroundSecondary;
      default:
        return COLORS_MASTER.backgroundSecondary;
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
        <View style={[styles.alertContainer, { backgroundColor: COLORS_MASTER.card }]}>
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  alertContainer: {
    backgroundColor: COLORS_MASTER.card,
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    maxWidth: 340,
    width: '100%',
    shadowColor: COLORS_MASTER.shadow,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 12,
    borderWidth: 1,
    borderColor: COLORS_MASTER.borderLight,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: COLORS_MASTER.shadowLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS_MASTER.text,
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  message: {
    fontSize: 16,
    color: COLORS_MASTER.textSecondary,
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
    shadowColor: COLORS_MASTER.shadowLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  cancelButton: {
    backgroundColor: COLORS_MASTER.backgroundSecondary,
    borderWidth: 2,
    borderColor: COLORS_MASTER.border,
    flex: 1,
    shadowOpacity: 0,
  },
  confirmButton: {
    backgroundColor: COLORS_MASTER.primary,
    flex: 1,
  },
  singleButton: {
    minWidth: 140,
    flex: 0,
  },
  cancelButtonText: {
    color: COLORS_MASTER.textSecondary,
    fontSize: 16,
    fontWeight: '700',
  },
  confirmButtonText: {
    color: COLORS_MASTER.white,
    fontSize: 16,
    fontWeight: '700',
  },
});