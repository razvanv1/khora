/*
 * KHORA Admin Dashboard
 * Design: Premium Apple VisionOS 2026
 * Limba: Română
 */

import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { 
  Users, 
  Mail, 
  Bell, 
  BarChart3, 
  ArrowLeft,
  Check,
  AlertCircle,
  RefreshCw,
  UserPlus,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Admin() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  // Check if user is admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center px-6">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-light text-white mb-2">Acces Restricționat</h1>
          <p className="text-white/50 mb-6">Doar administratorii pot accesa această pagină.</p>
          <Link href="/">
            <Button variant="outline" className="text-white border-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Înapoi Acasă
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Fetch dashboard data
  const { data: stats, isLoading: statsLoading, refetch: refetchStats } = trpc.admin.stats.useQuery();
  const { data: subscribersData, isLoading: subscribersLoading } = trpc.admin.subscribers.useQuery({ limit: 10, offset: 0 });
  const { data: notifications, refetch: refetchNotifications } = trpc.admin.notifications.useQuery();
  const { data: emailLogs } = trpc.admin.emailLogs.useQuery({ limit: 10 });

  const markAllRead = trpc.admin.markAllNotificationsRead.useMutation({
    onSuccess: () => {
      refetchNotifications();
      toast.success('Toate notificările au fost marcate ca citite');
    }
  });

  const testNotification = trpc.admin.testNotification.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Notificare de test trimisă cu succes!');
      } else {
        toast.error('Eroare la trimiterea notificării');
      }
    }
  });

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.04)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  };

  return (
    <div className="min-h-screen bg-[#0a1628] px-6 py-8 pb-32">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-light text-white">Admin Dashboard</h1>
            <p className="text-white/50 text-sm">Khora Management</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white/60 hover:text-white"
          onClick={() => {
            refetchStats();
            refetchNotifications();
          }}
        >
          <RefreshCw className="w-5 h-5" />
        </Button>
      </motion.header>

      {/* Stats Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-4 mb-8"
      >
        <div className="p-4 rounded-2xl" style={cardStyle}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(45, 212, 191, 0.15)' }}>
              <UserPlus className="w-5 h-5 text-[#2dd4bf]" />
            </div>
          </div>
          <p className="text-3xl font-light text-white">{statsLoading ? '...' : stats?.totalSubscribers || 0}</p>
          <p className="text-white/60 text-xs">Total Abonați</p>
          <p className="text-[#2dd4bf] text-xs mt-1">+{stats?.todaySubscribers || 0} azi</p>
        </div>

        <div className="p-4 rounded-2xl" style={cardStyle}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(212, 165, 116, 0.15)' }}>
              <Users className="w-5 h-5 text-[#d4a574]" />
            </div>
          </div>
          <p className="text-3xl font-light text-white">{statsLoading ? '...' : stats?.totalUsers || 0}</p>
          <p className="text-white/60 text-xs">Utilizatori Logați</p>
          <p className="text-[#d4a574] text-xs mt-1">+{stats?.todayUsers || 0} azi</p>
        </div>

        <div className="p-4 rounded-2xl" style={cardStyle}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(96, 165, 250, 0.15)' }}>
              <Mail className="w-5 h-5 text-[#60a5fa]" />
            </div>
          </div>
          <p className="text-3xl font-light text-white">{statsLoading ? '...' : stats?.emailsSentToday || 0}</p>
          <p className="text-white/60 text-xs">Emailuri Trimise</p>
          <p className="text-white/60 text-xs mt-1">azi</p>
        </div>

        <div className="p-4 rounded-2xl" style={cardStyle}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(167, 139, 250, 0.15)' }}>
              <Bell className="w-5 h-5 text-[#a78bfa]" />
            </div>
          </div>
          <p className="text-3xl font-light text-white">{statsLoading ? '...' : stats?.unreadNotifications || 0}</p>
          <p className="text-white/60 text-xs">Notificări Necitite</p>
        </div>
      </motion.section>

      {/* Notifications */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-light text-white">Notificări</h2>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white/60 text-xs"
              onClick={() => testNotification.mutate()}
              disabled={testNotification.isPending}
            >
              <Send className="w-3 h-3 mr-1" />
              Test
            </Button>
            {notifications && notifications.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white/60 text-xs"
                onClick={() => markAllRead.mutate()}
              >
                <Check className="w-3 h-3 mr-1" />
                Marchează toate
              </Button>
            )}
          </div>
        </div>
        <div className="space-y-2">
          {notifications && notifications.length > 0 ? (
            notifications.slice(0, 5).map((notif) => (
              <div key={notif.id} className="p-3 rounded-xl" style={cardStyle}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" 
                    style={{ background: notif.type === 'new_subscriber' ? 'rgba(45, 212, 191, 0.15)' : 'rgba(212, 165, 116, 0.15)' }}>
                    {notif.type === 'new_subscriber' ? (
                      <UserPlus className="w-4 h-4 text-[#2dd4bf]" />
                    ) : (
                      <Bell className="w-4 h-4 text-[#d4a574]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">{notif.title}</p>
                    <p className="text-white/60 text-xs truncate">{notif.message}</p>
                    <p className="text-white/60 text-xs mt-1">
                      {new Date(notif.createdAt).toLocaleString('ro-RO')}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 rounded-xl text-center" style={cardStyle}>
              <p className="text-white/60 text-sm">Nicio notificare nouă</p>
            </div>
          )}
        </div>
      </motion.section>

      {/* Recent Subscribers */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-lg font-light text-white mb-4">Abonați Recenți</h2>
        <div className="space-y-2">
          {subscribersLoading ? (
            <div className="p-4 rounded-xl text-center" style={cardStyle}>
              <p className="text-white/60 text-sm">Se încarcă...</p>
            </div>
          ) : subscribersData?.subscribers && subscribersData.subscribers.length > 0 ? (
            subscribersData.subscribers.map((sub) => (
              <div key={sub.id} className="p-3 rounded-xl" style={cardStyle}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-medium">{sub.name || 'Anonim'}</p>
                    <p className="text-white/60 text-xs">{sub.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/60 text-xs">{sub.dietaryStyle || '-'}</p>
                    <p className="text-white/60 text-xs">
                      {new Date(sub.createdAt).toLocaleDateString('ro-RO')}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 rounded-xl text-center" style={cardStyle}>
              <p className="text-white/60 text-sm">Niciun abonat încă</p>
            </div>
          )}
        </div>
      </motion.section>

      {/* Email Logs */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-lg font-light text-white mb-4">Emailuri Recente</h2>
        <div className="space-y-2">
          {emailLogs && emailLogs.length > 0 ? (
            emailLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="p-3 rounded-xl" style={cardStyle}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm">{log.subject || 'Fără subiect'}</p>
                    <p className="text-white/60 text-xs">{log.recipientEmail}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-xs ${
                    log.status === 'sent' ? 'bg-green-500/20 text-green-400' :
                    log.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {log.status === 'sent' ? 'Trimis' : log.status === 'pending' ? 'În așteptare' : 'Eșuat'}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 rounded-xl text-center" style={cardStyle}>
              <p className="text-white/60 text-sm">Niciun email trimis încă</p>
            </div>
          )}
        </div>
      </motion.section>
    </div>
  );
}
