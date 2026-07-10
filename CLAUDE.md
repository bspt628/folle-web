# folle-web 開発ルール

Orchestra più Folle の Web サイト（Next.js）のリポジトリ。

## ブランチ運用（最重要）

- feature / fix ブランチのマージは必ず dev を経由し、`feature → dev → main` の順で進める。
- feature / fix ブランチを main に直接マージしてはいけない。
- 新しい feature / fix ブランチの PR は base を `main` ではなく `dev` にする。
- dev に溜まった変更は、別途 dev → main の PR でリリースする。
- main への直接コミット・プッシュは禁止。
- dev と main が乖離した場合は dev を main に同期する（両者が ancestor 関係なら `git merge --ff-only origin/main`）。

## デプロイ

- ライブサイト（piufolle.com）は main ブランチをデプロイしている。
- したがって、ライブに反映したい変更は最終的に dev → main のマージまで進める必要がある。

## 進行中ブランチ

- `feature/loading-green-background` は進行中のため削除しない。

## お問い合わせフォームのメール送信

- お問い合わせはデータベースに保存せず、nodemailer + Gmail SMTP でメール送信する。
- 実送信には環境変数 `EMAIL_ADDRESS` / `EMAIL_PASSWORD` が必要。受信先は `CONTACT_TO_EMAIL`（未設定時は `EMAIL_ADDRESS` 宛）。
- ローカル / プレビューでは `CONTACT_DRY_RUN=1` で実送信をスキップできる。
