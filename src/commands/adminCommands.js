import { SlashCommandBuilder } from 'discord.js';

export const adminCommands = [
  new SlashCommandBuilder()
    .setName('ticket-settings')
    .setDescription('Manage ticket system settings')
    .addSubcommand(subcommand =>
      subcommand
        .setName('max-tickets')
        .setDescription('Set maximum open tickets per user')
        .addIntegerOption(option =>
          option.setName('limit')
            .setDescription('Maximum number of tickets')
            .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('auto-close')
        .setDescription('Set auto-close time for inactive tickets')
        .addIntegerOption(option =>
          option.setName('hours')
            .setDescription('Hours of inactivity before auto-close')
            .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('staff-role')
        .setDescription('Set ticket staff role')
        .addRoleOption(option =>
          option.setName('role')
            .setDescription('Staff role')
            .setRequired(true))),

  new SlashCommandBuilder()
    .setName('ticket-archive')
    .setDescription('Archive a ticket')
    .addBooleanOption(option =>
      option.setName('with-transcript')
        .setDescription('Include transcript in archive')
        .setRequired(false)),

  new SlashCommandBuilder()
    .setName('ticket-bulk-close')
    .setDescription('Close multiple tickets')
    .addStringOption(option =>
      option.setName('category')
        .setDescription('Category of tickets to close')
        .setRequired(false))
    .addBooleanOption(option =>
      option.setName('inactive-only')
        .setDescription('Close only inactive tickets')
        .setRequired(false)),
];