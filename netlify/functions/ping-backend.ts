// 10 minute ping
import axios from 'axios'

export const config = {
  schedule: '*/10 * * * *',
}

export const handler = async () => {
  try {
    const backendResponse = await axios.get(
      'https://tamagotchiapi.onrender.com/health'
    )
    const result = await backendResponse.data()

    await axios.post(
      'https://dyjdknbposuimhotcaza.supabase.co/rest/v1/rpc/ping',
      {},
      {
        headers: {
          apikey: process.env.SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
          'Content-Type': 'application/json',
        },
      }
    )

    console.log(`[✅ Ping Success] Backend response: ${result}`)
    return {
      statusCode: 200,
      body: 'Pinged backend and Supabase successfully',
    }
  } catch (e: any) {
    console.error('[❌ Ping failed]', e)
    return {
      statusCode: 500,
      body: 'Ping failed',
    }
  }
}
