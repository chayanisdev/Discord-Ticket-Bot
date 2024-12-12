import { REST, Routes } from 'discord.js';
import { ticketCommands } from '../commands/ticketCommands.js';

export async function registerCommands(client) {
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: ticketCommands },
    );
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
}