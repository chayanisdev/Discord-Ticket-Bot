import { REST, Routes, SlashCommandBuilder } from 'discord.js';

export async function setupCommands(client) {
  const commands = [
    new SlashCommandBuilder()
      .setName('setup-tickets')
      .setDescription('Sets up the ticket system in the current channel')
      .setDefaultMemberPermissions('0'),
  ];

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands },
    );
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
}