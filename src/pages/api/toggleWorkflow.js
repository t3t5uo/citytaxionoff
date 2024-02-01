// pages/api/toggleWorkflow.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { workflowId, active } = req.body;

      // n8n server URL and API key
      const n8nUrl = 'https://n8n.autocab.net/api/v1';
      const apiKey = process.env.N8N_API_KEY;

      // const n8nUrl = 'https://dev.ajddigital.com/api/v1';

      // Determine the endpoint based on the desired state
      const endpoint = active ? 'activate' : 'deactivate';

      const response = await fetch(`${n8nUrl}/workflows/${workflowId}/${endpoint}`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'X-N8N-API-KEY': apiKey,
        },
      });

      if (response.ok) {
        res.status(200).json({ message: `Workflow ${active ? 'activated' : 'deactivated'} successfully` });
      } else {
        res.status(response.status).json({ message: 'Failed to change workflow status' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).end();
  }
}
