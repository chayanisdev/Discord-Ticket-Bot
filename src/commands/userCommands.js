import { SlashCommandBuilder } from 'discord.js';

export const userCommands = [
  new SlashCommandBuilder()
    .setName('ticket-subscribe')
    .setDescription('Subscribe to ticket notifications'),

  new SlashCommandBuilder()
    .setName('ticket-unsubscribe')
    .setDescription('Unsubscribe from ticket notifications'),

  new SlashCommandBuilder()
    .setName('ticket-note')
    .setDescription('Add a private note to the ticket')
    .addStringOption(option =>
      option.setName('note')
        .setDescription('The note to add')
        .setRequired(true)),

  new SlashCommandBuilder()
    .setName('ticket-claim')
    .setDescription('Claim a ticket to handle it'),

  new SlashCommandBuilder()
    .setName('ticket-unclaim')
    .setDescription('Unclaim a previously claimed ticket'),
];