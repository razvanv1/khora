/*
 * KHORA Reminders Hook
 * Gestionează reminderele push pentru hidratare și suplimente
 */

import { useState, useEffect, useCallback } from 'react';

export interface Reminder {
  id: string;
  type: 'hydration' | 'supplement';
  title: string;
  message: string;
  time: string; // Format HH:MM
  enabled: boolean;
  days: number[]; // 0-6 (Duminică-Sâmbătă)
}

interface RemindersState {
  reminders: Reminder[];
  notificationPermission: NotificationPermission | 'default';
}

const DEFAULT_REMINDERS: Reminder[] = [
  {
    id: 'hydration-morning',
    type: 'hydration',
    title: '💧 Hidratare',
    message: 'Nu uita să bei un pahar de apă!',
    time: '08:00',
    enabled: false,
    days: [1, 2, 3, 4, 5] // Luni-Vineri
  },
  {
    id: 'hydration-noon',
    type: 'hydration',
    title: '💧 Hidratare',
    message: 'Ești la jumătatea zilei - bea apă!',
    time: '12:00',
    enabled: false,
    days: [1, 2, 3, 4, 5]
  },
  {
    id: 'hydration-afternoon',
    type: 'hydration',
    title: '💧 Hidratare',
    message: 'Reminder: hidratează-te!',
    time: '16:00',
    enabled: false,
    days: [1, 2, 3, 4, 5]
  },
  {
    id: 'supplement-b12',
    type: 'supplement',
    title: '💊 Supliment B12',
    message: 'E timpul pentru vitamina B12!',
    time: '09:00',
    enabled: false,
    days: [1, 3, 5] // Luni, Miercuri, Vineri
  },
  {
    id: 'supplement-d3',
    type: 'supplement',
    title: '☀️ Vitamina D3',
    message: 'Nu uita de vitamina D3!',
    time: '10:00',
    enabled: false,
    days: [0, 1, 2, 3, 4, 5, 6] // Zilnic
  },
  {
    id: 'supplement-omega3',
    type: 'supplement',
    title: '🐟 Omega-3',
    message: 'E timpul pentru Omega-3!',
    time: '13:00',
    enabled: false,
    days: [0, 1, 2, 3, 4, 5, 6]
  }
];

const STORAGE_KEY = 'khora_reminders';

export function useReminders() {
  const [state, setState] = useState<RemindersState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const savedReminders = saved ? JSON.parse(saved) : DEFAULT_REMINDERS;
    return {
      reminders: savedReminders,
      notificationPermission: typeof Notification !== 'undefined' ? Notification.permission : 'default'
    };
  });

  // Salvează reminderele în localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.reminders));
  }, [state.reminders]);

  // Verifică și programează notificările
  useEffect(() => {
    if (state.notificationPermission !== 'granted') return;

    const checkReminders = () => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const currentDay = now.getDay();

      state.reminders.forEach(reminder => {
        if (reminder.enabled && reminder.time === currentTime && reminder.days.includes(currentDay)) {
          showNotification(reminder);
        }
      });
    };

    // Verifică la fiecare minut
    const interval = setInterval(checkReminders, 60000);
    
    // Verifică imediat la pornire
    checkReminders();

    return () => clearInterval(interval);
  }, [state.reminders, state.notificationPermission]);

  const requestPermission = useCallback(async () => {
    if (typeof Notification === 'undefined') {
      return 'denied';
    }

    try {
      const permission = await Notification.requestPermission();
      setState(prev => ({ ...prev, notificationPermission: permission }));
      return permission;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied';
    }
  }, []);

  const showNotification = useCallback((reminder: Reminder) => {
    if (state.notificationPermission !== 'granted') return;

    try {
      const notification = new Notification(reminder.title, {
        body: reminder.message,
        icon: '/images/khora-icon.png',
        badge: '/images/khora-icon.png',
        tag: reminder.id,
        requireInteraction: false,
        silent: false
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      // Auto-close după 10 secunde
      setTimeout(() => notification.close(), 10000);
    } catch (error) {
      console.error('Error showing notification:', error);
    }
  }, [state.notificationPermission]);

  const toggleReminder = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      reminders: prev.reminders.map(r =>
        r.id === id ? { ...r, enabled: !r.enabled } : r
      )
    }));
  }, []);

  const updateReminderTime = useCallback((id: string, time: string) => {
    setState(prev => ({
      ...prev,
      reminders: prev.reminders.map(r =>
        r.id === id ? { ...r, time } : r
      )
    }));
  }, []);

  const updateReminderDays = useCallback((id: string, days: number[]) => {
    setState(prev => ({
      ...prev,
      reminders: prev.reminders.map(r =>
        r.id === id ? { ...r, days } : r
      )
    }));
  }, []);

  const addCustomReminder = useCallback((reminder: Omit<Reminder, 'id'>) => {
    const id = `custom-${Date.now()}`;
    setState(prev => ({
      ...prev,
      reminders: [...prev.reminders, { ...reminder, id }]
    }));
    return id;
  }, []);

  const removeReminder = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      reminders: prev.reminders.filter(r => r.id !== id)
    }));
  }, []);

  const testNotification = useCallback(() => {
    if (state.notificationPermission === 'granted') {
      showNotification({
        id: 'test',
        type: 'hydration',
        title: '🧪 Test Notificare',
        message: 'Notificările Khora funcționează corect!',
        time: '',
        enabled: true,
        days: []
      });
    }
  }, [state.notificationPermission, showNotification]);

  return {
    reminders: state.reminders,
    notificationPermission: state.notificationPermission,
    requestPermission,
    toggleReminder,
    updateReminderTime,
    updateReminderDays,
    addCustomReminder,
    removeReminder,
    testNotification,
    hydrationReminders: state.reminders.filter(r => r.type === 'hydration'),
    supplementReminders: state.reminders.filter(r => r.type === 'supplement')
  };
}
