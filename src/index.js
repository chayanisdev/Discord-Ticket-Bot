import { Client, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { registerCommands } from './handlers/commandHandler.js';
import { handleTicketCreate, handleTicketClose, handleAddUser, handleRemoveUser } from './handlers/ticketHandler.js';
import { handleTicketLock, handleTicketUnlock, handleTicketRename, handleTicketAlert } from './handlers/moderationHandler.js';
import { handleTicketSubscribe, handleTicketUnsubscribe, handleTicketNote, handleTicketClaim, handleTicketUnclaim } from './handlers/userHandler.js';
import { handleTicketSettings, handleTicketArchive, handleTicketBulkClose } from './handlers/adminHandler.js';
import { createTicketEmbed, createTicketStatsEmbed } from './embeds.js';
import { canManageTickets } from './utils/permissions.js';

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  registerCommands(client);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand() && !interaction.isButton()) return;

  // Handle button interactions
  if (interaction.isButton()) {
    switch (interaction.customId) {
      case 'create_ticket':
        await handleTicketCreate(interaction);
        break;
      case 'close_ticket':
        await handleTicketClose(interaction);
        break;
    }
    return;
  }

  // Handle slash commands
  switch (interaction.commandName) {
    // Existing commands
    case 'setup-tickets':
      if (!canManageTickets(interaction.member)) {
        return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
      }
      const embed = createTicketEmbed();
      await interaction.channel.send({ embeds: [embed] });
      await interaction.reply({ content: 'Ticket system has been set up!', ephemeral: true });
      break;

    // Moderation commands
    case 'ticket-lock':
      await handleTicketLock(interaction);
      break;
    case 'ticket-unlock':
      await handleTicketUnlock(interaction);
      break;
    case 'ticket-rename':
      await handleTicketRename(interaction);
      break;
    case 'ticket-alert':
      await handleTicketAlert(interaction);
      break;

    // User commands
    case 'ticket-subscribe':
      await handleTicketSubscribe(interaction);
      break;
    case 'ticket-unsubscribe':
      await handleTicketUnsubscribe(interaction);
      break;
    case 'ticket-note':
      await handleTicketNote(interaction);
      break;
    case 'ticket-claim':
      await handleTicketClaim(interaction);
      break;
    case 'ticket-unclaim':
      await handleTicketUnclaim(interaction);
      break;

    // Admin commands
    case 'ticket-settings':
      await handleTicketSettings(interaction);
      break;
    case 'ticket-archive':
      await handleTicketArchive(interaction);
      break;
    case 'ticket-bulk-close':
      await handleTicketBulkClose(interaction);
      break;
  }
});