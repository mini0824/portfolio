# Cloudflare Workers メール転送サーバーのデプロイ手順

このディレクトリには、ポートフォリオのお問い合わせフォームから送られたメッセージを安全に転送するための Cloudflare Workers のコードが含まれています。
この仕組みを利用することで、**あなたのメールアドレスをフロントエンド（ウェブサイトのソースコード）や GitHub リポジトリから完全に隠すことができます**。

---

## 前提条件

1. **Cloudflare アカウント** を持っていること（無料プランで十分対応可能です）。
2. メール送信プロバイダー **Resend**（無料プランあり）のアカウントを作成し、APIキーを取得していること。
   * Resend 公式サイト: https://resend.com
   * アカウント作成後、「API Keys」メニューから新しいキーを作成してください。

---

## デプロイ手順

このディレクトリ（`cloudflare-workers`）にて、以下のコマンドを順番に実行します。

### 1. Cloudflare へのログインとデプロイ

```bash
# ログイン (ブラウザが開き、認証画面が表示されます)
npx wrangler login

# デプロイの実行
npx wrangler deploy
```

デプロイが成功すると、ターミナル上に以下のような Workers の URL が出力されます：
`https://portfolio-email-worker.<あなたのサブドメイン>.workers.dev`

この URL は後ほど Next.js の環境変数として使用するため、メモしておいてください。

### 2. 環境変数（Secrets）の登録

メールアドレスと Resend の API キーを Workers に登録します（これでソースコード上から完全に隠蔽されます）。

```bash
# 転送先のあなたのメールアドレスを登録 (例: ryomijyo@gmail.com)
npx wrangler secret put TO_EMAIL

# Resend で取得した API キー (re_xxxxxxxxx) を登録
npx wrangler secret put RESEND_API_KEY
```

*※ コマンドを実行すると入力待ち状態になるため、正しいメールアドレスおよび API キーを入力して Enter を押してください。*

---

## フロントエンド（Next.js）での設定

Workers のデプロイが完了したら、Next.js プロジェクトのルートディレクトリに `.env.local` ファイルを作成し、以下のように Workers の URL を登録します：

```env
NEXT_PUBLIC_WORKERS_URL=https://portfolio-email-worker.<あなたのサブドメイン>.workers.dev
```

* 本番環境（Vercel や Cloudflare Pages などにデプロイする場合）は、デプロイ先管理画面の環境変数設定メニューから `NEXT_PUBLIC_WORKERS_URL` を追加してください。
* ローカル開発環境で環境変数が設定されていない場合は、フォームは「自動デモモード（ダミー送信成功）」として動作するため、APIキーがなくても動作確認が可能です。
