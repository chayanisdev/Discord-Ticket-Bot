import { PermissionFlagsBits } from 'discord.js';

export function hasAdminPermissions(member) {
  return member.permissions.has(PermissionFlagsBits.Administrator);
}

export function hasModeratorPermissions(member) {
  return member.permissions.has(PermissionFlagsBits.ManageChannels) || 
         member.permissions.has(PermissionFlagsBits.ManageMessages);
}

export function canManageTickets(member) {
  return hasAdminPermissions(member) || hasModeratorPermissions(member);
}