import { SlashCommandBuilder } from 'discord.js';

export const moderationCommands = [
  new SlashCommandBuilder()
    .setName('ticket-lock')
    .setDescription('Lock a ticket to prevent user messages')
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for locking the ticket')
        .setRequired(false)),

  new SlashCommandBuilder()
    .setName('ticket-unlock')
    .setDescription('Unlock a previously locked ticket'),

  new SlashCommandBuilder()
    .setName('ticket-rename')
    .setDescription('Rename a ticket channel')
    .addStringOption(option =>
      option.setName('name')
        .setDescription('New name for the ticket')
        .setRequired(true)),

  new SlashCommandBuilder()
    .setName('ticket-alert')
    .setDescription('Send an alert to all ticket staff')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('Alert message')
        .setRequired(true)),
];