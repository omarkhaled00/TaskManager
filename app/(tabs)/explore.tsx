import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTaskContext } from '../../context/TaskContext';

export default function AnalyticsScreen() {
  const {
    tasks,
    getTasksByFilter,
    getTasksByPriority,
    clearCompletedTasks,
  } = useTaskContext();

  const activeTasks = getTasksByFilter('active');
  const completedTasks = getTasksByFilter('completed');
  const highPriorityTasks = getTasksByPriority('high');
  const mediumPriorityTasks = getTasksByPriority('medium');
  const lowPriorityTasks = getTasksByPriority('low');

  const completionRate = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;
  const overdueTasks = activeTasks.filter(task => 
    task.dueDate && new Date() > task.dueDate
  );

  const handleClearAllTasks = () => {
    Alert.alert(
      'Clear All Tasks',
      'Are you sure you want to delete all tasks? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear All', style: 'destructive', onPress: () => {
          // This would need to be implemented in the context
          Alert.alert('Not implemented', 'This feature will be added soon!');
        }},
      ]
    );
  };

  const handleExportTasks = () => {
    Alert.alert('Export Tasks', 'This feature will be added soon!');
  };

  const renderStatCard = (title: string, value: string | number, subtitle?: string, color = '#007AFF') => (
    <View style={styles.statCard}>
      <Text style={styles.statCardTitle}>{title}</Text>
      <Text style={[styles.statCardValue, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.statCardSubtitle}>{subtitle}</Text>}
    </View>
  );

  const renderPrioritySection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Priority Breakdown</Text>
      <View style={styles.priorityGrid}>
        <View style={[styles.priorityCard, { backgroundColor: '#ff4444' }]}>
          <Text style={styles.priorityLabel}>High</Text>
          <Text style={styles.priorityCount}>{highPriorityTasks.length}</Text>
        </View>
        <View style={[styles.priorityCard, { backgroundColor: '#ffaa00' }]}>
          <Text style={styles.priorityLabel}>Medium</Text>
          <Text style={styles.priorityCount}>{mediumPriorityTasks.length}</Text>
        </View>
        <View style={[styles.priorityCard, { backgroundColor: '#44ff44' }]}>
          <Text style={styles.priorityLabel}>Low</Text>
          <Text style={styles.priorityCount}>{lowPriorityTasks.length}</Text>
        </View>
      </View>
    </View>
  );

  const renderActionButton = (title: string, icon: string, onPress: () => void, color = '#007AFF') => (
    <TouchableOpacity style={[styles.actionButton, { borderColor: color }]} onPress={onPress}>
      <Ionicons name={icon as any} size={20} color={color} />
      <Text style={[styles.actionButtonText, { color }]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics & Settings</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>

      <View style={styles.statsGrid}>
        {renderStatCard('Total Tasks', tasks.length, 'All tasks')}
        {renderStatCard('Active Tasks', activeTasks.length, 'In progress')}
        {renderStatCard('Completed', completedTasks.length, `${completionRate.toFixed(1)}% completion`)}
        {renderStatCard('Overdue', overdueTasks.length, 'Past due date', '#ff4444')}
      </View>

      {renderPrioritySection()}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions</Text>
        <View style={styles.actionGrid}>
          {renderActionButton('Clear Completed', 'trash-outline', clearCompletedTasks, '#ff4444')}
          {renderActionButton('Export Tasks', 'download-outline', handleExportTasks)}
          {renderActionButton('Clear All Tasks', 'trash', handleClearAllTasks, '#ff4444')}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.aboutCard}>
          <Text style={styles.aboutText}>
            Task Manager is a simple and efficient way to organize your daily tasks. 
            Features include priority levels, due dates, and persistent storage.
          </Text>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statCardTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statCardValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statCardSubtitle: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  section: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  priorityGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  priorityLabel: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 4,
  },
  priorityCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  actionGrid: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  aboutCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});
