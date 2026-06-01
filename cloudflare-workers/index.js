/**
 * Cloudflare Workers Email Transporter
 * 
 * フロントエンドから送信されたお問い合わせメッセージを、
 * 宛先メールアドレス(TO_EMAIL)に安全に転送します。
 * 宛先メールアドレスやAPIキーは、Workersの環境変数(環境バインディング)に隠蔽されるため安全です。
 */

export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*", // 本番環境では特定のオリジン(例: https://your-portfolio.com)に制限することを推奨
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // CORS プリフライトリクエストに対応
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { 
        status: 405,
        headers: corsHeaders 
      });
    }

    try {
      const { name, email, message } = await request.json();

      // 基本的なバリデーション
      if (!name || !email || !message) {
        return new Response(JSON.stringify({ error: "必要な項目が不足しています。" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const toEmail = env.TO_EMAIL;
      const resendApiKey = env.RESEND_API_KEY;

      if (!toEmail || !resendApiKey) {
        console.error("Missing Workers environment variables: TO_EMAIL or RESEND_API_KEY");
        return new Response(JSON.stringify({ error: "サーバーの設定エラーが発生しました。" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Resend API を利用してメールを送信
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>", // Resendでドメイン認証していない場合はonboarding@resend.devから送信されます
          to: toEmail,
          subject: `【ポートフォリオ】${name} 様からのお問い合わせ`,
          html: `
            <h3>ポートフォリオサイトから新しいメッセージが届きました。</h3>
            <p><strong>お名前:</strong> ${name}</p>
            <p><strong>メールアドレス:</strong> ${email}</p>
            <p><strong>メッセージ内容:</strong></p>
            <div style="background-color: #f5f7fa; padding: 15px; border-radius: 5px; border-left: 4px solid #ccd1d9; white-space: pre-wrap;">${message.replace(/\n/g, "<br>")}</div>
          `,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        console.error("Resend API Error:", resData);
        throw new Error("メールプロバイダーからの送信に失敗しました。");
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });

    } catch (err) {
      console.error("Server Error:", err);
      return new Response(JSON.stringify({ error: err.message || "内部サーバーエラーが発生しました。" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }
};
