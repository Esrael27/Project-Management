export enum UserRole {
  MEMBER = 'MEMBER', // Regular member of the system
  ADMIN = 'ADMIN',   // Administrator with full access rights
}

export enum UserPermission {
  ADD_PROJECT = 'ADD_PROJECT',               // Permission to add a new project
  TRACK_PROGRESS = 'TRACK_PROGRESS',         // Permission to track project progress
  DELEGATE_TASKS = 'DELEGATE_TASKS',         // Permission to delegate tasks within projects
  SET_DEADLINES = 'SET_DEADLINES',           // Permission to set deadlines for tasks or projects
  TRACK_ISSUES = 'TRACK_ISSUES',             // Permission to track issues or bugs within projects
  ADJUST_SCHEDULES = 'ADJUST_SCHEDULES',     // Permission to adjust project schedules
  RECEIVE_NOTIFICATIONS = 'RECEIVE_NOTIFICATIONS', // Permission to receive system notifications
  MEMBER = 'MEMBER',                         // Permission to perform member-specific actions
  ADMIN = 'ADMIN',                           // Permission to perform admin-specific actions
}

export const RolePermissions: Record<UserRole, UserPermission[]> = {
  [UserRole.ADMIN]: [
    UserPermission.ADD_PROJECT,
    UserPermission.TRACK_PROGRESS,
    UserPermission.DELEGATE_TASKS,
    UserPermission.SET_DEADLINES,
    UserPermission.TRACK_ISSUES,
    UserPermission.ADJUST_SCHEDULES,
    UserPermission.RECEIVE_NOTIFICATIONS,
  ],
  [UserRole.MEMBER]: [
    UserPermission.TRACK_PROGRESS,
    UserPermission.TRACK_ISSUES,
    UserPermission.RECEIVE_NOTIFICATIONS,
  ],
};
