// pages/api/toggleWorkflow.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { workflowId, active } = req.body;

      // n8n server URL and API key
      const n8nUrl = 'https://dev.ajddigital.com/api/v1';
      const apiKey = 'n8n_api_14f5cddc4e34410c4d1918cfcd834bcd60aae733cb60dfb90c30cbd370b8076170fb05576b84554e';

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
