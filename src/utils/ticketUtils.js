import { ChannelType, PermissionFlagsBits } from 'discord.js';
import { TICKET_SETTINGS } from '../config/constants.js';

export async function createTicketChannel(guild, member, category) {
  const channelName = `ticket-${category}-${member.user.username}`;

  return await guild.channels.create({
    name: channelName,
    type: ChannelType.GuildText,
    permissionOverwrites: [
      {
        id: guild.id,
        deny: [PermissionFlagsBits.ViewChannel],
      },
      {
        id: member.id,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
      },
    ],
  });
}

export async function getUserOpenTickets(guild, userId) {
  const tickets = await guild.channels.cache.filter(
    channel => channel.name.startsWith('ticket-') && 
    channel.permissionOverwrites.cache.has(userId)
  );
  return tickets.size;
}

export function generateTicketTranscript(channel) {
  // Implementation for generating ticket transcript
  return `Transcript for ticket ${channel.name}`;
}