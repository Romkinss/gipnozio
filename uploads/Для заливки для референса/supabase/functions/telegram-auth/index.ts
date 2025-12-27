
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// @ts-ignore
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method === 'GET') {
      // @ts-ignore
      const botToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
      // @ts-ignore
      const dbUrl = Deno.env.get('SUPABASE_URL');

      return new Response(JSON.stringify({
          status: 'online',
          message: 'Telegram Auth Function is running',
          checks: {
              hasBotToken: !!botToken ? '✅ OK' : '❌ MISSING',
              hasSupabaseUrl: !!dbUrl ? '✅ OK' : '❌ MISSING'
          }
      }, null, 2), { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
  }

  try {
    const { message } = await req.json()

    if (message && message.text && message.text.startsWith('/start')) {
      const args = message.text.split(' ')
      // @ts-ignore
      const botToken = Deno.env.get('TELEGRAM_BOT_TOKEN')
      
      if (args.length > 1) {
        const sessionId = args[1].trim()
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        
        if (!uuidRegex.test(sessionId)) {
            if (botToken) {
                await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: message.chat.id,
                        text: `⚠️ <b>Ошибка:</b> Неверный формат ссылки.`,
                        parse_mode: 'HTML'
                    })
                })
            }
            return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
        }

        const supabaseAdmin = createClient(
          // @ts-ignore
          Deno.env.get('SUPABASE_URL') ?? '',
          // @ts-ignore
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        const { error } = await supabaseAdmin
          .from('auth_sessions')
          .update({
            status: 'authenticated',
            telegram_id: message.from.id,
            first_name: message.from.first_name,
            username: message.from.username,
            auth_date: Math.floor(Date.now() / 1000)
          })
          .eq('id', sessionId)

        if (error) throw error
        
        if (botToken) {
            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: message.chat.id,
                    text: `✅ <b>Вы успешно авторизованы!</b>\n\nТеперь просто вернитесь в окно браузера, где вы начали вход — ваш личный кабинет уже открыт!`,
                    parse_mode: 'HTML'
                })
            })
        }
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
