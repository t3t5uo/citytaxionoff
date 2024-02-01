// pages/api/getWorkflowStatus.js

export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        const workflowId = 'BHIMAdwQuk0BkT94'; // Replace with your actual workflow ID
        const n8nUrl = 'https://n8n.autocab.net/api/v1';
        const apiKey = process.env.N8N_API_KEY;

        // const workflowId = 'fLSLXdA8lBfsdOdS'; // Replace with your actual workflow ID
        // const n8nUrl = 'https://dev.ajddigital.com/api/v1';
  
        const response = await fetch(`${n8nUrl}/workflows/${workflowId}`, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'X-N8N-API-KEY': apiKey,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          res.status(200).json({ active: data.active });
        } else {
          res.status(response.status).json({ message: 'Failed to fetch workflow status' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      res.status(405).end();
    }
  }
  