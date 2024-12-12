import { PermissionFlagsBits } from 'discord.js';
import { canManageTickets } from '../utils/permissions.js';

export async function handleTicketLock(interaction) {
  if (!interaction.channel.name.startsWith('ticket-')) {
    return interaction.reply({ content: 'This command can only be used in ticket channels!', ephemeral: true });
  }

  if (!canManageTickets(interaction.member)) {
    return interaction.reply({ content: 'You do not have permission to lock tickets!', ephemeral: true });
  }

  const reason = interaction.options.getString('reason') || 'No reason provided';
  await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
    SendMessages: false
  });

  return interaction.reply(`🔒 Ticket locked. Reason: ${reason}`);
}

export async function handleTicketUnlock(interaction) {
  if (!interaction.channel.name.startsWith('ticket-')) {
    return interaction.reply({ content: 'This command can only be used in ticket channels!', ephemeral: true });
  }

  if (!canManageTickets(interaction.member)) {
    return interaction.reply({ content: 'You do not have permission to unlock tickets!', ephemeral: true });
  }

  await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
    SendMessages: null
  });

  return interaction.reply('🔓 Ticket unlocked.');
}

export async function handleTicketRename(interaction) {
  if (!interaction.channel.name.startsWith('ticket-')) {
    return interaction.reply({ content: 'This command can only be used in ticket channels!', ephemeral: true });
  }

  const newName = interaction.options.getString('name');
  await interaction.channel.setName(`ticket-${newName}`);

  return interaction.reply(`Channel renamed to: ticket-${newName}`);
}

export async function handleTicketAlert(interaction) {
  if (!canManageTickets(interaction.member)) {
    return interaction.reply({ content: 'You do not have permission to send alerts!', ephemeral: true });
  }

  const message = interaction.options.getString('message');
  const staffRole = interaction.guild.roles.cache.find(role => role.name === 'Ticket Staff');

  if (staffRole) {
    await interaction.channel.send(`🚨 **Staff Alert** 🚨\n${staffRole}\n${message}`);
    return interaction.reply({ content: 'Alert sent to staff members.', ephemeral: true });
  }

  return interaction.reply({ content: 'Staff role not found!', ephemeral: true });
}