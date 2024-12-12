import { SlashCommandBuilder } from 'discord.js';
import { TICKET_CATEGORIES } from '../config/constants.js';
import { canManageTickets } from '../utils/permissions.js';
import { createTicketEmbed, createTicketStatsEmbed } from '../embeds.js';

export const ticketCommands = [
  new SlashCommandBuilder()
    .setName('setup-tickets')
    .setDescription('Sets up the ticket system in the current channel')
    .setDefaultMemberPermissions('0'),

  new SlashCommandBuilder()
    .setName('ticket-stats')
    .setDescription('Shows ticket statistics'),

  new SlashCommandBuilder()
    .setName('add-user')
    .setDescription('Add a user to the current ticket')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to add')
        .setRequired(true)),

  new SlashCommandBuilder()
    .setName('remove-user')
    .setDescription('Remove a user from the current ticket')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to remove')
        .setRequired(true)),

  new SlashCommandBuilder()
    .setName('ticket-category')
    .setDescription('Change ticket category')
    .addStringOption(option =>
      option.setName('category')
        .setDescription('The new category')
        .setRequired(true)
        .addChoices(
          { name: 'General Support', value: TICKET_CATEGORIES.GENERAL },
          { name: 'Technical Support', value: TICKET_CATEGORIES.TECHNICAL },
          { name: 'Billing Support', value: TICKET_CATEGORIES.BILLING },
          { name: 'Feedback', value: TICKET_CATEGORIES.FEEDBACK }
        )),

  new SlashCommandBuilder()
    .setName('ticket-priority')
    .setDescription('Set ticket priority')
    .addStringOption(option =>
      option.setName('level')
        .setDescription('Priority level')
        .setRequired(true)
        .addChoices(
          { name: 'Low', value: 'low' },
          { name: 'Medium', value: 'medium' },
          { name: 'High', value: 'high' },
          { name: 'Urgent', value: 'urgent' }
        )),

  new SlashCommandBuilder()
    .setName('ticket-transcript')
    .setDescription('Generate a transcript of the current ticket'),

  new SlashCommandBuilder()
    .setName('blacklist')
    .setDescription('Manage ticket system blacklist')
    .addSubcommand(subcommand =>
      subcommand
        .setName('add')
        .setDescription('Add a user to the blacklist')
        .addUserOption(option =>
          option.setName('user')
            .setDescription('The user to blacklist')
            .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('remove')
        .setDescription('Remove a user from the blacklist')
        .addUserOption(option =>
          option.setName('user')
            .setDescription('The user to unblacklist')
            .setRequired(true)))
];