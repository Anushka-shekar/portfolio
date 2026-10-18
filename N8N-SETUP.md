# n8n contact automation: setup

Flow: React form -> Express `/api/contact` (validate, rate limit, save) -> n8n webhook -> Gemini triage -> email to you -> auto-reply to visitor.

## 1. Run n8n (Docker)
    docker run -it --rm -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
Open http://localhost:5678

## 2. Import the workflow
Workflows -> Import from file -> `n8n-workflow.json`. Then edit:
- **Check Secret**: replace `CHANGE_ME_SECRET` with a long random string.
- **Gemini Triage**: replace `PASTE_YOUR_GEMINI_API_KEY` with your key from Google AI Studio. If the model name `gemini-2.0-flash` is no longer offered, change it in the URL to a current Gemini model.
- **Email Me**: replace `YOUR_EMAIL@gmail.com`, and pick your Gmail credential (Create new -> Google OAuth).
- **Auto-reply to Visitor**: pick the same Gmail credential.
Optional: for "Other SMTP", swap the two Gmail nodes for "Send Email" nodes.

## 3. Test, then activate
- Click "Listen for test event" on the webhook, send a message from the site, check both emails arrive.
- Toggle the workflow to **Active**. Use the **Production** webhook URL (not the Test URL).

## 4. Connect the server
In `server/.env`:
    N8N_WEBHOOK_URL=http://localhost:5678/webhook/portfolio-contact
    N8N_WEBHOOK_SECRET=<same secret as in Check Secret>
Restart `npm run dev`.

## Going live
A local n8n is not reachable from a deployed server. Use n8n Cloud or a hosted n8n, and put its Production webhook URL in `N8N_WEBHOOK_URL`. For quick demos, a tunnel (ngrok / Cloudflare Tunnel) also works.

## If something fails
- No emails: open n8n -> Executions and see which node failed.
- Gemini node errors: emails still go out, with category "unclassified".
- Server log shows "n8n webhook failed": check the URL, that the workflow is Active, and that Docker is running.
