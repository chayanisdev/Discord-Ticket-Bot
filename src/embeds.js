import { EmbedBuilder } from 'discord.js';
import { COLORS, TICKET_CATEGORIES } from './config/constants.js';

export function createTicketEmbed() {
  return new EmbedBuilder()
    .setColor(COLORS.PRIMARY)
    .setTitle('🎫 Support Tickets')
    .setDescription('Click the button below to create a support ticket')
    .addFields(
      { name: 'Categories', value: Object.values(TICKET_CATEGORIES).join('\n') },
      { name: 'Guidelines', value: 'Please be patient and respectful when creating a ticket.' },
      { name: 'Response Time', value: 'Our team will respond as soon as possible.' }
    )
    .setFooter({ text: 'Support Ticket System' });
}

export function createTicketStatsEmbed(stats) {
  return new EmbedBuilder()
    .setColor(COLORS.PRIMARY)
    .setTitle('📊 Ticket Statistics')
    .addFields(
      { name: 'Open Tickets', value: stats.openTickets.toString(), inline: true },
      { name: 'Closed Today', value: stats.closedToday.toString(), inline: true },
      { name: 'Total Tickets', value: stats.totalTickets.toString(), inline: true },
      { name: 'Average Response Time', value: stats.avgResponseTime, inline: true },
      { name: 'Resolution Rate', value: stats.resolutionRate, inline: true }
    )
    .setTimestamp();
}