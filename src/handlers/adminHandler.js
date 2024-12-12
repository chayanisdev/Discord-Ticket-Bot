import { canManageTickets } from '../utils/permissions.js';
import { TICKET_SETTINGS } from '../config/constants.js';

export async function handleTicketSettings(interaction) {
  if (!canManageTickets(interaction.member)) {
    return interaction.reply({ content: 'You do not have permission to manage ticket settings!', ephemeral: true });
  }

  const subcommand = interaction.options.getSubcommand();

  switch (subcommand) {
    case 'max-tickets':
      const limit = interaction.options.getInteger('limit');
      TICKET_SETTINGS.MAX_OPEN_TICKETS = limit;
      return interaction.reply(`Maximum tickets per user set to: ${limit}`);

    case 'auto-close':
      const hours = interaction.options.getInteger('hours');
      TICKET_SETTINGS.AUTO_CLOSE_HOURS = hours;
      return interaction.reply(`Auto-close time set to: ${hours} hours`);

    case 'staff-role':
      const role = interaction.options.getRole('role');
      // Save staff role logic here
      return interaction.reply(`Staff role set to: ${role.name}`);
  }
}

export async function handleTicketArchive(interaction) {
  if (!interaction.channel.name.startsWith('ticket-')) {
    return interaction.reply({ content: 'This command can only be used in ticket channels!', ephemeral: true });
  }

  if (!canManageTickets(interaction.member)) {
    return interaction.reply({ content: 'You do not have permission to archive tickets!', ephemeral: true });
  }

  const withTranscript = interaction.options.getBoolean('with-transcript') ?? true;

  // Archive logic here
  if (withTranscript) {
    // Generate and save transcript
  }

  return interaction.reply('Ticket archived successfully!');
}

export async function handleTicketBulkClose(interaction) {
  if (!canManageTickets(interaction.member)) {
    return interaction.reply({ content: 'You do not have permission to bulk close tickets!', ephemeral: true });
  }

  const category = interaction.options.getString('category');
  const inactiveOnly = interaction.options.getBoolean('inactive-only') ?? false;

  // Bulk close logic here
  const closedCount = 0; // Replace with actual count

  return interaction.reply(`Closed ${closedCount} tickets.`);
}