const ticketSubscriptions = new Map();

export async function handleTicketSubscribe(interaction) {
  if (!interaction.channel.name.startsWith('ticket-')) {
    return interaction.reply({ content: 'This command can only be used in ticket channels!', ephemeral: true });
  }

  const channelId = interaction.channel.id;
  const userId = interaction.user.id;

  if (!ticketSubscriptions.has(channelId)) {
    ticketSubscriptions.set(channelId, new Set());
  }

  ticketSubscriptions.get(channelId).add(userId);
  return interaction.reply({ content: 'You are now subscribed to this ticket!', ephemeral: true });
}

export async function handleTicketUnsubscribe(interaction) {
  if (!interaction.channel.name.startsWith('ticket-')) {
    return interaction.reply({ content: 'This command can only be used in ticket channels!', ephemeral: true });
  }

  const channelId = interaction.channel.id;
  const userId = interaction.user.id;

  if (ticketSubscriptions.has(channelId)) {
    ticketSubscriptions.get(channelId).delete(userId);
  }

  return interaction.reply({ content: 'You are now unsubscribed from this ticket!', ephemeral: true });
}

export async function handleTicketNote(interaction) {
  if (!interaction.channel.name.startsWith('ticket-')) {
    return interaction.reply({ content: 'This command can only be used in ticket channels!', ephemeral: true });
  }

  const note = interaction.options.getString('note');
  await interaction.channel.send({
    content: `📝 **Staff Note** (Only visible to staff)\n${note}`,
    flags: ['SUPPRESS_EMBEDS']
  });

  return interaction.reply({ content: 'Note added!', ephemeral: true });
}

const ticketClaims = new Map();

export async function handleTicketClaim(interaction) {
  if (!interaction.channel.name.startsWith('ticket-')) {
    return interaction.reply({ content: 'This command can only be used in ticket channels!', ephemeral: true });
  }

  const channelId = interaction.channel.id;

  if (ticketClaims.has(channelId)) {
    return interaction.reply({ content: 'This ticket is already claimed!', ephemeral: true });
  }

  ticketClaims.set(channelId, interaction.user.id);
  return interaction.reply(`🎫 Ticket claimed by ${interaction.user}!`);
}

export async function handleTicketUnclaim(interaction) {
  if (!interaction.channel.name.startsWith('ticket-')) {
    return interaction.reply({ content: 'This command can only be used in ticket channels!', ephemeral: true });
  }

  const channelId = interaction.channel.id;

  if (!ticketClaims.has(channelId)) {
    return interaction.reply({ content: 'This ticket is not claimed!', ephemeral: true });
  }

  if (ticketClaims.get(channelId) !== interaction.user.id) {
    return interaction.reply({ content: 'You cannot unclaim a ticket you did not claim!', ephemeral: true });
  }

  ticketClaims.delete(channelId);
  return interaction.reply('🎫 Ticket unclaimed!');
}