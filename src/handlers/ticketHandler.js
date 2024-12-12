import { TICKET_SETTINGS } from '../config/constants.js';
import { createTicketChannel, getUserOpenTickets, generateTicketTranscript } from '../utils/ticketUtils.js';
import { canManageTickets } from '../utils/permissions.js';

export async function handleTicketCreate(interaction) {
  const { guild, member } = interaction;

  // Check if user has reached max tickets
  const openTickets = await getUserOpenTickets(guild, member.id);
  if (openTickets >= TICKET_SETTINGS.MAX_OPEN_TICKETS) {
    return interaction.reply({
      content: `You can only have ${TICKET_SETTINGS.MAX_OPEN_TICKETS} open tickets at a time.`,
      ephemeral: true
    });
  }

  const channel = await createTicketChannel(guild, member, 'general');
  await channel.send({
    content: `Welcome ${member}! Support will be with you shortly. Please describe your issue.`,
    components: [{
      type: 1,
      components: [{
        type: 2,
        label: 'Close Ticket',
        style: 4,
        custom_id: 'close_ticket',
      }],
    }],
  });

  return interaction.reply({
    content: `Ticket created! Please check ${channel}`,
    ephemeral: true,
  });
}

export async function handleTicketClose(interaction) {
  const channel = interaction.channel;

  if (TICKET_SETTINGS.TRANSCRIPT_ENABLED) {
    const transcript = generateTicketTranscript(channel);
    // Save or send transcript logic here
  }

  await channel.delete();
}

export async function handleAddUser(interaction) {
  if (!interaction.channel.name.startsWith('ticket-')) {
    return interaction.reply({ content: 'This command can only be used in ticket channels!', ephemeral: true });
  }

  const user = interaction.options.getUser('user');
  await interaction.channel.permissionOverwrites.edit(user, {
    ViewChannel: true,
    SendMessages: true
  });

  return interaction.reply({ content: `Added ${user} to the ticket.`, ephemeral: true });
}

export async function handleRemoveUser(interaction) {
  if (!interaction.channel.name.startsWith('ticket-')) {
    return interaction.reply({ content: 'This command can only be used in ticket channels!', ephemeral: true });
  }

  const user = interaction.options.getUser('user');
  await interaction.channel.permissionOverwrites.delete(user);

  return interaction.reply({ content: `Removed ${user} from the ticket.`, ephemeral: true });
}